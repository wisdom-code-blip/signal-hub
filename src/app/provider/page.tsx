'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────
type SignalStatus = 'active' | 'closed' | 'pending';

interface ProviderSignal {
  id: number;
  pair: string;
  market: string;
  direction: 'LONG' | 'SHORT';
  entry: string;
  tp: string;
  sl: string;
  price: number;
  buyers: number;
  revenue: number;
  winRate: number;
  status: SignalStatus;
  posted: string;
  result?: 'tp_hit' | 'sl_hit';
}

// ─── Mock data ────────────────────────────────────────────────────
const MY_SIGNALS: ProviderSignal[] = [
  { id: 1, pair: 'BTC/USD', market: 'Crypto', direction: 'LONG', entry: '$67,800', tp: '$72,000', sl: '$65,500', price: 4.99, buyers: 67, revenue: 334.33, winRate: 84, status: 'active', posted: '2h ago' },
  { id: 2, pair: 'ETH/USD', market: 'Crypto', direction: 'LONG', entry: '$3,820', tp: '$4,100', sl: '$3,650', price: 3.99, buyers: 54, revenue: 215.46, winRate: 79, status: 'active', posted: '5h ago' },
  { id: 3, pair: 'SOL/USD', market: 'Crypto', direction: 'LONG', entry: '$160.50', tp: '$182.00', sl: '$152.00', price: 3.49, buyers: 42, revenue: 146.58, winRate: 88, status: 'closed', posted: '1d ago', result: 'tp_hit' },
  { id: 4, pair: 'BNB/USD', market: 'Crypto', direction: 'SHORT', entry: '$578.00', tp: '$540.00', sl: '$600.00', price: 3.99, buyers: 34, revenue: 135.66, winRate: 81, status: 'closed', posted: '2d ago', result: 'tp_hit' },
  { id: 5, pair: 'DOGE/USD', market: 'Crypto', direction: 'SHORT', entry: '$0.162', tp: '$0.140', sl: '$0.175', price: 1.99, buyers: 89, revenue: 177.11, winRate: 65, status: 'closed', posted: '3d ago', result: 'sl_hit' },
  { id: 6, pair: 'BTC/USD', market: 'Crypto', direction: 'SHORT', entry: '$71,200', tp: '$68,000', sl: '$73,000', price: 4.99, buyers: 48, revenue: 239.52, winRate: 84, status: 'pending', posted: 'Just now' },
];

const RECENT_SALES = [
  { id: 1, user: 'Trader_Mike', signal: 'BTC/USD', amount: 4.49, time: '3m ago' },
  { id: 2, user: 'CryptoGirl', signal: 'ETH/USD', amount: 3.59, time: '12m ago' },
  { id: 3, user: 'ForexKing', signal: 'BTC/USD', amount: 4.49, time: '28m ago' },
  { id: 4, user: 'StockHunter', signal: 'SOL/USD', amount: 3.14, time: '45m ago' },
  { id: 5, user: 'CryptoWizard', signal: 'ETH/USD', amount: 3.59, time: '1h ago' },
];

