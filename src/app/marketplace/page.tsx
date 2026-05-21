'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────
interface Signal {
  id: number;
  pair: string;
  market: 'forex' | 'crypto' | 'stocks';
  direction: 'LONG' | 'SHORT';
  entry: string;
  tp: string;
  sl: string;
  provider: string;
  providerRating: number;
  winRate: number;
  price: number;
  buyers: number;
  verified: boolean;
  posted: string;
  risk: 'Low' | 'Medium' | 'High';
  description: string;
}

// ─── Mock Data ────────────────────────────────────────────────────
const ALL_SIGNALS: Signal[] = [
  { id: 1, pair: 'BTC/USD', market: 'crypto', direction: 'LONG', entry: '$67,800', tp: '$72,000', sl: '$65,500', provider: 'CryptoKing', providerRating: 4.9, winRate: 84, price: 4.99, buyers: 67, verified: true, posted: '2m ago', risk: 'Medium', description: 'Strong bullish momentum after breaking key resistance. RSI divergence confirmed on 4H.' },
  { id: 2, pair: 'EUR/USD', market: 'forex', direction: 'SHORT', entry: '1.0892', tp: '1.0810', sl: '1.0940', provider: 'ForexMaster', providerRating: 4.7, winRate: 78, price: 2.99, buyers: 23, verified: true, posted: '5m ago', risk: 'Low', description: 'DXY strength pushing EUR lower. ECB dovish signals add pressure. Clean structure short.' },
  { id: 3, pair: 'ETH/USD', market: 'crypto', direction: 'LONG', entry: '$3,820', tp: '$4,100', sl: '$3,650', provider: 'EtherWhale', providerRating: 4.8, winRate: 79, price: 3.99, buyers: 54, verified: true, posted: '8m ago', risk: 'Medium', description: 'ETH accumulation zone confirmed. Stoch RSI oversold on daily, bullish engulfing candle.' },
  { id: 4, pair: 'GBP/JPY', market: 'forex', direction: 'LONG', entry: '191.20', tp: '193.80', sl: '190.00', provider: 'LondonTrader', providerRating: 4.8, winRate: 82, price: 3.49, buyers: 18, verified: true, posted: '12m ago', risk: 'High', description: 'BoJ intervention risk fading. GBP strength on UK jobs data. Targeting weekly highs.' },
  { id: 5, pair: 'SOL/USD', market: 'crypto', direction: 'LONG', entry: '$160.50', tp: '$182.00', sl: '$152.00', provider: 'SolanaBull', providerRating: 4.85, winRate: 88, price: 3.49, buyers: 42, verified: false, posted: '15m ago', risk: 'High', description: 'SOL breakout from 3-week consolidation. High volume confirms buyers in control.' },
  { id: 6, pair: 'NVDA', market: 'stocks', direction: 'LONG', entry: '$888.00', tp: '$950.00', sl: '$860.00', provider: 'AIInvestor', providerRating: 4.95, winRate: 91, price: 4.99, buyers: 78, verified: true, posted: '20m ago', risk: 'Medium', description: 'NVDA pre-earnings momentum play. AI infrastructure demand intact. Strong institutional buying.' },
  { id: 7, pair: 'AUD/USD', market: 'forex', direction: 'SHORT', entry: '0.6590', tp: '0.6480', sl: '0.6650', provider: 'AussieShark', providerRating: 4.6, winRate: 71, price: 2.49, buyers: 31, verified: false, posted: '25m ago', risk: 'Low', description: 'China slowdown weighing on AUD. RBA on hold, USD bid. Key support break confirmed.' },
  { id: 8, pair: 'BNB/USD', market: 'crypto', direction: 'LONG', entry: '$578.00', tp: '$620.00', sl: '$555.00', provider: 'BinancePro', providerRating: 4.7, winRate: 81, price: 3.99, buyers: 34, verified: true, posted: '30m ago', risk: 'Medium', description: 'BNB holding major support. Binance volume surge detected. Altcoin season indicator rising.' },
  { id: 9, pair: 'AAPL', market: 'stocks', direction: 'LONG', entry: '$185.00', tp: '$198.00', sl: '$179.00', provider: 'TechTrader', providerRating: 4.6, winRate: 76, price: 3.49, buyers: 45, verified: true, posted: '35m ago', risk: 'Low', description: 'AAPL finding support at 200MA. Services revenue beat incoming. Classic buy-the-dip setup.' },
  { id: 10, pair: 'USD/CAD', market: 'forex', direction: 'SHORT', entry: '1.3750', tp: '1.3600', sl: '1.3830', provider: 'OilTrader', providerRating: 4.65, winRate: 76, price: 2.99, buyers: 27, verified: false, posted: '40m ago', risk: 'Medium', description: 'Oil prices recovering, CAD strengthening. BoC hawkish tone. USD/CAD topping pattern.' },
  { id: 11, pair: 'DOGE/USD', market: 'crypto', direction: 'SHORT', entry: '$0.162', tp: '$0.140', sl: '$0.175', provider: 'MemeMaster', providerRating: 4.3, winRate: 65, price: 1.99, buyers: 89, verified: false, posted: '45m ago', risk: 'High', description: 'DOGE rejection at resistance. Retail fomo cooling down. Risk-off sentiment in meme coins.' },
  { id: 12, pair: 'TSLA', market: 'stocks', direction: 'SHORT', entry: '$177.00', tp: '$158.00', sl: '$188.00', provider: 'MuskWatcher', providerRating: 4.4, winRate: 69, price: 3.99, buyers: 23, verified: false, posted: '1h ago', risk: 'High', description: 'TSLA delivery miss priced in. Broader EV sector weakness. Short squeeze risk managed with tight SL.' },
];

