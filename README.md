# LocalRank AI - Local SEO Content Generation Platform

A modern, full-stack web application for generating rank-ready Google Business Profile posts, localized Q&As, and SEO review playbooks using AI.

## 🚀 Features

- **AI-Powered Content Generation**: Generate local SEO content in seconds
- **GBP Posts**: Create Google Business Profile updates
- **Review Playbooks**: Professional response templates
- **Hyper-Local FAQs**: AI-generated Q&A content
- **Meta Tags**: SEO-optimized descriptions
- **Credit System**: Free trial with 3 credits, Pro plan with 1,000 monthly credits
- **PayPal Integration**: Secure payment processing
- **Dark Mode UI**: Modern, responsive design with Tailwind CSS

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- PayPal Developer account
- OpenAI API key
- Vercel account (for deployment)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/localrank-ai.git
cd localrank-ai
```

### 2. Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

### 3. Configure Environment Variables

Create `.env.local` file in the root:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_PAYPAL_MODE=sandbox
VITE_API_BASE_URL=http://localhost:3001
```

Create `.env` file in the `server` directory:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox
LLM_API_KEY=your_openai_api_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Setup Supabase

1. Create a new Supabase project
2. Run the SQL migrations (see `db/migrations.sql`)
3. Enable Row-Level Security (RLS) on all tables
4. Copy your project URL and API keys

### 5. Configure PayPal

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com)
2. Create an app and get your credentials
3. Set mode to `sandbox` for testing
4. Add your credentials to `.env` files

### 6. Run Development Servers

```bash
# Terminal 1: Frontend (port 3000)
npm run dev

# Terminal 2: Backend (port 3001)
cd server
npm run dev
```

Visit `http://localhost:3000`

## 📦 Database Schema

### profiles table
- `id` (UUID, PK) - User ID from auth.users
- `email` (VARCHAR) - User email
- `subscription_status` (VARCHAR) - 'free' or 'pro'
- `credits_remaining` (INTEGER) - Available credits
- `created_at` (TIMESTAMP) - Account creation date

### client_profiles table
- `id` (UUID, PK)
- `user_id` (UUID, FK) - References profiles.id
- `business_name` (VARCHAR)
- `industry` (VARCHAR)
- `location` (VARCHAR)
- `created_at` (TIMESTAMP)

### user_generations table
- `id` (UUID, PK)
- `user_id` (UUID, FK) - References profiles.id
- `client_profile_id` (UUID, FK) - Optional reference
- `input_params` (JSONB) - Input parameters
- `generated_kit` (JSONB) - Generated content
- `created_at` (TIMESTAMP)

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Add LocalRank AI source"
git push origin main
```

### 2. Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel deploy --prod
```

### 3. Configure Environment Variables on Vercel

In Vercel dashboard:
1. Go to Settings > Environment Variables
2. Add all variables from your `.env` files
3. Redeploy

## 💰 PayPal Integration

### Webhook Setup

1. Go to PayPal Developer Dashboard
2. Create a webhook listener pointing to: `https://yourvercelurl.com/api/paypal-webhook`
3. Subscribe to these events:
   - `PAYMENT.SALE.COMPLETED`
   - `BILLING.SUBSCRIPTION.CANCELLED`

### Testing Payments

Use PayPal sandbox accounts:
- Business account for receiver
- Personal account for buyer

## 📊 Monitoring

- Check logs: `vercel logs`
- Monitor Supabase: Dashboard > Logs
- Monitor PayPal: Developer Dashboard > Logs

## 📄 License

MIT License - See LICENSE file

## 🆘 Support

For issues or questions, create a GitHub issue.
