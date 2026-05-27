'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Mock purchased signals ───────────────────────────────────────
const PURCHASED = [
  { id: 1, pair: 'BTC/USD', market: 'crypto', direction: 'LONG' as const, entry: '$67,800', tp: '$72,000', sl: '$65,500', provider: 'CryptoKing', winRate: 84, price: 4.99, status: 'active' as const, purchased: '2h ago', pnl: '+4.2%' },
  { id: 2, pair: 'EUR/USD', market: 'forex', direction: 'SHORT' as const, entry: '1.0892', tp: '1.0810', sl: '1.0940', provider: 'ForexMaster', winRate: 78, price: 2.99, status: 'tp_hit' as const, purchased: '1d ago', pnl: '+2.8%' },
  { id: 3, pair: 'NVDA', market: 'stocks', direction: 'LONG' as const, entry: '$888.00', tp: '$950.00', sl: '$860.00', provider: 'AIInvestor', winRate: 91, price: 4.99, status: 'active' as const, purchased: '3h ago', pnl: '+1.1%' },
  { id: 4, pair: 'SOL/USD', market: 'crypto', direction: 'LONG' as const, entry: '$160.50', tp: '$182.00', sl: '$152.00', provider: 'SolanaBull', winRate: 88, price: 3.49, status: 'sl_hit' as const, purchased: '2d ago', pnl: '-5.3%' },
  { id: 5, pair: 'GBP/JPY', market: 'forex', direction: 'LONG' as const, entry: '191.20', tp: '193.80', sl: '190.00', provider: 'LondonTrader', winRate: 82, price: 3.49, status: 'active' as const, purchased: '5h ago', pnl: '+0.8%' },
  { id: 6, pair: 'ETH/USD', market: 'crypto', direction: 'LONG' as const, entry: '$3,820', tp: '$4,100', sl: '$3,650', provider: 'EtherWhale', winRate: 79, price: 3.99, status: 'tp_hit' as const, purchased: '3d ago', pnl: '+7.3%' },
];

const ACTIVITY = [
  { id: 1, type: 'purchase', text: 'Bought BTC/USD signal from CryptoKing', time: '2h ago', icon: '🛒' },
  { id: 2, type: 'tp', text: 'EUR/USD signal hit Take Profit ✅', time: '1d ago', icon: '🎯' },
  { id: 3, type: 'purchase', text: 'Bought NVDA signal from AIInvestor', time: '3h ago', icon: '🛒' },
  { id: 4, type: 'sl', text: 'SOL/USD signal hit Stop Loss ❌', time: '2d ago', icon: '⚠️' },
  { id: 5, type: 'tp', text: 'ETH/USD signal hit Take Profit ✅', time: '3d ago', icon: '🎯' },
  { id: 6, type: 'purchase', text: 'Bought GBP/JPY signal from LondonTrader', time: '5h ago', icon: '🛒' },
];

