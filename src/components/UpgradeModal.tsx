import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal = ({ isOpen, onClose, onUpgrade }: UpgradeModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await onUpgrade();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Upgrade to Pro</h2>
        <p className="text-slate-400 mb-6">Unlock unlimited local SEO generations</p>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 mb-6">
          <p className="text-white text-4xl font-bold mb-2">$19</p>
          <p className="text-blue-100 mb-4">/month</p>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-white">
              <Check size={18} />
              <span>1,000 credits per month</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Check size={18} />
              <span>Unlimited client profiles</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Check size={18} />
              <span>Priority support</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Check size={18} />
              <span>Export unlimited kits</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 mb-3"
        >
          {loading ? 'Processing...' : 'Upgrade with PayPal'}
        </button>

        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpgradeModal;
