'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const PERKS = [
  { icon: '⚡', title: 'Early Access', desc: 'Be first to access premium features before public launch' },
  { icon: '💸', title: 'Founder Pricing', desc: 'Locked-in discount of 40% off all future premium plans' },
  { icon: '🎯', title: 'Priority Support', desc: 'Direct line to our team. Your feedback shapes the product' },
  { icon: '🏆', title: 'Founding Badge', desc: 'Exclusive "Founding Member" badge on your profile forever' },
];

const COMING_SOON = [
  { icon: '🤖', title: 'AI Signal Grading', desc: 'Automated quality scoring on every signal posted', eta: 'Q3 2026' },
  { icon: '📱', title: 'Mobile App', desc: 'iOS and Android app with push notifications for new signals', eta: 'Q3 2026' },
  { icon: '📊', title: 'Portfolio Tracker', desc: 'Track all your signal results in one unified dashboard', eta: 'Q4 2026' },
  { icon: '🔔', title: 'Signal Alerts', desc: 'Telegram + WhatsApp alerts when your favorite providers post', eta: 'Q4 2026' },
  { icon: '👥', title: 'Social Following', desc: 'Follow providers and build your personal signal feed', eta: 'Q1 2027' },
  { icon: '🌍', title: 'Naira Payments', desc: 'Pay and withdraw directly in NGN via Paystack', eta: 'Q3 2026' },
];

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'buyer' | 'provider' | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const [position] = useState(() => Math.floor(Math.random() * 300) + 1200);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setJoined(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-red-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-[#080808]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-orange-500/30">S</div>
            <span className="font-display font-bold text-base">
              <span className="text-white">Signal</span><span className="text-orange-500">Hub</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/marketplace" className="text-zinc-500 hover:text-white text-sm font-mono transition-colors">Marketplace</Link>
            <Link href="/signup" className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-lg transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10">

        {/* ── Hero + Form ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            <span className="text-xs text-orange-300 font-mono tracking-wide">🔥 PREMIUM FEATURES DROPPING SOON</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-6xl text-white leading-tight mb-4">
            Get early access to<br />
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              everything coming next
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            AI signal grading, mobile app, portfolio tracker, Naira payments and more.
            Join the waitlist and lock in founder pricing.
          </motion.p>

          {/* Form / Success */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {!joined ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 text-left">

                  {/* Role toggle */}
                  <div className="mb-5">
                    <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-2">I WANT TO</label>
                    <div className="grid grid-cols-2 gap-2">
                      {([
                        { key: 'buyer', label: '📈 Buy Signals', desc: 'Get profitable signals' },
                        { key: 'provider', label: '💰 Sell Signals', desc: 'Monetize my analysis' },
                      ] as const).map(opt => (
                        <button key={opt.key} onClick={() => setRole(opt.key)}
                          className={`py-3 px-3 rounded-xl border text-center transition-all ${
                            role === opt.key
                              ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                              : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-500 hover:border-[#333]'
                          }`}>
                          <p className="text-sm font-mono font-semibold">{opt.label}</p>
                          <p className="text-[10px] text-zinc-600 font-mono mt-0.5">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">EMAIL ADDRESS</label>
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
                          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
                        />
                      </div>
                    </div>

                    <button type="submit" disabled={submitting || !role || !email}
                      className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40">
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Joining...
                        </span>
                      ) : 'Join the Waitlist →'}
                    </button>
                  </form>

                  <p className="text-center text-[11px] text-zinc-700 font-mono mt-3">
                    No spam. Unsubscribe anytime. 🔒
                  </p>
                </motion.div>
              ) : (
                /* ── Success state ── */
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#111] border border-orange-500/20 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-orange-500/25">
                    🎉
                  </div>
                  <h2 className="font-display font-bold text-xl text-white mb-1">You're on the list!</h2>
                  <p className="text-zinc-500 text-sm font-mono mb-4">
                    You're <span className="text-orange-400 font-bold">#{position}</span> on the waitlist
                  </p>

                  {/* Progress bar */}
                  <div className="bg-[#1a1a1a] rounded-full h-2 mb-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '73%' }}
                      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-600 font-mono mb-6">1,847 / 2,500 spots filled</p>

                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500 font-mono">Share to move up the list 👇</p>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] rounded-xl py-2.5 text-zinc-400 hover:text-white text-xs font-mono transition-all">
                        <span>𝕏</span> Share on X
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] rounded-xl py-2.5 text-zinc-400 hover:text-white text-xs font-mono transition-all">
                        <span>✈</span> Telegram
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-6">
            <div className="flex -space-x-2">
              {['🧑', '👩', '👨', '🧑', '👩'].map((e, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-2 border-[#080808] flex items-center justify-center text-xs">
                  {e}
                </div>
              ))}
            </div>
            <p className="text-zinc-500 text-xs font-mono">
              <span className="text-white font-semibold">1,847 traders</span> already on the list
            </p>
          </motion.div>
        </section>

        {/* ── Perks ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-10">
            <span className="text-xs text-orange-500 font-mono tracking-widest">WAITLIST BENEFITS</span>
            <h2 className="font-display font-bold text-2xl text-white mt-2">What you get as a founding member</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map((perk, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 hover:border-orange-500/20 transition-all">
                <div className="text-2xl mb-3">{perk.icon}</div>
                <h3 className="font-display font-semibold text-white text-sm mb-1">{perk.title}</h3>
                <p className="text-zinc-600 text-xs font-mono leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Coming Soon features ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-10">
            <span className="text-xs text-orange-500 font-mono tracking-widest">ROADMAP</span>
            <h2 className="font-display font-bold text-2xl text-white mt-2">What's coming to SignalHub</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMING_SOON.map((feature, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 hover:border-orange-500/20 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-[10px] font-mono text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
                    {feature.eta}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-white text-sm mb-1">{feature.title}</h3>
                <p className="text-zinc-600 text-xs font-mono leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="bg-[#111] border border-orange-500/20 rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="font-display font-bold text-2xl text-white mb-3">
                Don't miss the launch 🚀
              </h2>
              <p className="text-zinc-400 text-sm mb-6 font-mono">
                Spots are limited. Join now and lock in your founding member perks before they're gone.
              </p>
              {!joined ? (
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-display font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25">
                  Join the Waitlist →
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-400 font-mono text-sm">
                  <span>✓</span> You're on the list — we'll be in touch!
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#1a1a1a] py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center font-bold text-white text-[10px]">S</div>
              <span className="font-display font-bold text-sm">
                <span className="text-white">Signal</span><span className="text-orange-500">Hub</span>
              </span>
            </Link>
            <p className="text-zinc-700 text-xs font-mono">© 2026 SignalHub. Not financial advice.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}