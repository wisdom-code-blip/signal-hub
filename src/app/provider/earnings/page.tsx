'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const HISTORY = [
  { id: 1, signal: 'BTC/USD', buyer: 'Trader_Mike', amount: 4.49, date: 'May 26, 2026', time: '11:42 PM', status: 'paid' },
  { id: 2, signal: 'ETH/USD', buyer: 'CryptoGirl', amount: 3.59, date: 'May 26, 2026', time: '10:15 PM', status: 'paid' },
  { id: 3, signal: 'BTC/USD', buyer: 'ForexKing', amount: 4.49, date: 'May 26, 2026', time: '9:33 PM', status: 'paid' },
  { id: 4, signal: 'SOL/USD', buyer: 'StockHunter', amount: 3.14, date: 'May 25, 2026', time: '3:20 PM', status: 'paid' },
  { id: 5, signal: 'ETH/USD', buyer: 'CryptoWizard', amount: 3.59, date: 'May 25, 2026', time: '1:05 PM', status: 'paid' },
  { id: 6, signal: 'GBP/JPY', buyer: 'LondonFX', amount: 3.14, date: 'May 25, 2026', time: '11:50 AM', status: 'paid' },
  { id: 7, signal: 'BNB/USD', buyer: 'BinanceUser', amount: 3.59, date: 'May 24, 2026', time: '8:45 PM', status: 'paid' },
  { id: 8, signal: 'DOGE/USD', buyer: 'MemeTrader', amount: 1.79, date: 'May 24, 2026', time: '6:20 PM', status: 'paid' },
  { id: 9, signal: 'BTC/USD', buyer: 'WhaleAlert', amount: 4.49, date: 'May 24, 2026', time: '3:15 PM', status: 'paid' },
  { id: 10, signal: 'EUR/USD', buyer: 'FXMaster', amount: 2.69, date: 'May 23, 2026', time: '9:10 AM', status: 'paid' },
];

const MONTHLY = [
  { month: 'Jan', amount: 180 },
  { month: 'Feb', amount: 240 },
  { month: 'Mar', amount: 310 },
  { month: 'Apr', amount: 275 },
  { month: 'May', amount: 420 },
];

const WEEKLY = [180, 240, 195, 310, 280, 420, 334];
const WEEKLY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function EarningsPage() {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  const totalEarnings = HISTORY.reduce((s, h) => s + h.amount, 0);
  const thisMonth = HISTORY.slice(0, 7).reduce((s, h) => s + h.amount, 0);
  const maxMonthly = Math.max(...MONTHLY.map(m => m.amount));
  const maxWeekly = Math.max(...WEEKLY);

  return (
    <div className="space-y-6 max-w-[1100px] mx-auto">

      <div>
        <h1 className="font-display font-bold text-2xl text-white">Earnings</h1>
        <p className="text-zinc-600 text-xs font-mono mt-0.5">Your earnings history and breakdown</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL EARNED', value: `$${totalEarnings.toFixed(2)}`, color: 'text-green-400', icon: '💰' },
          { label: 'THIS MONTH', value: `$${thisMonth.toFixed(2)}`, color: 'text-orange-400', icon: '📅' },
          { label: 'PENDING', value: '$0.00', color: 'text-yellow-400', icon: '⏳' },
          { label: 'WITHDRAWN', value: '$245.00', color: 'text-zinc-400', icon: '🏦' },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
            <div className="flex items-start justify-between mb-2">
              <p className="text-[10px] text-zinc-600 font-mono tracking-widest">{c.label}</p>
              <span className="text-xl">{c.icon}</span>
            </div>
            <p className={`font-display font-bold text-2xl ${c.color}`}>{c.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-white">Earnings Overview</h2>
          <div className="flex gap-1.5">
            {(['weekly', 'monthly'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                  period === p ? 'bg-orange-500/15 border border-orange-500/20 text-orange-400' : 'text-zinc-600 hover:text-zinc-400'
                }`}>{p}</button>
            ))}
          </div>
        </div>

        {period === 'weekly' ? (
          <div>
            <div className="flex items-end gap-3 h-36 mb-3">
              {WEEKLY.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-zinc-600 font-mono">${val}</span>
                  <div className="w-full rounded-t-md transition-all"
                    style={{ height: `${(val / maxWeekly) * 100}%`, background: i === 6 ? '#f97316' : i >= 4 ? 'rgba(249,115,22,0.3)' : '#1f1f1f' }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {WEEKLY_LABELS.map((d, i) => (
                <span key={i} className="flex-1 text-center text-[10px] text-zinc-600 font-mono">{d}</span>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-end gap-4 h-36 mb-3">
              {MONTHLY.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-zinc-600 font-mono">${m.amount}</span>
                  <div className="w-full rounded-t-md transition-all"
                    style={{ height: `${(m.amount / maxMonthly) * 100}%`, background: i === MONTHLY.length - 1 ? '#f97316' : '#1f1f1f' }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {MONTHLY.map((m, i) => (
                <span key={i} className="flex-1 text-center text-[10px] text-zinc-600 font-mono">{m.month}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Earnings by signal */}
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { pair: 'BTC/USD', buyers: 67, revenue: '$334.33', pct: 80 },
          { pair: 'ETH/USD', buyers: 54, revenue: '$215.46', pct: 64 },
          { pair: 'SOL/USD', buyers: 42, revenue: '$146.58', pct: 50 },
        ].map((sig, i) => (
          <div key={i} className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-display font-bold text-white">{sig.pair}</p>
              <p className="text-green-400 font-display font-bold">{sig.revenue}</p>
            </div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-1.5 mb-2">
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${sig.pct}%` }} />
            </div>
            <p className="text-zinc-600 text-[10px] font-mono">{sig.buyers} buyers</p>
          </div>
        ))}
      </div>

      {/* Transaction history */}
      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1a1a1a]">
          <h2 className="font-display font-bold text-white">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#161616]">
                {['Signal', 'Buyer', 'Amount', 'Date', 'Status'].map((h, i) => (
                  <th key={i} className="text-left px-5 py-3 text-[10px] text-zinc-600 font-mono tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((tx, i) => (
                <tr key={tx.id} className="border-b border-[#161616] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="text-white text-sm font-display font-semibold">{tx.signal}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                        {tx.buyer[0]}
                      </div>
                      <span className="text-zinc-400 text-xs font-mono">{tx.buyer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-green-400 font-display font-bold text-sm">+${tx.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-zinc-400 text-xs font-mono">{tx.date}</p>
                    <p className="text-zinc-700 text-[10px] font-mono">{tx.time}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400">
                      Paid ✓
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}