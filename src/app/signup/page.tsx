'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/context/AuthContext';

// ─── Step indicator ───────────────────────────────────────────────
function StepDot({ active, done }: { active: boolean; done: boolean }) {
  return (
    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
      done ? 'bg-orange-500 w-4' : active ? 'bg-orange-500' : 'bg-[#2a2a2a]'
    }`} />
  );
}

export default function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<UserRole>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (r: UserRole) => {
    setRole(r);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signUp({ name, email, password, role });
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push(role === 'provider' ? '/provider' : '/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-lg shadow-orange-500/30">
              S
            </div>
            <span className="font-display font-bold text-xl">
              <span className="text-white">Signal</span>
              <span className="text-orange-500">Hub</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8 shadow-2xl shadow-black/60"
        >
          {/* Step dots */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            <StepDot active={step === 1} done={step > 1} />
            <StepDot active={step === 2} done={false} />
          </div>

          <AnimatePresence mode="wait">

            {/* ── STEP 1: Role Selection ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-xl shadow-orange-500/25">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h1 className="font-display font-bold text-2xl text-white">Join SignalHub</h1>
                  <p className="text-zinc-500 text-sm mt-1 font-mono">How do you want to use SignalHub?</p>
                </div>

                {/* Role cards */}
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => handleRoleSelect('buyer')}
                    className="group relative text-left bg-[#0d0d0d] hover:bg-orange-500/5 border border-[#2a2a2a] hover:border-orange-500/40 rounded-2xl p-5 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-orange-500/10 group-hover:bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors text-xl">
                        📈
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-white mb-1">Buy Signals</h3>
                        <p className="text-zinc-600 text-xs font-mono leading-relaxed">
                          Get profitable forex & crypto signals from verified top traders. Starting at $2.99.
                        </p>
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 group-hover:text-orange-500 transition-colors">→</div>
                  </button>

                  <button
                    onClick={() => handleRoleSelect('provider')}
                    className="group relative text-left bg-[#0d0d0d] hover:bg-orange-500/5 border border-[#2a2a2a] hover:border-orange-500/40 rounded-2xl p-5 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-orange-500/10 group-hover:bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors text-xl">
                        💰
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-white mb-1">Sell Signals</h3>
                        <p className="text-zinc-600 text-xs font-mono leading-relaxed">
                          Monetize your trading skills. Keep 80% of every sale. Withdraw weekly to your bank.
                        </p>
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 group-hover:text-orange-500 transition-colors">→</div>
                  </button>
                </div>

                <p className="text-center text-xs text-zinc-700 font-mono mt-6">
                  You can change this later in settings
                </p>
              </motion.div>
            )}

            {/* ── STEP 2: Account Form ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-xl shadow-orange-500/25">
                    <span className="text-2xl">{role === 'provider' ? '💰' : '📈'}</span>
                  </div>
                  <h1 className="font-display font-bold text-2xl text-white">Create your account</h1>
                  <div className="inline-flex items-center gap-1.5 mt-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
                    <span className="text-xs text-orange-400 font-mono">
                      {role === 'provider' ? '💰 Signal Provider' : '📈 Signal Buyer'}
                    </span>
                    <button onClick={() => setStep(1)} className="text-xs text-zinc-600 hover:text-zinc-400 font-mono transition-colors ml-1">
                      (change)
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-5 flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name */}
                  <div>
                    <label className="block text-xs text-zinc-400 font-mono mb-1.5 tracking-wide">FULL NAME</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                        className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-zinc-400 font-mono mb-1.5 tracking-wide">EMAIL</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs text-zinc-400 font-mono mb-1.5 tracking-wide">PASSWORD</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                        className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 rounded-xl pl-10 pr-11 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {/* Password strength hint */}
                    {password.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className={`flex-1 h-0.5 rounded-full transition-colors ${
                            password.length >= i * 3
                              ? password.length >= 10 ? 'bg-green-500' : 'bg-orange-500'
                              : 'bg-[#2a2a2a]'
                          }`} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-display font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Creating account...
                      </span>
                    ) : 'Sign Up'}
                  </button>

                  <p className="text-center text-xs text-zinc-700 font-mono">
                    By signing up you agree to our{' '}
                    <Link href="/terms" className="text-zinc-500 hover:text-zinc-300 transition-colors">Terms</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 transition-colors">Privacy Policy</Link>
                  </p>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-[#1f1f1f]" />
                  <span className="text-xs text-zinc-700 font-mono">or continue with</span>
                  <div className="flex-1 h-px bg-[#1f1f1f]" />
                </div>

                {/* Social buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2.5 bg-[#0d0d0d] hover:bg-[#161616] border border-[#2a2a2a] hover:border-[#333] rounded-xl py-3 transition-all group">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-zinc-400 text-sm font-mono group-hover:text-white transition-colors">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2.5 bg-[#0d0d0d] hover:bg-[#161616] border border-[#2a2a2a] hover:border-[#333] rounded-xl py-3 transition-all group">
                    <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-zinc-400 text-sm font-mono group-hover:text-white transition-colors">Facebook</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer link */}
          <p className="text-center text-sm text-zinc-600 font-mono mt-6">
            Already have an account?{' '}
            <Link href="/signin" className="text-orange-400 hover:text-orange-300 transition-colors font-semibold">
              Log In →
            </Link>
          </p>
        </motion.div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-zinc-700 hover:text-zinc-500 font-mono transition-colors">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}