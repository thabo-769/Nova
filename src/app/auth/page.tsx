'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Alert, Button, Divider, IconButton, InputAdornment, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import { ArrowLeft, Eye, EyeOff, UserCheck } from 'lucide-react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useApp } from '@/context/AppContext';

const fieldSx = {
  '& .MuiOutlinedInput-root': { color: '#f8f5ef', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,.035)', '& fieldset': { borderColor: 'rgba(255,255,255,.15)' }, '&:hover fieldset': { borderColor: 'rgba(212,175,55,.55)' }, '&.Mui-focused fieldset': { borderColor: '#d4af37' } },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,.52)', '&.Mui-focused': { color: '#d4af37' } },
  '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,.45)' },
};

export default function AuthPage() {
  const router = useRouter();
  const { switchDemoUser } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('mode') === 'signup') setMode('signup');
  }, []);

  const explainError = (cause: unknown, context: 'email' | 'google') => {
    console.error('Firebase Auth error:', cause);
    const code = ((cause as { code?: string })?.code || '').toLowerCase();
    const rawMessage = (cause as { message?: string })?.message || '';

    const messages: Record<string, string> = {
      'invalid-email': 'Please enter a valid email address.',
      'user-not-found': 'We couldn’t find an account with that email. Switch to "Create account" to sign up.',
      'wrong-password': 'That password is incorrect. Please try again.',
      'invalid-credential': 'Those sign-in details are incorrect. If you have not created an account yet, switch to "Create account".',
      'email-already-in-use': 'An account already uses this email. Please switch to "Sign in" instead.',
      'weak-password': 'Choose a password with at least 6 characters.',
      'popup-closed-by-user': 'Google sign-in popup was closed before completing.',
      'popup-blocked': 'Sign-in popup was blocked by your browser. Please allow popups for this site, or continue in Demo Mode below.',
      'cancelled-popup-request': 'Google sign-in operation was cancelled. Please try again.',
      'unauthorized-domain': 'This domain is not authorized in Firebase Auth. Go to Firebase Console > Authentication > Settings > Authorized domains and add this domain, or continue in Demo Mode below.',
      'operation-not-allowed':
        context === 'google'
          ? 'Google sign-in is not enabled in Firebase Console. Go to Authentication > Sign-in method, click "Google" and enable it. (You can also continue in Demo Mode below).'
          : 'Email/Password sign-in is not enabled in Firebase Console. Go to Authentication > Sign-in method, click "Email/Password" and enable it. (You can also continue in Demo Mode below).',
      'network-request-failed': 'Network connection issue or ad-blocker detected. Check your internet connection and try again.',
      'too-many-requests': 'Too many failed attempts. Access to this account is temporarily disabled. Please try again later.',
      'api-key-not-valid': 'Firebase API key is invalid or not configured. You can continue in Demo Mode below while your Firebase credentials are being verified.',
      'invalid-api-key': 'Firebase API key is invalid or not configured. You can continue in Demo Mode below while your Firebase credentials are being verified.',
      'user-disabled': 'This account has been disabled. Please contact Nova Diner support.',
      'web-storage-unsupported': 'Your browser is blocking cookies/storage. Please allow site data and cookies, then try again.',
    };

    const matchedKey = Object.keys(messages).find((key) => code.includes(key));
    if (matchedKey) {
      setError(messages[matchedKey]);
    } else if (rawMessage) {
      setError(`Sign-in error: ${rawMessage.replace(/^Firebase:\s*/i, '')}`);
    } else {
      setError('We couldn’t complete sign-in. Please try again or continue in Demo Mode below.');
    }
  };

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!auth) { setError('Sign-in is unavailable. Check the Firebase configuration and try again.'); return; }
    setBusy(true);
    try {
      if (mode === 'signup') {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(credential.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      router.replace('/home');
    } catch (cause) { explainError(cause, 'email'); }
    finally { setBusy(false); }
  };

  const handleGoogle = async () => {
    setError('');
    if (!auth) { setError('Sign-in is unavailable. Check the Firebase configuration and try again.'); return; }
    setBusy(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      router.replace('/home');
    } catch (cause) { explainError(cause, 'google'); }
    finally { setBusy(false); }
  };

  const handleDemoSignIn = () => {
    switchDemoUser('customer');
    router.replace('/home');
  };

  return (
    <main className="min-h-screen bg-[#100f0d] px-5 py-8 text-white sm:px-8 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#171613] shadow-[0_30px_100px_rgba(0,0,0,.45)] lg:min-h-[700px] lg:grid-cols-[.9fr_1.1fr]">
          <aside className="relative hidden overflow-hidden bg-[linear-gradient(150deg,#3c2f11,#19160e_48%,#11100e)] p-12 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-20 top-24 h-72 w-72 rounded-full border border-[#d4af37]/15" />
            <div className="absolute -right-8 top-36 h-48 w-48 rounded-full border border-[#d4af37]/20" />
            <Link href="/" className="relative flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-full border border-[#d4af37] font-serif text-xl text-[#d4af37]">N</span><span className="font-serif text-lg tracking-[.2em]">NOVA DINER</span></Link>
            <div className="relative max-w-sm">
              <p className="text-xs uppercase tracking-[.32em] text-[#d4af37]">A little more than dinner</p>
              <h1 className="mt-5 font-serif text-5xl leading-tight">Make yourself at home.</h1>
              <p className="mt-5 leading-7 text-white/60">Save your favorites, reserve a table, and make every visit feel like yours.</p>
            </div>
            <p className="relative text-xs tracking-wider text-white/35">BULAWAYO · ZIMBABWE</p>
          </aside>

          <section className="flex items-center justify-center px-6 py-9 sm:px-12 lg:px-16">
            <div className="w-full max-w-md">
              <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"><ArrowLeft size={16} /> Back to welcome</Link>
              <Typography component="p" sx={{ color: '#d4af37', fontSize: 11, letterSpacing: '.26em', textTransform: 'uppercase', fontWeight: 700 }}>Welcome to Nova Privé</Typography>
              <Typography component="h2" sx={{ color: '#fff', fontFamily: 'var(--font-serif)', fontSize: { xs: 34, sm: 40 }, lineHeight: 1.15, mt: 1.5, mb: 1 }}>{mode === 'signup' ? 'Create your account' : 'A pleasure to see you'}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,.55)', fontSize: 14, mb: 3.5 }}>{mode === 'signup' ? 'Join us for thoughtful dining and a few lovely extras.' : 'Sign in to continue to your Nova experience.'}</Typography>

              <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
                <Tabs value={mode} onChange={(_, next) => { setMode(next); setError(''); }} variant="fullWidth" sx={{ mb: 3, borderBottom: '1px solid rgba(255,255,255,.1)', '& .MuiTab-root': { color: 'rgba(255,255,255,.45)', textTransform: 'none', fontWeight: 600 }, '& .Mui-selected': { color: '#d4af37 !important' }, '& .MuiTabs-indicator': { bgcolor: '#d4af37' } }}>
                  <Tab value="signin" label="Sign in" />
                  <Tab value="signup" label="Create account" />
                </Tabs>

                {error && (
                  <Alert
                    severity="error"
                    sx={{ mb: 2.5, borderRadius: 2, '& .MuiAlert-message': { fontSize: 13, lineHeight: 1.5, width: '100%' } }}
                  >
                    <div>{error}</div>
                    <Button
                      size="small"
                      onClick={handleDemoSignIn}
                      sx={{
                        mt: 1.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: 12,
                        color: '#d4af37',
                        bgcolor: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(212,175,55,0.4)',
                        borderRadius: 1.5,
                        px: 1.5,
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                      }}
                    >
                      Bypass & Continue as Demo Customer →
                    </Button>
                  </Alert>
                )}

                <Button onClick={handleGoogle} disabled={busy} fullWidth variant="outlined" sx={{ height: 52, mb: 2.5, color: '#fff', borderColor: 'rgba(255,255,255,.2)', borderRadius: 3, textTransform: 'none', fontWeight: 600, '&:hover': { borderColor: '#d4af37', bgcolor: 'rgba(255,255,255,.04)' } }}>
                  <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="mr-3 h-5 w-5" /> Continue with Google
                </Button>
                <Divider sx={{ mb: 2.5, color: 'rgba(255,255,255,.3)', '&:before,&:after': { borderColor: 'rgba(255,255,255,.1)' } }}><span className="px-2 text-xs">or with email</span></Divider>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  {mode === 'signup' && <TextField fullWidth required label="Full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} sx={fieldSx} />}
                  <TextField fullWidth required type="email" label="Email address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={fieldSx} />
                  <TextField fullWidth required label="Password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} inputProps={{ minLength: 6 }} sx={fieldSx} InputProps={{ endAdornment: <InputAdornment position="end"><IconButton aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'rgba(255,255,255,.55)' }}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</IconButton></InputAdornment> }} />
                  <Button type="submit" disabled={busy} fullWidth variant="contained" sx={{ height: 54, mt: 1, borderRadius: 3, bgcolor: '#d4af37', color: '#17140c', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', '&:hover': { bgcolor: '#e4c65c' } }}>{busy ? 'Please wait…' : mode === 'signup' ? 'Create my account' : 'Sign in securely'}</Button>
                </form>

                <div className="mt-5 pt-5 border-t border-white/10 text-center">
                  <p className="text-xs text-white/50 mb-2.5">Testing or exploring without Firebase?</p>
                  <Button
                    onClick={handleDemoSignIn}
                    fullWidth
                    variant="outlined"
                    startIcon={<UserCheck size={18} />}
                    sx={{
                      height: 46,
                      color: '#d4af37',
                      borderColor: 'rgba(212,175,55,.35)',
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: 13,
                      bgcolor: 'rgba(212,175,55,.05)',
                      '&:hover': { borderColor: '#d4af37', bgcolor: 'rgba(212,175,55,.15)' }
                    }}
                  >
                    Continue as Demo Customer
                  </Button>
                </div>

                <Typography sx={{ color: 'rgba(255,255,255,.33)', fontSize: 11, textAlign: 'center', mt: 3, lineHeight: 1.7 }}>Your information is kept secure. By continuing, you agree to Nova Diner’s terms and privacy policy.</Typography>
              </Paper>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
