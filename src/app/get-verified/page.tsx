'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const REQUIREMENTS = [
  { icon: '📊', title: 'Verified Track Record', desc: 'Minimum 50 posted signals with provable results' },
  { icon: '🎯', title: '75%+ Win Rate', desc: 'Sustained win rate over at least 30 days' },
  { icon: '📅', title: '30+ Days Active', desc: 'Account must be active for at least one month' },
  { icon: '💳', title: 'Completed KYC', desc: 'Identity verification via valid government ID' },
];

const BENEFITS = [
  { icon: '✓', title: 'Verified Badge', desc: 'Blue checkmark on your profile and all signals', color: 'text-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/5' },
  { icon: '🔝', title: 'Priority Listing', desc: 'Your signals appear at the top of search results', color: 'text-orange-400', border: 'border-orange-500/20', bg: 'bg-orange-500/5' },
  { icon: '💰', title: 'Higher Earnings', desc: 'Verified providers earn 3x more on average', color: 'text-green-400', border: 'border-green-500/20', bg: 'bg-green-500/5' },
  { icon: '🛡', title: 'Trust Signal', desc: 'Buyers are 5x more likely to purchase from verified providers', color: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/5' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }),
};

export default function GetVerifiedPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', providerName: '', note: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] overflow-x-hidden">

      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-500/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-[#080808]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">S</div>
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-blue-400 text-xs font-mono tracking-wide">✓ VERIFIED PROVIDER PROGRAM</span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-4 leading-tight">
            Get the{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Blue Badge</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
            Stand out from the crowd. Verified providers earn more, get better visibility, and build lasting trust with buyers.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {BENEFITS.map((b, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className={`${b.bg} border ${b.border} rounded-2xl p-5`}>
              <div className={`text-2xl mb-3 ${b.color}`}>{b.icon}</div>
              <h3 className="font-display font-bold text-white text-sm mb-1">{b.title}</h3>
              <p className="text-zinc-600 text-xs font-mono leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Requirements */}
          <div>
            <h2 className="font-display font-bold text-xl text-white mb-6">Requirements</h2>
            <div className="space-y-4">
              {REQUIREMENTS.map((req, i) => (
                <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="flex items-start gap-4 bg-[#111] border border-[#1f1f1f] rounded-2xl p-4">
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-xl flex-shrink-0">{req.icon}</div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm mb-0.5">{req.title}</h3>
                    <p className="text-zinc-600 text-xs font-mono">{req.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process */}
            <div className="mt-8 bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
              <h3 className="font-display font-semibold text-white text-sm mb-4">How it works</h3>
              <div className="space-y-3">
                {[
                  { step: '01', text: 'Submit your application below' },
                  { step: '02', text: 'Our team reviews your signal history' },
                  { step: '03', text: 'Complete KYC identity verification' },
                  { step: '04', text: 'Get your blue badge within 3–5 days' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-orange-500 font-bold w-5">{item.step}</span>
                    <div className="flex-1 h-px bg-[#1a1a1a]" />
                    <span className="text-zinc-500 text-xs font-mono">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application form */}
          <div>
            <h2 className="font-display font-bold text-xl text-white mb-6">Apply Now</h2>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 space-y-4">
                {[
                  { label: 'FULL NAME', key: 'name', placeholder: 'Your real name', type: 'text' },
                  { label: 'EMAIL', key: 'email', placeholder: 'your@email.com', type: 'email' },
                  { label: 'PROVIDER NAME', key: 'providerName', placeholder: 'Your SignalHub username', type: 'text' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-blue-500/40 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">WHY SHOULD YOU BE VERIFIED?</label>
                  <textarea
                    value={form.note}
                    onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))}
                    placeholder="Tell us about your track record, experience, proof of profits..."
                    rows={4}
                    className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-blue-500/40 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono resize-none"
                  />
                </div>

                <button type="submit" disabled={submitting}
                  className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-60 text-white font-display font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Submit Application →'}
                </button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-[#111] border border-blue-500/20 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-display font-bold text-white text-lg mb-2">Application submitted!</h3>
                <p className="text-zinc-500 text-sm font-mono mb-6">We'll review your application and get back to you within 3–5 business days.</p>
                <Link href="/provider" className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-display font-bold px-6 py-3 rounded-xl transition-all text-sm">
                  Back to Dashboard →
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}