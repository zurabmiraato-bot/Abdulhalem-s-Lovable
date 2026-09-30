export interface UserProfile {
  id: string;
  email: string;
  subscription_status: 'free' | 'pro';
  credits_remaining: number;
  created_at: string;
}

export interface ClientProfile {
  id: string;
  user_id: string;
  business_name: string;
  industry: string;
  location: string;
  created_at: string;
}

export interface SEOKit {
  gbp_post: {
    headline: string;
    body: string;
    suggested_cta: string;
  };
  review_responses: {
    positive_template: string;
    constructive_template: string;
  };
  local_faq: Array<{
    question: string;
    answer: string;
  }>;
  meta_description: string;
}

export interface UserGeneration {
  id: string;
  user_id: string;
  client_profile_id?: string;
  input_params: {
    business_name: string;
    industry: string;
    location: string;
    focus_offer: string;
    tone: 'Professional' | 'Urgent' | 'Friendly';
  };
  generated_kit: SEOKit;
  created_at: string;
}
