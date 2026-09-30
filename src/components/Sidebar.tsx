import { LogOut, Settings, Zap, Save, Cog } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

type ActiveView = 'generator' | 'saved' | 'settings';

interface SidebarProps {
  userProfile: UserProfile | null;
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

const Sidebar = ({ userProfile, activeView, onViewChange }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-blue-400">🎯</span>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">LocalRank AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        <button
          onClick={() => onViewChange('generator')}
          className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
            activeView === 'generator'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Zap size={20} />
          Local SEO Generator
        </button>

        <button
          onClick={() => onViewChange('saved')}
          className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
            activeView === 'saved'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Save size={20} />
          Saved Playbooks
        </button>

        <button
          onClick={() => onViewChange('settings')}
          className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-2 ${
            activeView === 'settings'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Cog size={20} />
          Settings
        </button>
      </nav>

      {/* Credit Meter */}
      <div className="p-6 border-t border-slate-800 bg-gradient-to-b from-transparent to-slate-800">
        <div className="bg-slate-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-400 mb-2">Credits Remaining</p>
          <p className="text-2xl font-bold text-blue-400">
            {userProfile?.credits_remaining || 0} / {userProfile?.subscription_status === 'pro' ? '1000' : '3'}
          </p>
          {userProfile?.subscription_status === 'free' && (
            <p className="text-xs text-slate-500 mt-2">Free Trial</p>
          )}
          {userProfile?.subscription_status === 'pro' && (
            <p className="text-xs text-green-400 mt-2">Pro Member</p>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