// ─── Buy Modal ────────────────────────────────────────────────────
function BuyModal({ signal, onClose }: { signal: Signal; onClose: () => void }) {
  const [purchasing, setPurchasing] = useState(false);
  const [done, setDone] = useState(false);

  const handleBuy = async () => {
    setPurchasing(true);
    await new Promise(r => setTimeout(r, 1200));
    setPurchasing(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative bg-[#111] border border-[#2a2a2a] rounded-3xl p-6 w-full max-w-md shadow-2xl shadow-black/80 z-10"
      >
        {!done ? (
          <>
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    signal.direction === 'LONG' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>{signal.direction}</span>
                  <span className="text-xs text-zinc-600 font-mono">{signal.market.toUpperCase()}</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-white">{signal.pair}</h2>
                <p className="text-zinc-500 text-xs font-mono mt-0.5">by {signal.provider} · ★ {signal.providerRating}</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1a1a] hover:bg-[#222] text-zinc-500 hover:text-white transition-all">✕</button>
            </div>

            {/* Signal details */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'ENTRY', value: signal.entry, color: 'text-white' },
                { label: 'TAKE PROFIT', value: signal.tp, color: 'text-green-400' },
                { label: 'STOP LOSS', value: signal.sl, color: 'text-red-400' },
              ].map((item, i) => (
                <div key={i} className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-zinc-600 font-mono mb-1">{item.label}</p>
                  <p className={`font-display font-bold text-sm ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-3">
                <p className="text-[10px] text-zinc-600 font-mono mb-1">WIN RATE</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#1f1f1f] rounded-full h-1.5">
                    <div className="bg-green-500 rounded-full h-1.5" style={{ width: `${signal.winRate}%` }} />
                  </div>
                  <span className="text-green-400 text-xs font-mono font-bold">{signal.winRate}%</span>
                </div>
              </div>
              <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-3 text-center">
                <p className="text-[10px] text-zinc-600 font-mono mb-1">RISK</p>
                <p className={`text-xs font-mono font-bold ${
                  signal.risk === 'Low' ? 'text-green-400' : signal.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                }`}>{signal.risk}</p>
              </div>
              <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-3 text-center">
                <p className="text-[10px] text-zinc-600 font-mono mb-1">BUYERS</p>
                <p className="text-white text-xs font-mono font-bold">{signal.buyers}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 mb-5">
              <p className="text-[10px] text-zinc-600 font-mono mb-1.5">ANALYSIS</p>
              <p className="text-zinc-400 text-sm leading-relaxed">{signal.description}</p>
            </div>

            {/* Price + Buy */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-zinc-600 text-xs font-mono">ONE-TIME PAYMENT</p>
                <p className="font-display font-bold text-2xl text-orange-500">${signal.price.toFixed(2)}</p>
              </div>
              <button
                onClick={handleBuy}
                disabled={purchasing}
                className="flex-1 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-display font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
              >
                {purchasing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : `Buy for $${signal.price.toFixed(2)}`}
              </button>
            </div>

            <p className="text-center text-[11px] text-zinc-700 font-mono mt-3">
              🔒 Secure payment via Paystack · Full refund if signal is invalid
            </p>
          </>
        ) : (
          /* Success state */
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-3xl">✅</div>
            <h2 className="font-display font-bold text-xl text-white mb-2">Signal Unlocked!</h2>
            <p className="text-zinc-500 text-sm font-mono mb-1">You now have full access to</p>
            <p className="text-orange-400 font-display font-bold text-lg mb-6">{signal.pair} · {signal.direction}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'ENTRY', value: signal.entry, color: 'text-white' },
                { label: 'TAKE PROFIT', value: signal.tp, color: 'text-green-400' },
                { label: 'STOP LOSS', value: signal.sl, color: 'text-red-400' },
              ].map((item, i) => (
                <div key={i} className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-zinc-600 font-mono mb-1">{item.label}</p>
                  <p className={`font-display font-bold text-sm ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
            <Link href="/dashboard"
              className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-display font-bold py-3 rounded-xl transition-all mb-3">
              View in Dashboard →
            </Link>
            <button onClick={onClose} className="text-zinc-600 hover:text-zinc-400 text-sm font-mono transition-colors">
              Continue browsing
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Signal Card ──────────────────────────────────────────────────
function SignalCard({ signal, onBuy }: { signal: Signal; onBuy: (s: Signal) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 hover:border-orange-500/30 transition-all group flex flex-col"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
              signal.direction === 'LONG'
                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>{signal.direction}</span>
            <span className="text-[10px] text-zinc-600 font-mono uppercase">{signal.market}</span>
            {signal.verified && (
              <span className="text-[10px] text-blue-400 font-mono flex items-center gap-0.5">✓ Verified</span>
            )}
          </div>
          <h3 className="font-display font-bold text-xl text-white">{signal.pair}</h3>
        </div>
        <span className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${
          signal.risk === 'Low' ? 'bg-green-500/10 text-green-400 border-green-500/20'
          : signal.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
          : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>{signal.risk} Risk</span>
      </div>

      {/* Entry / TP / SL */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'ENTRY', value: signal.entry, color: 'text-white' },
          { label: 'TP', value: signal.tp, color: 'text-green-400' },
          { label: 'SL', value: signal.sl, color: 'text-red-400' },
        ].map((item, i) => (
          <div key={i} className="bg-[#0d0d0d] rounded-xl p-2.5 text-center">
            <p className="text-[9px] text-zinc-700 font-mono mb-0.5">{item.label}</p>
            <p className={`text-xs font-display font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Provider + win rate */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-[10px] font-bold">
            {signal.provider[0]}
          </div>
          <div>
            <p className="text-xs text-zinc-300 font-mono">{signal.provider}</p>
            <p className="text-[10px] text-yellow-500 font-mono">★ {signal.providerRating}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end mb-0.5">
            <div className="w-14 bg-[#1f1f1f] rounded-full h-1">
              <div className="bg-green-500 rounded-full h-1" style={{ width: `${signal.winRate}%` }} />
            </div>
            <span className="text-green-400 text-[10px] font-mono">{signal.winRate}%</span>
          </div>
          <p className="text-[10px] text-zinc-600 font-mono">{signal.buyers} bought · {signal.posted}</p>
        </div>
      </div>

      {/* Price + Buy */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#1a1a1a]">
        <div>
          <p className="text-[10px] text-zinc-600 font-mono">PRICE</p>
          <p className="font-display font-bold text-orange-400 text-lg">${signal.price.toFixed(2)}</p>
        </div>
        <button
          onClick={() => onBuy(signal)}
          className="flex-1 bg-orange-500/10 hover:bg-orange-500 border border-orange-500/20 hover:border-orange-500 text-orange-400 hover:text-white font-display font-semibold py-2.5 rounded-xl transition-all text-sm"
        >
          Buy Signal →
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [market, setMarket] = useState<'all' | 'forex' | 'crypto' | 'stocks'>('all');
  const [direction, setDirection] = useState<'all' | 'LONG' | 'SHORT'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5);
  const [minWinRate, setMinWinRate] = useState(0);
  const [sortBy, setSortBy] = useState<'winRate' | 'price_asc' | 'price_desc' | 'newest' | 'popular'>('winRate');
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = ALL_SIGNALS.filter(s => {
      if (market !== 'all' && s.market !== market) return false;
      if (direction !== 'all' && s.direction !== direction) return false;
      if (verifiedOnly && !s.verified) return false;
      if (s.price > maxPrice) return false;
      if (s.winRate < minWinRate) return false;
      if (search && !s.pair.toLowerCase().includes(search.toLowerCase()) && !s.provider.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'winRate') return b.winRate - a.winRate;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'popular') return b.buyers - a.buyers;
      return b.id - a.id;
    });

    return list;
  }, [market, direction, verifiedOnly, maxPrice, minWinRate, search, sortBy]);

  return (
    <div className="min-h-screen bg-[#080808]">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[120px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 border-b border-[#1f1f1f] bg-[#080808]/90 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-orange-500/30">S</div>
            <span className="font-display font-bold text-base hidden sm:block">
              <span className="text-white">Signal</span><span className="text-orange-500">Hub</span>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search pair or provider..."
              className="w-full bg-[#111] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#111] border border-[#2a2a2a] rounded-lg text-zinc-400 text-sm font-mono"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filters
            </button>
            <Link href="/dashboard" className="px-3 py-2 text-sm text-zinc-400 hover:text-white font-mono transition-colors">Dashboard</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 flex gap-6 relative z-10">

        {/* ── Sidebar ── */}
        <aside className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] z-30
          w-64 bg-[#0d0d0d] lg:bg-transparent border-r lg:border-r-0 border-[#1f1f1f]
          overflow-y-auto flex-shrink-0 transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          p-5 lg:p-0 space-y-6
        `}>
          {/* Close on mobile */}
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden flex items-center gap-2 text-zinc-600 text-xs font-mono mb-2">
            ✕ Close filters
          </button>

          {/* Market */}
          <div>
            <p className="text-[10px] text-zinc-600 font-mono tracking-widest mb-3">MARKET</p>
            <div className="flex flex-col gap-1">
              {(['all', 'forex', 'crypto', 'stocks'] as const).map(m => (
                <button key={m} onClick={() => setMarket(m)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-mono transition-all ${
                    market === m ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400' : 'text-zinc-500 hover:text-white hover:bg-white/5'
                  }`}>
                  <span className="flex items-center gap-2">
                    {m === 'all' ? '⊞' : m === 'forex' ? '💱' : m === 'crypto' ? '₿' : '📈'}
                    <span className="capitalize">{m === 'all' ? 'All Markets' : m}</span>
                  </span>
                  <span className="text-[10px] text-zinc-700">
                    {m === 'all' ? ALL_SIGNALS.length : ALL_SIGNALS.filter(s => s.market === m).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Direction */}
          <div>
            <p className="text-[10px] text-zinc-600 font-mono tracking-widest mb-3">DIRECTION</p>
            <div className="flex gap-2">
              {(['all', 'LONG', 'SHORT'] as const).map(d => (
                <button key={d} onClick={() => setDirection(d)}
                  className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                    direction === d
                      ? d === 'LONG' ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : d === 'SHORT' ? 'bg-red-500/10 border-red-500/20 text-red-400'
                        : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                      : 'bg-transparent border-[#2a2a2a] text-zinc-600 hover:text-zinc-400'
                  }`}>
                  {d === 'all' ? 'All' : d}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-zinc-600 font-mono tracking-widest">MAX PRICE</p>
              <span className="text-orange-400 font-mono text-xs font-bold">${maxPrice.toFixed(2)}</span>
            </div>
            <input
              type="range" min={1} max={5} step={0.5}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-700 font-mono mt-1">
              <span>$1.00</span><span>$5.00</span>
            </div>
          </div>

          {/* Min win rate */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-zinc-600 font-mono tracking-widest">MIN WIN RATE</p>
              <span className="text-orange-400 font-mono text-xs font-bold">{minWinRate}%</span>
            </div>
            <input
              type="range" min={0} max={90} step={5}
              value={minWinRate}
              onChange={e => setMinWinRate(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-700 font-mono mt-1">
              <span>0%</span><span>90%</span>
            </div>
          </div>

          {/* Verified toggle */}
          <div>
            <p className="text-[10px] text-zinc-600 font-mono tracking-widest mb-3">FILTERS</p>
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-mono transition-all border ${
                verifiedOnly ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'border-[#2a2a2a] text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>✓</span> Verified Only
              </span>
              <div className={`w-8 h-4 rounded-full transition-colors ${verifiedOnly ? 'bg-blue-500' : 'bg-[#2a2a2a]'} relative`}>
                <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all ${verifiedOnly ? 'left-4' : 'left-0.5'}`} />
              </div>
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={() => { setMarket('all'); setDirection('all'); setVerifiedOnly(false); setMaxPrice(5); setMinWinRate(0); setSearch(''); }}
            className="w-full py-2 text-xs text-zinc-700 hover:text-zinc-500 font-mono transition-colors border border-[#1f1f1f] rounded-xl"
          >
            Reset Filters
          </button>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="font-display font-bold text-xl text-white">
                Signal Marketplace
              </h1>
              <p className="text-zinc-600 text-xs font-mono mt-0.5">
                {filtered.length} signals available
              </p>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-[#111] border border-[#2a2a2a] text-zinc-400 text-sm font-mono rounded-xl px-3 py-2 outline-none focus:border-orange-500/40 transition-all cursor-pointer"
            >
              <option value="winRate">Sort: Best Win Rate</option>
              <option value="popular">Sort: Most Popular</option>
              <option value="price_asc">Sort: Lowest Price</option>
              <option value="price_desc">Sort: Highest Price</option>
              <option value="newest">Sort: Newest</option>
            </select>
          </div>

          {/* Market quick tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {(['all', 'forex', 'crypto', 'stocks'] as const).map(m => (
              <button key={m} onClick={() => setMarket(m)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  market === m ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-[#111] border border-[#2a2a2a] text-zinc-500 hover:text-white'
                }`}>
                {m === 'all' ? 'All' : m === 'forex' ? '💱 Forex' : m === 'crypto' ? '₿ Crypto' : '📈 Stocks'}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(signal => (
                <SignalCard key={signal.id} signal={signal} onBuy={setSelectedSignal} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-display font-bold text-white text-lg mb-2">No signals found</h3>
              <p className="text-zinc-600 text-sm font-mono">Try adjusting your filters or search query</p>
            </div>
          )}
        </main>
      </div>

      {/* Buy Modal */}
      <AnimatePresence>
        {selectedSignal && (
          <BuyModal signal={selectedSignal} onClose={() => setSelectedSignal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}