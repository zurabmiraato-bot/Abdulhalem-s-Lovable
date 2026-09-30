import { ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  session: Session | null;
  children: ReactNode;
}

const ProtectedRoute = ({ session, children }: ProtectedRouteProps) => {
  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
