import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/lib/types';
import Sidebar from '@/components/Sidebar';
import GeneratorInterface from '@/components/GeneratorInterface';
import SavedHistory from '@/components/SavedHistory';

type ActiveView = 'generator' | 'saved' | 'settings';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('generator');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (!data) {
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert([
              {
                id: session.user.id,
                email: session.user.email,
                subscription_status: 'free',
                credits_remaining: 3,
              },
            ])
            .select()
            .single();

          setUserProfile(newProfile);
        } else {
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar
        userProfile={userProfile}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <main className="flex-1 overflow-auto">
        {activeView === 'generator' && userProfile && (
          <GeneratorInterface userProfile={userProfile} />
        )}
        {activeView === 'saved' && <SavedHistory />}
        {activeView === 'settings' && <div className="p-8">Settings coming soon...</div>}
      </main>
    </div>
  );
};

export default Dashboard;
