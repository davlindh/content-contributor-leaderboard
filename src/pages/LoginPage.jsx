import { SupabaseAuthUI } from '../integrations/supabase/auth';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { useEffect } from 'react';

const LoginPage = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Login or Sign Up</h1>
      <SupabaseAuthUI />
    </div>
  );
};

export default LoginPage;
