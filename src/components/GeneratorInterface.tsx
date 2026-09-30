import { useState } from 'react';
import { UserProfile, SEOKit } from '@/lib/types';
import { Copy, Download, Save, Loader } from 'lucide-react';
import UpgradeModal from './UpgradeModal';

interface GeneratorInterfaceProps {
  userProfile: UserProfile;
}

type ToneOption = 'Professional' | 'Urgent' | 'Friendly';

const GeneratorInterface = ({ userProfile }: GeneratorInterfaceProps) => {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [city, setCity] = useState('');
  const [focusOffer, setFocusOffer] = useState('');
  const [tone, setTone] = useState<ToneOption>('Professional');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedKit, setGeneratedKit] = useState<SEOKit | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check credits
    if (userProfile.subscription_status === 'free' && userProfile.credits_remaining <= 0) {
      setShowUpgradeModal(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate-seo-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: businessName,
          industry,
          location: city,
          focus_offer: focusOffer,
          tone,
        }),
      });

      if (response.status === 402) {
        setShowUpgradeModal(true);
        return;
      }

      if (!response.ok) throw new Error('Generation failed');

      const data = await response.json();
      setGeneratedKit(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleUpgrade = () => {
    window.location.href = `/api/paypal-checkout?plan=pro`;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Local SEO Generator</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <form onSubmit={handleGenerate} className="space-y-4 sticky top-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Mike's Plumbing"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Service / Industry
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g., Plumbing"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                City & Neighborhood
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., Austin, TX"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Core Offer / Focus
              </label>
              <textarea
                value={focusOffer}
                onChange={(e) => setFocusOffer(e.target.value)}
                placeholder="e.g., 24/7 Emergency Plumbing Services"
                rows={3}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as ToneOption)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option>Professional</option>
                <option>Urgent</option>
                <option>Friendly</option>
              </select>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader size={20} className="animate-spin" />}
              {loading ? 'Generating...' : 'Generate Local SEO Kit'}
            </button>
          </form>
        </div>

        {/* Output Section */}
        {generatedKit && (
          <div className="lg:col-span-2 space-y-6">
            {/* GBP Post */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">GBP Local Update Post</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Headline</p>
                  <p className="text-white font-semibold">{generatedKit.gbp_post.headline}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Body</p>
                  <p className="text-slate-200">{generatedKit.gbp_post.body}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Suggested CTA</p>
                  <p className="text-blue-400 font-semibold">{generatedKit.gbp_post.suggested_cta}</p>
                </div>
                <button
                  onClick={() => handleCopy(generatedKit.gbp_post.headline + '\n' + generatedKit.gbp_post.body, 0)}
                  className="mt-4 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <Copy size={18} />
                  {copiedIndex === 0 ? 'Copied!' : 'Copy All'}
                </button>
              </div>
            </div>

            {/* Review Responses */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Review Response Playbook</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-green-400 font-semibold mb-2">Positive Review Template</p>
                  <p className="text-slate-200 text-sm">{generatedKit.review_responses.positive_template}</p>
                  <button
                    onClick={() => handleCopy(generatedKit.review_responses.positive_template, 1)}
                    className="mt-3 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition"
                  >
                    <Copy size={14} />
                    {copiedIndex === 1 ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div>
                  <p className="text-sm text-yellow-400 font-semibold mb-2">Constructive Review Template</p>
                  <p className="text-slate-200 text-sm">{generatedKit.review_responses.constructive_template}</p>
                  <button
                    onClick={() => handleCopy(generatedKit.review_responses.constructive_template, 2)}
                    className="mt-3 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition"
                  >
                    <Copy size={14} />
                    {copiedIndex === 2 ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Hyper-Local FAQs</h3>
              <div className="space-y-4">
                {generatedKit.local_faq.map((faq, idx) => (
                  <div key={idx} className="bg-slate-700 rounded p-4">
                    <p className="text-blue-400 font-semibold mb-2">Q: {faq.question}</p>
                    <p className="text-slate-200 mb-2">A: {faq.answer}</p>
                    <button
                      onClick={() => handleCopy(`Q: ${faq.question}\nA: ${faq.answer}`, 3 + idx)}
                      className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition"
                    >
                      <Copy size={14} />
                      {copiedIndex === 3 + idx ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta Description */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">Meta Description</h3>
              <p className="text-slate-200 mb-2">{generatedKit.meta_description}</p>
              <p className="text-xs text-slate-400 mb-4">{generatedKit.meta_description.length} / 160 characters</p>
              <button
                onClick={() => handleCopy(generatedKit.meta_description, 10)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <Copy size={18} />
                {copiedIndex === 10 ? 'Copied!' : 'Copy Meta Tag'}
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex gap-4">
              <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                <Save size={20} />
                Save to Client Profile
              </button>
              <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                <Download size={20} />
                Export Kit
              </button>
            </div>
          </div>
        )}
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};

export default GeneratorInterface;