const WEEKLY_EARNINGS = [180, 240, 195, 310, 280, 420, 334];
const WEEKLY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const STATUS_STYLES: Record<SignalStatus, { label: string; color: string; bg: string }> = {
  active: { label: 'Active', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  closed: { label: 'Closed', color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-500/20' },
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
};

const RESULT_STYLES = {
  tp_hit: { label: 'TP Hit ✅', color: 'text-green-400' },
  sl_hit: { label: 'SL Hit ❌', color: 'text-red-400' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

// ─── Page ─────────────────────────────────────────────────────────
export default function ProviderDashboard() {
  const [filter, setFilter] = useState<'all' | SignalStatus>('all');
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawDone, setWithdrawDone] = useState(false);

  const stats = useMemo(() => {
    const totalRevenue = MY_SIGNALS.reduce((s, sig) => s + sig.revenue, 0);
    const monthRevenue = MY_SIGNALS.slice(0, 4).reduce((s, sig) => s + sig.revenue, 0);
    const totalBuyers = MY_SIGNALS.reduce((s, sig) => s + sig.buyers, 0);
    const avgWinRate = Math.round(MY_SIGNALS.reduce((s, sig) => s + sig.winRate, 0) / MY_SIGNALS.length);
    const available = totalRevenue * 0.9; // 90% after platform 10% fee
    return { totalRevenue, monthRevenue, totalBuyers, avgWinRate, available };
  }, []);

  const filtered = useMemo(() =>
    filter === 'all' ? MY_SIGNALS : MY_SIGNALS.filter(s => s.status === filter),
    [filter]
  );

  const maxEarning = Math.max(...WEEKLY_EARNINGS);

  const handleWithdraw = async () => {
    setWithdrawing(true);
    await new Promise(r => setTimeout(r, 1400));
    setWithdrawing(false);
    setWithdrawDone(true);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Provider Dashboard</h1>
          <p className="text-zinc-600 text-xs font-mono mt-0.5">Track your signals, earnings and payouts</p>
        </div>
        <Link
          href="/provider/create-signal"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-display font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Post Signal
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
          { label: 'TOTAL EARNINGS', value: `$${stats.totalRevenue.toFixed(2)}`, sub: 'After platform fee', icon: '💰', color: 'text-green-400', trend: '+12.4% this month' },
          { label: 'THIS MONTH', value: `$${stats.monthRevenue.toFixed(2)}`, sub: 'May 2026', icon: '📅', color: 'text-orange-400', trend: null },
          { label: 'TOTAL BUYERS', value: stats.totalBuyers, sub: 'Across all signals', icon: '👥', color: 'text-blue-400', trend: '+8 this week' },
          { label: 'AVG WIN RATE', value: `${stats.avgWinRate}%`, sub: 'Across all signals', icon: '🎯', color: 'text-white', trend: null },
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
              <p className="text-green-400 text-[10px] font-mono mt-1.5">↑ {card.trend}</p>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* ── Main grid ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── Left: signals table ── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-white">My Signals</h2>
            <Link href="/provider/signals" className="text-xs text-orange-400 hover:text-orange-300 font-mono transition-colors">
              View all →
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {([
              { key: 'all', label: 'All' },
              { key: 'active', label: 'Active' },
              { key: 'pending', label: 'Pending' },
              { key: 'closed', label: 'Closed' },
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
                <span className="ml-1.5 text-zinc-700">
                  {tab.key === 'all' ? MY_SIGNALS.length : MY_SIGNALS.filter(s => s.status === tab.key).length}
                </span>
              </button>
            ))}
          </div>

          {/* Signals list */}
          <div className="space-y-3">
            {filtered.map((signal, i) => (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-4 hover:border-orange-500/20 transition-all"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold border flex-shrink-0 ${
                      signal.direction === 'LONG'
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      {signal.direction === 'LONG' ? '↑' : '↓'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-display font-bold text-white">{signal.pair}</p>
                        <span className="text-[10px] text-zinc-600 font-mono">{signal.market}</span>
                      </div>
                      <p className="text-zinc-600 text-[10px] font-mono">{signal.posted}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <span className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${STATUS_STYLES[signal.status].bg} ${STATUS_STYLES[signal.status].color}`}>
                      {STATUS_STYLES[signal.status].label}
                    </span>
                    {signal.result && (
                      <span className={`text-[10px] font-mono font-bold ${RESULT_STYLES[signal.result].color}`}>
                        {RESULT_STYLES[signal.result].label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Entry / TP / SL */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: 'ENTRY', value: signal.entry, color: 'text-white' },
                    { label: 'TP', value: signal.tp, color: 'text-green-400' },
                    { label: 'SL', value: signal.sl, color: 'text-red-400' },
                  ].map((item, j) => (
                    <div key={j} className="bg-[#0d0d0d] rounded-xl p-2.5 text-center">
                      <p className="text-[9px] text-zinc-700 font-mono mb-0.5">{item.label}</p>
                      <p className={`text-xs font-display font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[9px] text-zinc-700 font-mono">BUYERS</p>
                      <p className="text-white text-xs font-display font-bold">{signal.buyers}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-700 font-mono">REVENUE</p>
                      <p className="text-green-400 text-xs font-display font-bold">${signal.revenue.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-700 font-mono">PRICE</p>
                      <p className="text-orange-400 text-xs font-display font-bold">${signal.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-14 bg-[#1a1a1a] rounded-full h-1">
                      <div className="bg-green-500 h-1 rounded-full" style={{ width: `${signal.winRate}%` }} />
                    </div>
                    <span className="text-green-400 text-[10px] font-mono">{signal.winRate}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 bg-[#111] border border-[#1f1f1f] rounded-2xl">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-zinc-500 text-sm font-mono">No signals in this category</p>
              <Link href="/provider/create-signal" className="inline-block mt-3 text-orange-400 text-xs font-mono hover:text-orange-300 transition-colors">
                Post your first signal →
              </Link>
            </div>
          )}
        </div>

        {/* ── Right column ── */}
        <div className="space-y-5">

          {/* Earnings chart */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-white text-sm">Weekly Earnings</h3>
              <span className="text-green-400 text-xs font-mono">↑ +24%</span>
            </div>
            <div className="flex items-end gap-1.5 h-24 mb-2">
              {WEEKLY_EARNINGS.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md transition-all"
                    style={{
                      height: `${(val / maxEarning) * 100}%`,
                      background: i === 6 ? '#f97316' : i >= 4 ? 'rgba(249,115,22,0.35)' : '#1f1f1f',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {WEEKLY_LABELS.map((d, i) => (
                <span key={i} className="flex-1 text-center text-[9px] text-zinc-700 font-mono">{d}</span>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#1a1a1a] flex items-center justify-between">
              <span className="text-zinc-600 text-[11px] font-mono">This week</span>
              <span className="text-orange-400 font-display font-bold text-sm">$334.00</span>
            </div>
          </div>

          {/* Withdrawal card */}
          <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-semibold text-white text-sm">Available Balance</h3>
                <span className="text-[10px] text-zinc-600 font-mono">After 10% fee</span>
              </div>
              <p className="font-display font-bold text-3xl text-orange-400 mb-1">
                ${stats.available.toFixed(2)}
              </p>
              <p className="text-zinc-600 text-[11px] font-mono mb-4">Total earned: ${stats.totalRevenue.toFixed(2)}</p>

              {!withdrawOpen ? (
                <button
                  onClick={() => setWithdrawOpen(true)}
                  className="w-full bg-orange-500 hover:bg-orange-400 text-white font-display font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/25 text-sm"
                >
                  Withdraw Earnings →
                </button>
              ) : withdrawDone ? (
                <div className="text-center py-3">
                  <p className="text-2xl mb-1">✅</p>
                  <p className="text-green-400 text-sm font-display font-bold">Withdrawal Requested!</p>
                  <p className="text-zinc-600 text-[11px] font-mono mt-1">Funds arrive within 1-2 business days</p>
                  <button onClick={() => { setWithdrawOpen(false); setWithdrawDone(false); setWithdrawAmount(''); }}
                    className="mt-3 text-xs text-zinc-600 hover:text-zinc-400 font-mono transition-colors">
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-zinc-600 font-mono tracking-widest block mb-1.5">AMOUNT (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-mono">$</span>
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={e => setWithdrawAmount(e.target.value)}
                        placeholder="0.00"
                        max={stats.available}
                        className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl pl-7 pr-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
                      />
                    </div>
                    <button
                      onClick={() => setWithdrawAmount(stats.available.toFixed(2))}
                      className="text-[10px] text-orange-400 font-mono mt-1 hover:text-orange-300 transition-colors"
                    >
                      Max: ${stats.available.toFixed(2)}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setWithdrawOpen(false)}
                      className="py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-500 hover:text-white rounded-xl text-xs font-mono transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleWithdraw}
                      disabled={withdrawing || !withdrawAmount}
                      className="py-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white rounded-xl text-xs font-display font-bold transition-all"
                    >
                      {withdrawing ? (
                        <span className="flex items-center justify-center gap-1.5">
                          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing
                        </span>
                      ) : 'Confirm'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent sales */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white text-sm mb-4">Recent Sales</h3>
            <div className="space-y-3">
              {RECENT_SALES.map(sale => (
                <div key={sale.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      {sale.user[0]}
                    </div>
                    <div>
                      <p className="text-zinc-300 text-xs font-mono">{sale.user}</p>
                      <p className="text-zinc-700 text-[10px] font-mono">{sale.signal} · {sale.time}</p>
                    </div>
                  </div>
                  <span className="text-green-400 text-xs font-display font-bold">+${sale.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top performing signal */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white text-sm mb-3">Top Performing Signal</h3>
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-display font-bold text-white">BTC/USD</p>
                  <p className="text-[10px] text-zinc-600 font-mono">LONG · Crypto</p>
                </div>
                <span className="text-xs font-mono text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-lg">84% WR</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[9px] text-zinc-700 font-mono">BUYERS</p>
                  <p className="text-white text-sm font-display font-bold">67</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-700 font-mono">REVENUE</p>
                  <p className="text-green-400 text-sm font-display font-bold">$334</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-700 font-mono">PRICE</p>
                  <p className="text-orange-400 text-sm font-display font-bold">$4.99</p>
                </div>
              </div>
            </div>
            <Link href="/provider/signals"
              className="mt-3 block text-center text-xs text-zinc-600 hover:text-zinc-400 font-mono transition-colors">
              View all signals →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}