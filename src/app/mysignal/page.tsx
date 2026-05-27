'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Status = 'active' | 'closed' | 'pending';
type Direction = 'LONG' | 'SHORT';

interface Signal {
  id: number;
  pair: string;
  market: string;
  direction: Direction;
  entry: string;
  tp: string;
  sl: string;
  price: number;
  buyers: number;
  revenue: number;
  winRate: number;
  status: Status;
  result?: 'tp_hit' | 'sl_hit';
  posted: string;
}

const SIGNALS: Signal[] = [
  { id: 1, pair: 'BTC/USD', market: 'Crypto', direction: 'LONG', entry: '$67,800', tp: '$72,000', sl: '$65,500', price: 4.99, buyers: 67, revenue: 334.33, winRate: 84, status: 'active', posted: '2h ago' },
  { id: 2, pair: 'ETH/USD', market: 'Crypto', direction: 'LONG', entry: '$3,820', tp: '$4,100', sl: '$3,650', price: 3.99, buyers: 54, revenue: 215.46, winRate: 79, status: 'active', posted: '5h ago' },
  { id: 3, pair: 'SOL/USD', market: 'Crypto', direction: 'LONG', entry: '$160.50', tp: '$182.00', sl: '$152.00', price: 3.49, buyers: 42, revenue: 146.58, winRate: 88, status: 'closed', result: 'tp_hit', posted: '1d ago' },
  { id: 4, pair: 'BNB/USD', market: 'Crypto', direction: 'SHORT', entry: '$578.00', tp: '$540.00', sl: '$600.00', price: 3.99, buyers: 34, revenue: 135.66, winRate: 81, status: 'closed', result: 'tp_hit', posted: '2d ago' },
  { id: 5, pair: 'DOGE/USD', market: 'Crypto', direction: 'SHORT', entry: '$0.162', tp: '$0.140', sl: '$0.175', price: 1.99, buyers: 89, revenue: 177.11, winRate: 65, status: 'closed', result: 'sl_hit', posted: '3d ago' },
  { id: 6, pair: 'BTC/USD', market: 'Crypto', direction: 'SHORT', entry: '$71,200', tp: '$68,000', sl: '$73,000', price: 4.99, buyers: 12, revenue: 59.88, winRate: 84, status: 'pending', posted: 'Just now' },
  { id: 7, pair: 'EUR/USD', market: 'Forex', direction: 'SHORT', entry: '1.0892', tp: '1.0810', sl: '1.0940', price: 2.99, buyers: 28, revenue: 83.72, winRate: 76, status: 'closed', result: 'tp_hit', posted: '4d ago' },
  { id: 8, pair: 'GBP/JPY', market: 'Forex', direction: 'LONG', entry: '191.20', tp: '193.80', sl: '190.00', price: 3.49, buyers: 19, revenue: 66.31, winRate: 82, status: 'active', posted: '6h ago' },
];