const STATUS_CONFIG = {
  active: { label: 'Active', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  tp_hit: { label: 'TP Hit ✅', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  sl_hit: { label: 'SL Hit ❌', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function BuyerDashboard() {
  const [filter, setFilter] = useState<'all' | 'active' | 'tp_hit' | 'sl_hit'>('all');

  const stats = useMemo(() => {
    const total = PURCHASED.length;
    const active = PURCHASED.filter(s => s.status === 'active').length;
    const wins = PURCHASED.filter(s => s.status === 'tp_hit').length;
    const closed = PURCHASED.filter(s => s.status !== 'active').length;
    const winRate = closed > 0 ? Math.round((wins / closed) * 100) : 0;
    const spent = PURCHASED.reduce((sum, s) => sum + s.price, 0);
    return { total, active, winRate, spent };
  }, []);

  const filtered = useMemo(() =>
    filter === 'all' ? PURCHASED : PURCHASED.filter(s => s.status === filter),
    [filter]
  );

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">My Dashboard</h1>
          <p className="text-zinc-600 text-xs font-mono mt-0.5">Welcome back — here's your overview</p>
        </div>
        <Link
          href="/marketplace"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-display font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/25"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Buy Signals
        </Link>
      </div>

      {/* ── Stat cards ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            label: 'SIGNALS BOUGHT',
            value: stats.total,
            sub: `${stats.active} currently active`,
            icon: '📦',
            color: 'text-white',
            trend: null,
          },
          {
            label: 'ACTIVE POSITIONS',
            value: stats.active,
            sub: 'Positions open now',
            icon: '📡',
            color: 'text-blue-400',
            trend: null,
          },
          {
            label: 'WIN RATE',
            value: `${stats.winRate}%`,
            sub: 'On closed signals',
            icon: '🎯',
            color: 'text-green-400',
            trend: '+5% this week',
          },
          {
            label: 'TOTAL SPENT',
            value: `$${stats.spent.toFixed(2)}`,
            sub: 'Across all signals',
            icon: '💳',
            color: 'text-orange-400',
            trend: null,
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 hover:border-orange-500/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-[10px] text-zinc-600 font-mono tracking-widest">{card.label}</p>
              <span className="text-xl">{card.icon}</span>
            </div>
            <p className={`font-display font-bold text-2xl mb-1 ${card.color}`}>{card.value}</p>
            <p className="text-zinc-600 text-[11px] font-mono">{card.sub}</p>
            {card.trend && (
              <div className="mt-2 flex items-center gap-1">
                <span className="text-green-400 text-[10px] font-mono">↑ {card.trend}</span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* ── Main grid ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── Purchased signals ── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-white">My Signals</h2>
            <Link href="/dashboard/purchases" className="text-xs text-orange-400 hover:text-orange-300 font-mono transition-colors">
              View all →
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {([
              { key: 'all', label: 'All' },
              { key: 'active', label: 'Active' },
              { key: 'tp_hit', label: 'TP Hit' },
              { key: 'sl_hit', label: 'SL Hit' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  filter === tab.key
                    ? 'bg-orange-500/15 border border-orange-500/20 text-orange-400'
                    : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Signal list */}
          <div className="space-y-3">
            {filtered.map((signal, i) => (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-4 hover:border-orange-500/20 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold border ${
                      signal.direction === 'LONG'
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      {signal.direction === 'LONG' ? '↑' : '↓'}
                    </div>
                    <div>
                      <p className="font-display font-bold text-white">{signal.pair}</p>
                      <p className="text-zinc-600 text-[10px] font-mono">{signal.provider} · {signal.purchased}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${STATUS_CONFIG[signal.status].bg} ${STATUS_CONFIG[signal.status].color}`}>
                      {STATUS_CONFIG[signal.status].label}
                    </span>
                    <span className={`text-xs font-mono font-bold ${signal.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {signal.pnl}
                    </span>
                  </div>
                </div>

                {/* Entry/TP/SL */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'ENTRY', value: signal.entry, color: 'text-white' },
                    { label: 'TAKE PROFIT', value: signal.tp, color: 'text-green-400' },
                    { label: 'STOP LOSS', value: signal.sl, color: 'text-red-400' },
                  ].map((item, j) => (
                    <div key={j} className="bg-[#0d0d0d] rounded-xl p-2.5 text-center">
                      <p className="text-[9px] text-zinc-700 font-mono mb-0.5">{item.label}</p>
                      <p className={`text-xs font-display font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 bg-[#111] border border-[#1f1f1f] rounded-2xl">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-zinc-500 text-sm font-mono">No signals in this category</p>
            </div>
          )}
        </div>

        {/* ── Right column ── */}
        <div className="space-y-5">

          {/* Performance chart mini */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-white text-sm">Win Rate Trend</h3>
              <span className="text-green-400 text-xs font-mono">↑ 67%</span>
            </div>
            <div className="flex items-end gap-1 h-20 mb-3">
              {[45, 60, 40, 75, 55, 80, 67].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all"
                  style={{
                    height: `${h}%`,
                    background: i === 6 ? '#f97316' : i >= 4 ? 'rgba(249,115,22,0.35)' : '#1f1f1f',
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i} className="flex-1 text-center text-[9px] text-zinc-700 font-mono">{d}</span>
              ))}
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white text-sm mb-4">Signal Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: 'Active', count: stats.active, color: 'bg-blue-500', pct: Math.round((stats.active / stats.total) * 100) },
                { label: 'TP Hit', count: PURCHASED.filter(s => s.status === 'tp_hit').length, color: 'bg-green-500', pct: Math.round((PURCHASED.filter(s => s.status === 'tp_hit').length / stats.total) * 100) },
                { label: 'SL Hit', count: PURCHASED.filter(s => s.status === 'sl_hit').length, color: 'bg-red-500', pct: Math.round((PURCHASED.filter(s => s.status === 'sl_hit').length / stats.total) * 100) },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-zinc-500 text-xs font-mono">{item.label}</span>
                    <span className="text-zinc-400 text-xs font-mono">{item.count} · {item.pct}%</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-1.5">
                    <div className={`${item.color} rounded-full h-1.5 transition-all`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white text-sm mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {ACTIVITY.slice(0, 5).map(item => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs leading-relaxed">{item.text}</p>
                    <p className="text-zinc-700 text-[10px] font-mono mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-5">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent rounded-2xl pointer-events-none" />
            <h3 className="font-display font-semibold text-white text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/marketplace" className="flex items-center justify-between px-3 py-2.5 bg-orange-500 hover:bg-orange-400 rounded-xl text-white text-sm font-display font-semibold transition-all">
                Browse Signals <span>→</span>
              </Link>
              <Link href="/dashboard/purchases" className="flex items-center justify-between px-3 py-2.5 bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] rounded-xl text-zinc-400 hover:text-white text-sm font-mono transition-all">
                View all purchases <span>→</span>
              </Link>
              <Link href="/provider-signup" className="flex items-center justify-between px-3 py-2.5 bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] rounded-xl text-zinc-400 hover:text-white text-sm font-mono transition-all">
                Become a provider <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}