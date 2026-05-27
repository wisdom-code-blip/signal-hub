'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const PERFORMANCE = [
  { pair: 'BTC/USD', signals: 12, wins: 10, losses: 2, winRate: 83, revenue: '$598.80', avgBuyers: 45 },
  { pair: 'ETH/USD', signals: 8, wins: 6, losses: 2, winRate: 75, revenue: '$319.20', avgBuyers: 39 },
  { pair: 'SOL/USD', signals: 5, wins: 5, losses: 0, winRate: 100, revenue: '$146.58', avgBuyers: 42 },
  { pair: 'GBP/JPY', signals: 4, wins: 3, losses: 1, winRate: 75, revenue: '$66.31', avgBuyers: 19 },
  { pair: 'DOGE/USD', signals: 6, wins: 3, losses: 3, winRate: 50, revenue: '$177.11', avgBuyers: 89 },
];

const HEATMAP = [
  { day: 'Mon', signals: 2, revenue: 18.50 },
  { day: 'Tue', signals: 3, revenue: 24.80 },
  { day: 'Wed', signals: 1, revenue: 9.20 },
  { day: 'Thu', signals: 4, revenue: 38.40 },
  { day: 'Fri', signals: 3, revenue: 29.50 },
  { day: 'Sat', signals: 5, revenue: 47.60 },
  { day: 'Sun', signals: 2, revenue: 18.00 },
];

const MONTHLY_BUYERS = [23, 31, 45, 38, 52, 67];
const MONTHLY_LABELS = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
const maxBuyers = Math.max(...MONTHLY_BUYERS);

const BUYER_SEGMENTS = [
  { label: 'Crypto traders', pct: 55, color: 'bg-orange-500' },
  { label: 'Forex traders', pct: 28, color: 'bg-blue-500' },
  { label: 'Stock traders', pct: 17, color: 'bg-green-500' },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const totalSignals = PERFORMANCE.reduce((s, p) => s + p.signals, 0);
  const totalWins = PERFORMANCE.reduce((s, p) => s + p.wins, 0);
  const overallWinRate = Math.round((totalWins / totalSignals) * 100);

  return (
    <div className="space-y-6 max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Analytics</h1>
          <p className="text-zinc-600 text-xs font-mono mt-0.5">Deep dive into your performance metrics</p>
        </div>
        <div className="flex gap-1.5">
          {(['7d', '30d', '90d'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                period === p ? 'bg-orange-500/15 border border-orange-500/20 text-orange-400' : 'bg-[#111] border border-[#1f1f1f] text-zinc-600 hover:text-zinc-400'
              }`}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL SIGNALS', value: totalSignals, sub: 'Posted this period', color: 'text-white' },
          { label: 'WIN RATE', value: `${overallWinRate}%`, sub: `${totalWins}W / ${totalSignals - totalWins}L`, color: 'text-green-400' },
          { label: 'TOTAL BUYERS', value: '334', sub: '↑ +8 this week', color: 'text-blue-400' },
          { label: 'AVG REVENUE / SIGNAL', value: '$17.80', sub: 'Per signal posted', color: 'text-orange-400' },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
            <p className="text-[10px] text-zinc-600 font-mono tracking-widest mb-2">{c.label}</p>
            <p className={`font-display font-bold text-2xl mb-1 ${c.color}`}>{c.value}</p>
            <p className="text-zinc-600 text-[11px] font-mono">{c.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Buyer growth */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
          <h2 className="font-display font-bold text-white text-sm mb-5">Buyer Growth</h2>
          <div className="flex items-end gap-3 h-28 mb-3">
            {MONTHLY_BUYERS.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-zinc-600 font-mono">{val}</span>
                <div className="w-full rounded-t-md transition-all"
                  style={{ height: `${(val / maxBuyers) * 100}%`, background: i === MONTHLY_BUYERS.length - 1 ? '#f97316' : i >= 3 ? 'rgba(249,115,22,0.3)' : '#1f1f1f' }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {MONTHLY_LABELS.map((l, i) => (
              <span key={i} className="flex-1 text-center text-[10px] text-zinc-600 font-mono">{l}</span>
            ))}
          </div>
        </div>

        {/* Buyer segments */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
          <h2 className="font-display font-bold text-white text-sm mb-5">Buyer Segments</h2>
          <div className="space-y-4">
            {BUYER_SEGMENTS.map((seg, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-zinc-400 text-xs font-mono">{seg.label}</span>
                  <span className="text-zinc-300 text-xs font-mono font-bold">{seg.pct}%</span>
                </div>
                <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${seg.pct}%` }} transition={{ duration: 0.8, delay: i * 0.15 }}
                    className={`${seg.color} h-2 rounded-full`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-[#1a1a1a] grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Repeat Buyers', value: '34%' },
              { label: 'Avg Rating', value: '4.8 ★' },
              { label: 'Refunds', value: '0.2%' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-white font-display font-bold text-sm">{s.value}</p>
                <p className="text-zinc-600 text-[10px] font-mono">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance by pair */}
      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1a1a1a]">
          <h2 className="font-display font-bold text-white text-sm">Performance by Pair</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#161616]">
                {['Pair', 'Signals', 'W/L', 'Win Rate', 'Revenue', 'Avg Buyers'].map((h, i) => (
                  <th key={i} className="text-left px-5 py-3 text-[10px] text-zinc-600 font-mono tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERFORMANCE.sort((a, b) => b.winRate - a.winRate).map((p, i) => (
                <tr key={i} className="border-b border-[#161616] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5"><span className="font-display font-bold text-white">{p.pair}</span></td>
                  <td className="px-5 py-3.5"><span className="text-zinc-400 font-mono text-sm">{p.signals}</span></td>
                  <td className="px-5 py-3.5">
                    <span className="text-green-400 font-mono text-sm">{p.wins}W</span>
                    <span className="text-zinc-700 font-mono text-sm mx-1">/</span>
                    <span className="text-red-400 font-mono text-sm">{p.losses}L</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#1a1a1a] rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${p.winRate >= 80 ? 'bg-green-500' : p.winRate >= 65 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${p.winRate}%` }} />
                      </div>
                      <span className={`text-xs font-mono ${p.winRate >= 80 ? 'text-green-400' : p.winRate >= 65 ? 'text-yellow-400' : 'text-red-400'}`}>{p.winRate}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="text-green-400 font-display font-bold text-sm">{p.revenue}</span></td>
                  <td className="px-5 py-3.5"><span className="text-zinc-400 font-mono text-sm">{p.avgBuyers}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily heatmap */}
      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
        <h2 className="font-display font-bold text-white text-sm mb-5">Best Days to Post</h2>
        <div className="grid grid-cols-7 gap-2">
          {HEATMAP.map((d, i) => (
            <div key={i} className="text-center">
              <div className="w-full aspect-square rounded-xl flex items-center justify-center text-xs font-display font-bold mb-1.5 transition-all"
                style={{ background: `rgba(249,115,22,${d.signals / 5 * 0.6 + 0.05})`, color: d.signals >= 4 ? '#fff' : '#f97316' }}>
                {d.signals}
              </div>
              <p className="text-[10px] text-zinc-600 font-mono">{d.day}</p>
              <p className="text-[9px] text-zinc-700 font-mono">${d.revenue}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-zinc-700 font-mono mt-3 text-center">Numbers show signals posted · Darker = more activity</p>
      </div>
    </div>
  );
}