const STATUS_STYLES = {
  active: { label: 'Active', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  closed: { label: 'Closed', color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-500/20' },
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
};

export default function MySignalsPage() {
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [signals, setSignals] = useState(SIGNALS);

  const filtered = useMemo(() => signals.filter(s => {
    if (filter !== 'all' && s.status !== filter) return false;
    if (search && !s.pair.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [signals, filter, search]);

  const handleDelete = (id: number) => {
    setSignals(prev => prev.filter(s => s.id !== id));
    setDeleteId(null);
  };

  const totalRevenue = signals.reduce((s, sig) => s + sig.revenue, 0);
  const totalBuyers = signals.reduce((s, sig) => s + sig.buyers, 0);

  return (
    <div className="space-y-6 max-w-[1100px] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">My Signals</h1>
          <p className="text-zinc-600 text-xs font-mono mt-0.5">{signals.length} total signals posted</p>
        </div>
        <Link href="/provider/create-signal"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-display font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/25">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Signal
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'TOTAL', value: signals.length, color: 'text-white' },
          { label: 'ACTIVE', value: signals.filter(s => s.status === 'active').length, color: 'text-blue-400' },
          { label: 'REVENUE', value: `$${totalRevenue.toFixed(0)}`, color: 'text-green-400' },
          { label: 'BUYERS', value: totalBuyers, color: 'text-orange-400' },
        ].map((c, i) => (
          <div key={i} className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4">
            <p className="text-[10px] text-zinc-600 font-mono tracking-widest mb-1">{c.label}</p>
            <p className={`font-display font-bold text-xl ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Filters + search */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1.5">
          {(['all', 'active', 'pending', 'closed'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                filter === f ? 'bg-orange-500/15 border border-orange-500/20 text-orange-400' : 'text-zinc-600 hover:text-zinc-400'
              }`}>
              {f} <span className="text-zinc-700 ml-1">
                {f === 'all' ? signals.length : signals.filter(s => s.status === f).length}
              </span>
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <svg className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pair..."
            className="bg-[#111] border border-[#1f1f1f] rounded-xl pl-8 pr-4 py-2 text-white text-xs font-mono placeholder:text-zinc-700 outline-none focus:border-orange-500/30 transition-all w-40" />
        </div>
      </div>

      {/* Signals table */}
      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                {['Pair', 'Direction', 'Entry / TP / SL', 'Buyers', 'Revenue', 'Win Rate', 'Status', ''].map((h, i) => (
                  <th key={i} className="text-left px-4 py-3.5 text-[10px] text-zinc-600 font-mono tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((sig, i) => (
                <motion.tr key={sig.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-[#161616] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-display font-bold text-white text-sm">{sig.pair}</p>
                    <p className="text-[10px] text-zinc-600 font-mono">{sig.market} · {sig.posted}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-md border ${
                      sig.direction === 'LONG' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>{sig.direction}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-[11px] font-mono space-y-0.5">
                      <p className="text-zinc-400">E: <span className="text-white">{sig.entry}</span></p>
                      <p className="text-zinc-400">TP: <span className="text-green-400">{sig.tp}</span></p>
                      <p className="text-zinc-400">SL: <span className="text-red-400">{sig.sl}</span></p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-white font-display font-bold text-sm">{sig.buyers}</p>
                    <p className="text-[10px] text-zinc-600 font-mono">${sig.price}/each</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-green-400 font-display font-bold text-sm">${sig.revenue.toFixed(2)}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-[#1a1a1a] rounded-full h-1">
                        <div className="bg-green-500 h-1 rounded-full" style={{ width: `${sig.winRate}%` }} />
                      </div>
                      <span className="text-green-400 text-[10px] font-mono">{sig.winRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border w-fit ${STATUS_STYLES[sig.status].bg} ${STATUS_STYLES[sig.status].color}`}>
                        {STATUS_STYLES[sig.status].label}
                      </span>
                      {sig.result && (
                        <span className={`text-[10px] font-mono font-bold ${sig.result === 'tp_hit' ? 'text-green-400' : 'text-red-400'}`}>
                          {sig.result === 'tp_hit' ? 'TP Hit ✅' : 'SL Hit ❌'}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button className="w-7 h-7 bg-[#1a1a1a] hover:bg-orange-500/10 border border-[#2a2a2a] hover:border-orange-500/20 rounded-lg flex items-center justify-center text-zinc-600 hover:text-orange-400 transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => setDeleteId(sig.id)}
                        className="w-7 h-7 bg-[#1a1a1a] hover:bg-red-500/10 border border-[#2a2a2a] hover:border-red-500/20 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">📭</p>
            <p className="text-zinc-600 text-sm font-mono">No signals found</p>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-sm z-10 text-center">
              <div className="text-4xl mb-3">🗑</div>
              <h3 className="font-display font-bold text-white mb-2">Delete Signal?</h3>
              <p className="text-zinc-500 text-sm font-mono mb-5">This action cannot be undone. Buyers who already purchased will retain access.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-400 rounded-xl text-sm font-mono transition-all hover:text-white">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-400 text-white rounded-xl text-sm font-display font-bold transition-all">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}