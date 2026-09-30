import { useState } from 'react';
import { ArrowRight, Sparkles, Zap, MessageSquare, Hash } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import Navigation from '@/components/Navigation';

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const targetAudiences = [
    { name: 'Plumbers', icon: '🔧' },
    { name: 'Dentists', icon: '🦷' },
    { name: 'Roofers', icon: '🏠' },
    { name: 'Auto Repair', icon: '🚗' },
    { name: 'Real Estate', icon: '🏡' },
    { name: 'Marketing Agencies', icon: '📊' },
  ];

  const features = [
    { title: 'GBP Updates', icon: Sparkles, description: 'Generate rank-ready Google Business Profile posts' },
    { title: 'Review Playbooks', icon: MessageSquare, description: 'Professional response templates for reviews' },
    { title: 'Hyper-Local FAQs', icon: Zap, description: 'AI-powered Q&A for local search optimization' },
    { title: 'Meta Tags', icon: Hash, description: 'SEO-optimized meta descriptions' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navigation onLoginClick={() => setShowAuthModal(true)} />

      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 text-center max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Dominate Google Maps & Local Search Packs with AI
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Generate rank-ready GBP posts, localized Q&As, and SEO review playbooks in 30 seconds.
        </p>
        <button
          onClick={() => setShowAuthModal(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg inline-flex items-center gap-2 transition transform hover:scale-105"
        >
          Start Free Trial - 3 Free Credits
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Target Audience Grid */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Perfect for Local Businesses</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {targetAudiences.map((audience) => (
            <div
              key={audience.name}
              className="bg-slate-800 hover:bg-slate-700 rounded-lg p-6 text-center transition transform hover:scale-105"
            >
              <p className="text-4xl mb-2">{audience.icon}</p>
              <p className="font-semibold">{audience.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Powerful Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition"
              >
                <Icon size={32} className="text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Table */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Simple Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
            <p className="text-slate-300 mb-6">Get started instantly</p>
            <p className="text-4xl font-bold mb-6">$0</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-300">
                <span className="text-green-400">✓</span>
                3 free credits
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="text-green-400">✓</span>
                Full feature access
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <span className="text-green-400">✓</span>
                Save 1 client profile
              </li>
            </ul>
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Start Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-8 border border-blue-600 transform scale-105">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full inline-block mb-4 text-sm font-semibold">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <p className="text-blue-200 mb-6">For serious local businesses</p>
            <p className="text-4xl font-bold mb-6">$19<span className="text-lg text-blue-200">/mo</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                1,000 credits per month
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                Unlimited client profiles
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                Priority support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-300">✓</span>
                Export unlimited kits
              </li>
            </ul>
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg transition"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2024 LocalRank AI. All rights reserved. Powered by AI • Built for Local Businesses</p>
        </div>
      </footer>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default LandingPage;
