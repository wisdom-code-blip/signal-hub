'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SIGNALS = [
  { id: 1, pair: 'BTC/USD', direction: 'LONG' as const, entry: '$67,800', tp: '$72,000', sl: '$65,500', price: 4.99, buyers: 67, winRate: 84, status: 'active', posted: '2h ago', result: null },
  { id: 2, pair: 'ETH/USD', direction: 'LONG' as const, entry: '$3,820', tp: '$4,100', sl: '$3,650', price: 3.99, buyers: 54, winRate: 79, status: 'closed', posted: '1d ago', result: 'tp_hit' },
  { id: 3, pair: 'SOL/USD', direction: 'LONG' as const, entry: '$160.50', tp: '$182.00', sl: '$152.00', price: 3.49, buyers: 42, winRate: 88, status: 'closed', posted: '2d ago', result: 'tp_hit' },
  { id: 4, pair: 'BNB/USD', direction: 'SHORT' as const, entry: '$578.00', tp: '$540.00', sl: '$600.00', price: 3.99, buyers: 34, winRate: 81, status: 'closed', posted: '3d ago', result: 'sl_hit' },
];

const REVIEWS = [
  { id: 1, user: 'Trader_Mike', rating: 5, signal: 'BTC/USD', comment: 'Accurate entry. TP hit within 6 hours. Will definitely buy again!', date: '2d ago', avatar: 'T' },
  { id: 2, user: 'CryptoGirl', rating: 5, signal: 'ETH/USD', comment: 'Best signal provider on this platform. Detailed analysis every time.', date: '3d ago', avatar: 'C' },
  { id: 3, user: 'ForexKing', rating: 4, signal: 'SOL/USD', comment: 'Good analysis and entry point. Took slightly longer than expected but TP hit.', date: '5d ago', avatar: 'F' },
  { id: 4, user: 'StockHunter', rating: 5, signal: 'BTC/USD', comment: 'Consistent and reliable. 3 signals bought, all profitable.', date: '1w ago', avatar: 'S' },
];

const STATS = [
  { label: 'Total Signals', value: '35' },
  { label: 'Win Rate', value: '84%' },
  { label: 'Total Buyers', value: '334' },
  { label: 'Avg Rating', value: '4.9 ★' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }),
};

export default function ProviderProfilePage() {
  const [activeTab, setActiveTab] = useState<'signals' | 'reviews'>('signals');
  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Profile hero card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden">

        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-orange-600/30 via-red-600/20 to-orange-500/10 relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(249,115,22,0.1) 10px, rgba(249,115,22,0.1) 11px)' }} />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar + edit button */}
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl border-4 border-[#111] flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-orange-500/20">
              W
            </div>
            <Link href="/provider/settings"
              className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-orange-500/30 text-zinc-400 hover:text-orange-400 text-xs font-mono rounded-xl transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </Link>
          </div>

          {/* Name + badges */}
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display font-bold text-xl text-white">Wizzy</h1>
            <span className="text-xs font-mono bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">✓ Verified</span>
            <span className="text-xs font-mono bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">📡 Provider</span>
          </div>
          <p className="text-zinc-500 text-xs font-mono mb-3">@wizzytrader · Crypto · Expert</p>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xl mb-4">
            Professional crypto trader with 5+ years experience. Specialising in BTC and ETH setups using RSI divergence and volume analysis.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-400 text-xs font-mono transition-colors">
              <span>𝕏</span> @wizzytrader
            </a>
            <a href="#" className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-400 text-xs font-mono transition-colors">
              <span>✈</span> @wizzyfx
            </a>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS.map((stat, i) => (
          <motion.div key={i} custom={i} initial="hidden" animate="visible" variants={fadeUp}
            className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-4 text-center hover:border-orange-500/20 transition-all">
            <p className="font-display font-bold text-xl text-orange-400 mb-0.5">{stat.value}</p>
            <p className="text-zinc-600 text-[10px] font-mono">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Performance bar */}
      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-white text-sm">Overall Win Rate</h2>
          <span className="text-green-400 font-mono text-sm font-bold">84%</span>
        </div>
        <div className="w-full bg-[#1a1a1a] rounded-full h-3 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-orange-500 to-green-500 rounded-full" />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-zinc-600 font-mono">29 wins</span>
          <span className="text-[10px] text-zinc-600 font-mono">6 losses</span>
        </div>
      </div>

      {/* Signals / Reviews tabs */}
      <div>
        <div className="flex gap-1 bg-[#111] border border-[#1f1f1f] rounded-2xl p-1.5 mb-5">
          {[
            { key: 'signals', label: `📡 Signals (${SIGNALS.length})` },
            { key: 'reviews', label: `⭐ Reviews (${REVIEWS.length})` },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-mono transition-all ${
                activeTab === tab.key ? 'bg-orange-500/15 border border-orange-500/20 text-orange-400' : 'text-zinc-600 hover:text-zinc-400'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Signals list */}
        {activeTab === 'signals' && (
          <div className="space-y-3">
            {SIGNALS.map((sig, i) => (
              <motion.div key={sig.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-4 hover:border-orange-500/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold border flex-shrink-0 ${
                      sig.direction === 'LONG' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>{sig.direction === 'LONG' ? '↑' : '↓'}</div>
                    <div>
                      <p className="font-display font-bold text-white">{sig.pair}</p>
                      <p className="text-zinc-600 text-[10px] font-mono">{sig.posted}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {sig.result === 'tp_hit' && <span className="text-[10px] text-green-400 font-mono font-bold">TP Hit ✅</span>}
                    {sig.result === 'sl_hit' && <span className="text-[10px] text-red-400 font-mono font-bold">SL Hit ❌</span>}
                    {sig.status === 'active' && <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">Active</span>}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: 'ENTRY', value: sig.entry, color: 'text-white' },
                    { label: 'TP', value: sig.tp, color: 'text-green-400' },
                    { label: 'SL', value: sig.sl, color: 'text-red-400' },
                  ].map((item, j) => (
                    <div key={j} className="bg-[#0d0d0d] rounded-xl p-2.5 text-center">
                      <p className="text-[9px] text-zinc-700 font-mono mb-0.5">{item.label}</p>
                      <p className={`text-xs font-display font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-600">
                    <span>{sig.buyers} buyers</span>
                    <span className="text-green-400">{sig.winRate}% WR</span>
                  </div>
                  <span className="text-orange-400 font-display font-bold text-sm">${sig.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {/* Rating summary */}
            <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 flex items-center gap-6">
              <div className="text-center">
                <p className="font-display font-bold text-4xl text-white">{avgRating}</p>
                <div className="flex justify-center gap-0.5 my-1">
                  {'★★★★★'.split('').map((s, i) => <span key={i} className="text-yellow-500 text-sm">{s}</span>)}
                </div>
                <p className="text-zinc-600 text-[10px] font-mono">{REVIEWS.length} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = REVIEWS.filter(r => r.rating === star).length;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-600 font-mono w-4">{star}★</span>
                      <div className="flex-1 bg-[#1a1a1a] rounded-full h-1.5">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${(count / REVIEWS.length) * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-zinc-700 font-mono w-3">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {REVIEWS.map((review, i) => (
              <motion.div key={review.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-white text-sm font-display font-semibold">{review.user}</p>
                      <p className="text-zinc-600 text-[10px] font-mono">on {review.signal} · {review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {'★★★★★'.split('').map((s, j) => (
                      <span key={j} className={`text-sm ${j < review.rating ? 'text-yellow-500' : 'text-zinc-700'}`}>{s}</span>
                    ))}
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed font-mono italic">"{review.comment}"</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}