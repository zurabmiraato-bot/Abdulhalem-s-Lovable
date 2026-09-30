import { SupabaseClient } from '@supabase/supabase-js';
import { Request, Response } from 'express';
import paypal from 'paypal-rest-sdk';

export const handlePayPalCheckout = (supabase: SupabaseClient) => async (req: Request, res: Response) => {
  try {
    const { userId, plan } = req.body;

    if (!userId || !plan) {
      return res.status(400).json({ error: 'Missing userId or plan' });
    }

    const createPaymentJson = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `${process.env.FRONTEND_URL}/dashboard?status=success`,
        cancel_url: `${process.env.FRONTEND_URL}/dashboard?status=cancel`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'LocalRank AI Pro Plan',
                sku: 'LOCALRANK_PRO',
                price: '19.00',
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: '19.00',
            subtotal: '19.00',
            tax: '0.00',
            shipping: '0.00',
          },
          description: 'LocalRank AI Pro Plan - $19/month',
          invoice_number: `${userId}-${Date.now()}`,
        },
      ],
    };

    return new Promise((resolve, reject) => {
      paypal.payment.create(createPaymentJson, (error: any, payment: any) => {
        if (error) {
          console.error('PayPal error:', error);
          reject(error);
        } else {
          const approvalUrl = payment.links.find((link: any) => link.rel === 'approval_url');
          res.json({ approvalUrl: approvalUrl.href, paymentId: payment.id });
          resolve({ approvalUrl: approvalUrl.href });
        }
      });
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

export const handlePayPalWebhook = (supabase: SupabaseClient) => async (req: Request, res: Response) => {
  try {
    const { event_type, resource } = req.body;

    if (event_type === 'PAYMENT.SALE.COMPLETED') {
      const userId = resource.invoice_number.split('-')[0];

      // Update user subscription
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'pro',
          credits_remaining: 1000,
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      console.log(`✅ Pro subscription activated for user ${userId}`);
    }

    if (event_type === 'BILLING.SUBSCRIPTION.CANCELLED') {
      const customId = resource.custom_id;

      // Revert subscription
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          subscription_status: 'free',
          credits_remaining: 3,
        })
        .eq('id', customId);

      if (updateError) throw updateError;

      console.log(`❌ Subscription cancelled for user ${customId}`);
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};
