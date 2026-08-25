import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/logo.png';

const credentialsSchema = z.object({
  email: z.string().trim().email('Enter a valid email address').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(72),
});

const signUpSchema = credentialsSchema.extend({
  fullName: z.string().trim().min(2, 'Full name is required').max(100),
  phone: z.string().trim().max(20).optional(),
});

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();
  const [busy, setBusy] = useState(false);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [signup, setSignup] = useState({ fullName: '', phone: '', email: '', password: '' });

  useEffect(() => {
    if (session) navigate('/crm', { replace: true });
  }, [session, navigate]);

  const fail = (message: string) =>
    toast({ title: 'Something went wrong', description: message, variant: 'destructive' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const parsed = credentialsSchema.parse(login);
      const { error } = await supabase.auth.signInWithPassword(parsed);
      if (error) throw error;
      navigate('/crm', { replace: true });
    } catch (error) {
      fail(error instanceof z.ZodError ? error.errors[0].message : (error as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const parsed = signUpSchema.parse(signup);
      const { error } = await supabase.auth.signUp({
        email: parsed.email,
        password: parsed.password,
        options: {
          emailRedirectTo: `${window.location.origin}/crm`,
          data: { full_name: parsed.fullName, phone: parsed.phone },
        },
      });
      if (error) throw error;
      toast({
        title: 'Account created',
        description: 'You can now sign in to the staff CRM.',
      });
    } catch (error) {
      fail(error instanceof z.ZodError ? error.errors[0].message : (error as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      fail(result.error.message ?? 'Google sign-in failed');
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate('/crm', { replace: true });
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Staff & Admin Login | Mkwawa Security</title>
        <meta name="description" content="Secure staff and admin sign-in for the Mkwawa Security client and lead management system." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border p-8"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <img src={logo} alt="Mkwawa Security logo" className="h-16 w-auto mb-3" />
          <h1 className="font-heading text-2xl font-bold text-foreground">Staff & Admin Portal</h1>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" /> Internal CRM access only
          </p>
        </div>

        <Tabs defaultValue="login">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Create Account</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Work Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={login.email}
                  onChange={(e) => setLogin({ ...login, email: e.target.value })}
                  maxLength={255}
                />
              </div>
              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}
                  maxLength={72}
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full bg-accent text-accent-foreground hover:bg-gold-dark font-heading font-semibold">
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  value={signup.fullName}
                  onChange={(e) => setSignup({ ...signup, fullName: e.target.value })}
                  maxLength={100}
                />
              </div>
              <div>
                <Label htmlFor="signup-phone">Phone</Label>
                <Input
                  id="signup-phone"
                  type="tel"
                  value={signup.phone}
                  onChange={(e) => setSignup({ ...signup, phone: e.target.value })}
                  maxLength={20}
                />
              </div>
              <div>
                <Label htmlFor="signup-email">Work Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  value={signup.email}
                  onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                  maxLength={255}
                />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  value={signup.password}
                  onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                  maxLength={72}
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full bg-primary text-primary-foreground hover:bg-navy-light font-heading font-semibold">
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Staff Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button variant="outline" onClick={handleGoogle} disabled={busy} className="w-full font-heading font-semibold">
          Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="text-accent hover:underline">Back to website</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
