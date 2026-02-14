import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroBanner from '@/components/layout/HeroBanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import heroHome from '@/assets/hero-home.jpg';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    const { error, isAdmin } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Welcome back!');
    navigate(isAdmin ? '/admin/dashboard' : '/profile');
  };

  return (
    <>
      <HeroBanner image={heroHome} title="Welcome Back" subtitle="Login to your account" compact />
      <section className="section-padding">
        <div className="container-main max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-8">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">Register</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
