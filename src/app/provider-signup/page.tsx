'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type Market = 'forex' | 'crypto' | 'stocks';
type Experience = 'beginner' | 'intermediate' | 'expert';

interface FormData {
  // Step 1
  displayName: string;
  bio: string;
  experience: Experience | '';
  markets: Market[];
  // Step 2
  tradingStyle: string;
  avgWinRate: string;
  avgSignalsPerWeek: string;
  defaultPrice: string;
  // Step 3
  twitter: string;
  telegram: string;
  agreed: boolean;
}

const MARKETS: { key: Market; label: string; icon: string }[] = [
  { key: 'forex', label: 'Forex', icon: '💱' },
  { key: 'crypto', label: 'Crypto', icon: '₿' },
  { key: 'stocks', label: 'Stocks', icon: '📈' },
];

const EXPERIENCE_OPTIONS: { key: Experience; label: string; desc: string }[] = [
  { key: 'beginner', label: 'Beginner', desc: '0–2 years trading experience' },
  { key: 'intermediate', label: 'Intermediate', desc: '2–5 years, consistent profits' },
  { key: 'expert', label: 'Expert', desc: '5+ years, proven track record' },
];

const STYLES = [
  'Scalping', 'Day Trading', 'Swing Trading', 'Position Trading', 'Algorithmic'
];

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.2 } }),
};

