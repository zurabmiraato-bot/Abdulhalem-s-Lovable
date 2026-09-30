import { SupabaseClient } from '@supabase/supabase-js';
import { Request, Response } from 'express';
import axios from 'axios';

export const generateSeoKit = (supabase: SupabaseClient) => async (req: Request, res: Response) => {
  try {
    const { business_name, industry, location, focus_offer, tone } = req.body;
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits_remaining, subscription_status')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Check credits
    if (profile.subscription_status === 'free' && profile.credits_remaining <= 0) {
      return res.status(402).json({ error: 'Insufficient credits' });
    }

    // System prompt for LLM
    const systemPrompt = `You are LocalRank AI, an elite Local SEO Specialist and hyper-local content strategist. Your objective is to take the user's business details and generate a complete Local SEO Content Package in strict JSON format.

Return this EXACT JSON schema:
{
  "status": "success",
  "metadata": { "target_location": "string", "primary_keyword": "string" },
  "data": {
    "gbp_post": { "headline": "string", "body": "string", "suggested_cta": "string" },
    "review_responses": { "positive_template": "string", "constructive_template": "string" },
    "local_faq": [{ "question": "string", "answer": "string" }, { "question": "string", "answer": "string" }],
    "meta_description": "string"
  }
}`;

    // Call LLM API (using OpenAI as example)
    const llmResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Generate a complete Local SEO Kit for: Business: ${business_name}, Industry: ${industry}, Location: ${location}, Focus: ${focus_offer}, Tone: ${tone}`,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LLM_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedContent = JSON.parse(llmResponse.data.choices[0].message.content);

    // Store in database
    const { error: insertError } = await supabase.from('user_generations').insert([
      {
        user_id: userId,
        input_params: {
          business_name,
          industry,
          location,
          focus_offer,
          tone,
        },
        generated_kit: generatedContent.data,
      },
    ]);

    if (insertError) throw insertError;

    // Deduct credits if free tier
    if (profile.subscription_status === 'free') {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ credits_remaining: profile.credits_remaining - 1 })
        .eq('id', userId);

      if (updateError) throw updateError;
    }

    res.json(generatedContent);
  } catch (error: any) {
    console.error('Generation error:', error);
    res.status(500).json({
      error: 'Failed to generate SEO kit',
      message: error.message,
    });
  }
};
