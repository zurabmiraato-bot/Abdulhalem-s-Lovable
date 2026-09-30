import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  onLoginClick: () => void;
}

const Navigation = ({ onLoginClick }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-slate-900 bg-opacity-90 backdrop-blur-md border-b border-slate-800 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-blue-400">🎯</span>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">LocalRank AI</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#pricing" className="text-slate-300 hover:text-white transition">
            Pricing
          </a>
          <a href="#features" className="text-slate-300 hover:text-white transition">
            Features
          </a>
        </div>

        <button
          onClick={onLoginClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition hidden md:block"
        >
          Login / Sign Up
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 p-4 space-y-4">
          <a href="#pricing" className="block text-slate-300 hover:text-white">
            Pricing
          </a>
          <a href="#features" className="block text-slate-300 hover:text-white">
            Features
          </a>
          <button
            onClick={onLoginClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Login / Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
