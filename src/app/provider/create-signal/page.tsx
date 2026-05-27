'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const MARKETS = ['Forex', 'Crypto', 'Stocks'];
const PAIRS: Record<string, string[]> = {
  Forex: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'GBP/JPY', 'AUD/USD', 'USD/CAD', 'NZD/USD', 'USD/CHF', 'EUR/GBP', 'EUR/JPY'],
  Crypto: ['BTC/USD', 'ETH/USD', 'SOL/USD', 'BNB/USD', 'DOGE/USD', 'ADA/USD', 'XRP/USD', 'AVAX/USD', 'MATIC/USD', 'DOT/USD'],
  Stocks: ['AAPL', 'NVDA', 'TSLA', 'MSFT', 'AMZN', 'META', 'GOOGL', 'AMD', 'NFLX', 'COIN'],
};
const TIMEFRAMES = ['M15', 'M30', 'H1', 'H4', 'D1', 'W1'];
const RISKS = ['Low', 'Medium', 'High'];

export default function CreateSignalPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    market: 'Crypto',
    pair: '',
    customPair: '',
    direction: 'LONG' as 'LONG' | 'SHORT',
    entry: '',
    tp1: '',
    tp2: '',
    sl: '',
    timeframe: 'H4',
    risk: 'Medium',
    price: '4.99',
    analysis: '',
  });

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const canSubmit = form.pair && form.entry && form.tp1 && form.sl && form.price && form.analysis.length >= 30;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setDone(true);
  };

  if (done) return (
    <div className="max-w-lg mx-auto text-center py-20">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-[#111] border border-[#1f1f1f] rounded-3xl p-10">
        <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center text-4xl shadow-xl shadow-green-500/20">✅</div>
        <h1 className="font-display font-bold text-2xl text-white mb-2">Signal Posted!</h1>
        <p className="text-zinc-500 text-sm font-mono mb-2">
          <span className="text-orange-400 font-bold">{form.pair || form.customPair}</span> · {form.direction}
        </p>
        <p className="text-zinc-600 text-xs font-mono mb-8">Your signal is live on the marketplace. Buyers can now purchase it.</p>
        <div className="space-y-3">
          <button onClick={() => { setDone(false); setForm({ market: 'Crypto', pair: '', customPair: '', direction: 'LONG', entry: '', tp1: '', tp2: '', sl: '', timeframe: 'H4', risk: 'Medium', price: '4.99', analysis: '' }); }}
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-display font-bold py-3 rounded-xl transition-all">
            Post Another Signal
          </button>
          <button onClick={() => router.push('/provider/signals')}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-400 hover:text-white py-3 rounded-xl text-sm font-mono transition-all">
            View My Signals →
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-white">Post a Signal</h1>
        <p className="text-zinc-600 text-xs font-mono mt-0.5">Fill in your trade setup. Buyers will see your full analysis after purchase.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Market + Pair */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 space-y-4">
          <p className="text-[10px] text-zinc-500 font-mono tracking-widest">INSTRUMENT</p>

          {/* Market */}
          <div>
            <label className="text-[10px] text-zinc-600 font-mono block mb-2">MARKET</label>
            <div className="flex gap-2">
              {MARKETS.map(m => (
                <button key={m} type="button" onClick={() => { update('market', m); update('pair', ''); }}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-mono transition-all ${
                    form.market === m ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-500 hover:border-[#333]'
                  }`}>{m}</button>
              ))}
            </div>
          </div>

          {/* Pair */}
          <div>
            <label className="text-[10px] text-zinc-600 font-mono block mb-2">PAIR</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {PAIRS[form.market].map(p => (
                <button key={p} type="button" onClick={() => update('pair', p)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                    form.pair === p ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-600 hover:border-[#333] hover:text-zinc-400'
                  }`}>{p}</button>
              ))}
            </div>
            <input value={form.customPair} onChange={e => { update('customPair', e.target.value); update('pair', e.target.value); }}
              placeholder="Or type custom pair..."
              className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono" />
          </div>

          {/* Direction */}
          <div>
            <label className="text-[10px] text-zinc-600 font-mono block mb-2">DIRECTION</label>
            <div className="flex gap-2">
              {(['LONG', 'SHORT'] as const).map(d => (
                <button key={d} type="button" onClick={() => update('direction', d)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-mono font-bold transition-all ${
                    form.direction === d
                      ? d === 'LONG' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-500 hover:border-[#333]'
                  }`}>{d === 'LONG' ? '↑ LONG' : '↓ SHORT'}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Price levels */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 space-y-4">
          <p className="text-[10px] text-zinc-500 font-mono tracking-widest">PRICE LEVELS</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'ENTRY PRICE', key: 'entry', placeholder: 'e.g. 67800', color: 'focus:border-white/30' },
              { label: 'TAKE PROFIT 1', key: 'tp1', placeholder: 'e.g. 72000', color: 'focus:border-green-500/40' },
              { label: 'TAKE PROFIT 2 (optional)', key: 'tp2', placeholder: 'e.g. 75000', color: 'focus:border-green-500/40' },
              { label: 'STOP LOSS', key: 'sl', placeholder: 'e.g. 65500', color: 'focus:border-red-500/40' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-[10px] text-zinc-600 font-mono block mb-1.5">{field.label}</label>
                <input value={form[field.key as keyof typeof form]} onChange={e => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full bg-[#0d0d0d] border border-[#2a2a2a] ${field.color} rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono`} />
              </div>
            ))}
          </div>
        </div>

        {/* Timeframe + Risk */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 space-y-4">
          <p className="text-[10px] text-zinc-500 font-mono tracking-widest">TRADE DETAILS</p>
          <div>
            <label className="text-[10px] text-zinc-600 font-mono block mb-2">TIMEFRAME</label>
            <div className="flex gap-2 flex-wrap">
              {TIMEFRAMES.map(t => (
                <button key={t} type="button" onClick={() => update('timeframe', t)}
                  className={`px-4 py-2 rounded-lg border text-xs font-mono transition-all ${
                    form.timeframe === t ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-600 hover:border-[#333]'
                  }`}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-zinc-600 font-mono block mb-2">RISK LEVEL</label>
            <div className="flex gap-2">
              {RISKS.map(r => (
                <button key={r} type="button" onClick={() => update('risk', r)}
                  className={`flex-1 py-2 rounded-lg border text-xs font-mono transition-all ${
                    form.risk === r
                      ? r === 'Low' ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : r === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-600 hover:border-[#333]'
                  }`}>{r}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest">ANALYSIS</p>
            <span className={`text-[10px] font-mono ${form.analysis.length >= 30 ? 'text-green-400' : 'text-zinc-600'}`}>
              {form.analysis.length}/30 min chars
            </span>
          </div>
          <textarea value={form.analysis} onChange={e => update('analysis', e.target.value)} rows={5}
            placeholder="Explain your trade setup. What patterns do you see? Why are you entering here? What confirms the trade? (min 30 characters)"
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono resize-none" />
        </div>

        {/* Price */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 space-y-3">
          <p className="text-[10px] text-zinc-500 font-mono tracking-widest">SIGNAL PRICE</p>
          <div className="flex gap-2 flex-wrap">
            {['1.99', '2.99', '3.49', '3.99', '4.99'].map(p => (
              <button key={p} type="button" onClick={() => update('price', p)}
                className={`px-4 py-2 rounded-lg border text-sm font-mono font-bold transition-all ${
                  form.price === p ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-[#0d0d0d] border-[#2a2a2a] text-zinc-500 hover:border-[#333]'
                }`}>${p}</button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-3">
            <div className="flex-1">
              <p className="text-[10px] text-zinc-600 font-mono">YOUR EARNINGS (90%)</p>
              <p className="text-green-400 font-display font-bold text-lg">${(Number(form.price) * 0.9).toFixed(2)}</p>
            </div>
            <div className="w-px h-8 bg-[#2a2a2a]" />
            <div className="flex-1">
              <p className="text-[10px] text-zinc-600 font-mono">PLATFORM FEE (10%)</p>
              <p className="text-zinc-500 font-display font-bold text-lg">${(Number(form.price) * 0.1).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" disabled={!canSubmit || submitting}
          className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/25 text-base">
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Posting Signal...
            </span>
          ) : '📡 Post Signal to Marketplace'}
        </button>
      </form>
    </div>
  );
}