export default function ProviderSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState<FormData>({
    displayName: '', bio: '', experience: '', markets: [],
    tradingStyle: '', avgWinRate: '', avgSignalsPerWeek: '', defaultPrice: '',
    twitter: '', telegram: '', agreed: false,
  });

  const update = (key: keyof FormData, value: unknown) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleMarket = (m: Market) =>
    update('markets', form.markets.includes(m)
      ? form.markets.filter(x => x !== m)
      : [...form.markets, m]);

  const next = () => { setDir(1); setStep(s => s + 1); };
  const back = () => { setDir(-1); setStep(s => s - 1); };

  const canNext = () => {
    if (step === 1) return form.displayName.trim() && form.experience && form.markets.length > 0;
    if (step === 2) return form.tradingStyle && form.avgWinRate && form.defaultPrice;
    if (step === 3) return form.agreed;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setDone(true);
  };

  const STEPS = [
    { num: 1, label: 'Profile' },
    { num: 2, label: 'Trading' },
    { num: 3, label: 'Launch' },
  ];

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-lg shadow-orange-500/30">S</div>
            <span className="font-display font-bold text-xl">
              <span className="text-white">Signal</span><span className="text-orange-500">Hub</span>
            </span>
          </Link>
        </div>

        {!done ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-8 shadow-2xl shadow-black/60"
          >
            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {STEPS.map((s, i) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 transition-all`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      step > s.num ? 'bg-orange-500 text-white' :
                      step === s.num ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400' :
                      'bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-600'
                    }`}>
                      {step > s.num ? '✓' : s.num}
                    </div>
                    <span className={`text-xs font-mono hidden sm:block ${
                      step === s.num ? 'text-orange-400' : step > s.num ? 'text-zinc-400' : 'text-zinc-700'
                    }`}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-8 h-px transition-colors ${step > s.num ? 'bg-orange-500' : 'bg-[#2a2a2a]'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                {/* ── Step 1: Profile ── */}
                {step === 1 && (
                  <motion.div key="step1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-orange-500/20">📡</div>
                      <h1 className="font-display font-bold text-xl text-white">Set up your profile</h1>
                      <p className="text-zinc-500 text-xs font-mono mt-1">This is what buyers will see</p>
                    </div>

                    {/* Display name */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">DISPLAY NAME</label>
                      <input
                        value={form.displayName}
                        onChange={e => update('displayName', e.target.value)}
                        placeholder="e.g. CryptoKing, ForexMaster..."
                        className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">SHORT BIO</label>
                      <textarea
                        value={form.bio}
                        onChange={e => update('bio', e.target.value)}
                        placeholder="Tell buyers about your trading background..."
                        rows={3}
                        className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/50 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono resize-none"
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-2">EXPERIENCE LEVEL</label>
                      <div className="space-y-2">
                        {EXPERIENCE_OPTIONS.map(opt => (
                          <button key={opt.key} onClick={() => update('experience', opt.key)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                              form.experience === opt.key
                                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                                : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-500 hover:border-[#333]'
                            }`}>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              form.experience === opt.key ? 'border-orange-500' : 'border-[#3a3a3a]'
                            }`}>
                              {form.experience === opt.key && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                            </div>
                            <div>
                              <p className="text-sm font-mono font-semibold">{opt.label}</p>
                              <p className="text-[10px] text-zinc-600 font-mono">{opt.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Markets */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-2">MARKETS YOU TRADE</label>
                      <div className="flex gap-2">
                        {MARKETS.map(m => (
                          <button key={m.key} onClick={() => toggleMarket(m.key)}
                            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border text-xs font-mono transition-all ${
                              form.markets.includes(m.key)
                                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                                : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-600 hover:border-[#333]'
                            }`}>
                            <span className="text-lg">{m.icon}</span>
                            <span>{m.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Trading Setup ── */}
                {step === 2 && (
                  <motion.div key="step2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-orange-500/20">📊</div>
                      <h1 className="font-display font-bold text-xl text-white">Trading setup</h1>
                      <p className="text-zinc-500 text-xs font-mono mt-1">Help buyers understand your style</p>
                    </div>

                    {/* Trading style */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-2">TRADING STYLE</label>
                      <div className="flex flex-wrap gap-2">
                        {STYLES.map(style => (
                          <button key={style} onClick={() => update('tradingStyle', style)}
                            className={`px-3 py-2 rounded-lg text-xs font-mono border transition-all ${
                              form.tradingStyle === style
                                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                                : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-600 hover:border-[#333] hover:text-zinc-400'
                            }`}>
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Win rate */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] text-zinc-500 font-mono tracking-widest">AVERAGE WIN RATE</label>
                        <span className="text-orange-400 font-mono text-xs font-bold">{form.avgWinRate || 0}%</span>
                      </div>
                      <input
                        type="range" min={50} max={95} step={1}
                        value={form.avgWinRate || 50}
                        onChange={e => update('avgWinRate', e.target.value)}
                        className="w-full accent-orange-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-zinc-700 font-mono mt-1">
                        <span>50%</span><span>95%</span>
                      </div>
                    </div>

                    {/* Signals per week */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">SIGNALS PER WEEK</label>
                      <div className="flex gap-2">
                        {['1–3', '3–7', '7–15', '15+'].map(opt => (
                          <button key={opt} onClick={() => update('avgSignalsPerWeek', opt)}
                            className={`flex-1 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                              form.avgSignalsPerWeek === opt
                                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                                : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-600 hover:border-[#333]'
                            }`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Signal price */}
                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">DEFAULT SIGNAL PRICE (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm">$</span>
                        <input
                          type="number"
                          value={form.defaultPrice}
                          onChange={e => update('defaultPrice', e.target.value)}
                          placeholder="2.99"
                          min={0.99} max={9.99} step={0.50}
                          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/50 rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
                        />
                      </div>
                      <p className="text-[10px] text-zinc-600 font-mono mt-1.5">You keep 90% · Platform fee: 10% · Min $0.99 · Max $9.99</p>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 3: Launch ── */}
                {step === 3 && (
                  <motion.div key="step3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-orange-500/20">🚀</div>
                      <h1 className="font-display font-bold text-xl text-white">Almost there!</h1>
                      <p className="text-zinc-500 text-xs font-mono mt-1">Add socials and agree to terms</p>
                    </div>

                    {/* Summary card */}
                    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-2xl p-4 space-y-2">
                      <p className="text-[10px] text-zinc-600 font-mono tracking-widest mb-3">YOUR PROVIDER PROFILE</p>
                      {[
                        { label: 'Name', value: form.displayName },
                        { label: 'Experience', value: form.experience },
                        { label: 'Markets', value: form.markets.join(', ') },
                        { label: 'Style', value: form.tradingStyle },
                        { label: 'Win Rate', value: `~${form.avgWinRate}%` },
                        { label: 'Price', value: `$${form.defaultPrice} per signal` },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-zinc-600 text-xs font-mono">{item.label}</span>
                          <span className="text-zinc-300 text-xs font-mono capitalize">{item.value || '—'}</span>
                        </div>
                      ))}
                    </div>

                    {/* Socials */}
                    <div className="space-y-3">
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest block">SOCIAL LINKS (optional)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 text-sm font-mono">𝕏</span>
                        <input
                          value={form.twitter}
                          onChange={e => update('twitter', e.target.value)}
                          placeholder="@yourhandle"
                          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/50 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 text-sm">✈</span>
                        <input
                          value={form.telegram}
                          onChange={e => update('telegram', e.target.value)}
                          placeholder="@yourtelegram"
                          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/50 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
                        />
                      </div>
                    </div>

                    {/* Agreement */}
                    <button
                      onClick={() => update('agreed', !form.agreed)}
                      className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                        form.agreed ? 'bg-orange-500/10 border-orange-500/30' : 'bg-[#0d0d0d] border-[#2a2a2a]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-all ${
                        form.agreed ? 'bg-orange-500 border-orange-500' : 'border-[#3a3a3a]'
                      }`}>
                        {form.agreed && <span className="text-white text-[10px]">✓</span>}
                      </div>
                      <p className="text-xs text-zinc-500 font-mono leading-relaxed">
                        I agree to SignalHub's{' '}
                        <span className="text-orange-400">Provider Terms</span>,{' '}
                        <span className="text-orange-400">Signal Quality Guidelines</span>, and confirm that
                        my signals are based on genuine market analysis. I understand the platform takes a 10% commission.
                      </p>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button onClick={back}
                  className="flex-1 py-3 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#333] text-zinc-400 hover:text-white rounded-xl text-sm font-mono transition-all">
                  ← Back
                </button>
              )}
              {step < 3 ? (
                <button onClick={next} disabled={!canNext()}
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold rounded-xl text-sm transition-all shadow-lg shadow-orange-500/20">
                  Continue →
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!canNext() || submitting}
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white font-display font-bold rounded-xl text-sm transition-all shadow-lg shadow-orange-500/20">
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Setting up...
                    </span>
                  ) : '🚀 Launch Provider Account'}
                </button>
              )}
            </div>

            <p className="text-center text-xs text-zinc-700 font-mono mt-4">
              Already a provider?{' '}
              <Link href="/signin" className="text-orange-400 hover:text-orange-300 transition-colors">Sign in →</Link>
            </p>
          </motion.div>
        ) : (
          /* ── Success ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-10 text-center shadow-2xl shadow-black/60"
          >
            <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center text-4xl shadow-xl shadow-orange-500/25">
              🎉
            </div>
            <h1 className="font-display font-bold text-2xl text-white mb-2">You're a provider!</h1>
            <p className="text-zinc-500 text-sm font-mono mb-2">
              Welcome to SignalHub, <span className="text-orange-400">{form.displayName}</span>
            </p>
            <p className="text-zinc-600 text-xs font-mono mb-8 max-w-xs mx-auto leading-relaxed">
              Your account is under review. You'll be approved within 24 hours and can start posting signals right away.
            </p>
            <div className="space-y-3">
              <Link href="/provider"
                className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-display font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25">
                Go to Provider Dashboard →
              </Link>
              <Link href="/marketplace"
                className="block w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#333] text-zinc-400 hover:text-white py-3 rounded-xl text-sm font-mono transition-all">
                Browse the Marketplace
              </Link>
            </div>
          </motion.div>
        )}

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-zinc-700 hover:text-zinc-500 font-mono transition-colors">← Back to homepage</Link>
        </div>
      </div>
    </div>
  );
}