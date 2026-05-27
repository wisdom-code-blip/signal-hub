'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BANKS = ['Access Bank', 'GTBank', 'Zenith Bank', 'UBA', 'First Bank', 'Fidelity Bank', 'Stanbic IBTC', 'Polaris Bank', 'Sterling Bank', 'FCMB'];

const HISTORY = [
  { id: 1, amount: 120.00, bank: 'GTBank', account: '****4521', date: 'May 20, 2026', status: 'completed' },
  { id: 2, amount: 85.50, bank: 'Access Bank', account: '****2341', date: 'May 12, 2026', status: 'completed' },
  { id: 3, amount: 39.50, bank: 'GTBank', account: '****4521', date: 'May 5, 2026', status: 'completed' },
];

export default function WithdrawPage() {
  const available = 1123.79;
  const [step, setStep] = useState<'form' | 'confirm' | 'done'>('form');
  const [form, setForm] = useState({ amount: '', bank: '', accountNumber: '', accountName: '' });
  const [submitting, setSubmitting] = useState(false);

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const canConfirm = form.amount && Number(form.amount) >= 5 && Number(form.amount) <= available && form.bank && form.accountNumber.length >= 10 && form.accountName;

  const handleConfirm = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setStep('done');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">

      <div>
        <h1 className="font-display font-bold text-2xl text-white">Withdraw Earnings</h1>
        <p className="text-zinc-600 text-xs font-mono mt-0.5">Withdraw directly to your Nigerian bank account via Paystack</p>
      </div>

      {/* Balance card */}
      <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-2xl p-6">
        <p className="text-[10px] text-zinc-500 font-mono tracking-widest mb-1">AVAILABLE BALANCE</p>
        <p className="font-display font-bold text-4xl text-orange-400 mb-1">${available.toFixed(2)}</p>
        <p className="text-zinc-600 text-xs font-mono">After 10% platform fee · Min withdrawal: $5.00</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 space-y-5">

            {/* Amount */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] text-zinc-500 font-mono tracking-widest">AMOUNT (USD)</label>
                <button onClick={() => update('amount', available.toFixed(2))}
                  className="text-[10px] text-orange-400 font-mono hover:text-orange-300 transition-colors">
                  Max: ${available.toFixed(2)}
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-mono">$</span>
                <input type="number" value={form.amount} onChange={e => update('amount', e.target.value)}
                  placeholder="0.00" min={5} max={available}
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl pl-8 pr-4 py-3 text-white text-sm font-mono outline-none transition-all" />
              </div>
              {form.amount && Number(form.amount) < 5 && (
                <p className="text-red-400 text-[10px] font-mono mt-1">Minimum withdrawal is $5.00</p>
              )}
            </div>

            {/* Quick amounts */}
            <div className="flex gap-2">
              {[25, 50, 100, 250].map(amt => (
                <button key={amt} onClick={() => update('amount', String(Math.min(amt, available)))}
                  className="flex-1 py-2 bg-[#0d0d0d] border border-[#2a2a2a] hover:border-orange-500/30 text-zinc-500 hover:text-orange-400 text-xs font-mono rounded-lg transition-all">
                  ${amt}
                </button>
              ))}
            </div>

            {/* Bank */}
            <div>
              <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">BANK</label>
              <select value={form.bank} onChange={e => update('bank', e.target.value)}
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl px-4 py-3 text-white text-sm font-mono outline-none transition-all cursor-pointer appearance-none">
                <option value="">Select your bank</option>
                {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Account number */}
            <div>
              <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">ACCOUNT NUMBER</label>
              <input value={form.accountNumber} onChange={e => update('accountNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit account number" maxLength={10}
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl px-4 py-3 text-white text-sm font-mono outline-none transition-all" />
            </div>

            {/* Account name */}
            <div>
              <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">ACCOUNT NAME</label>
              <input value={form.accountName} onChange={e => update('accountName', e.target.value)}
                placeholder="As it appears on your bank account"
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl px-4 py-3 text-white text-sm font-mono outline-none transition-all" />
            </div>

            {/* Info */}
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 space-y-2">
              {[
                { label: 'Processing Time', value: '1–2 business days' },
                { label: 'Withdrawal Fee', value: 'Free' },
                { label: 'Powered by', value: 'Paystack' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-zinc-600 text-xs font-mono">{item.label}</span>
                  <span className="text-zinc-400 text-xs font-mono">{item.value}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setStep('confirm')} disabled={!canConfirm}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25">
              Review Withdrawal →
            </button>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div key="confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 space-y-5">
            <h2 className="font-display font-bold text-white">Confirm Withdrawal</h2>
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 space-y-3">
              {[
                { label: 'Amount', value: `$${Number(form.amount).toFixed(2)}`, bold: true },
                { label: 'Bank', value: form.bank },
                { label: 'Account Number', value: form.accountNumber },
                { label: 'Account Name', value: form.accountName },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-zinc-600 text-xs font-mono">{item.label}</span>
                  <span className={`text-xs font-mono ${item.bold ? 'text-orange-400 font-bold text-sm' : 'text-zinc-300'}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-zinc-600 text-[11px] font-mono text-center">
              Funds will arrive within 1–2 business days via Paystack
            </p>
            <div className="flex gap-3">
              <button onClick={() => setStep('form')} className="flex-1 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-400 rounded-xl text-sm font-mono hover:text-white transition-all">
                ← Back
              </button>
              <button onClick={handleConfirm} disabled={submitting}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-display font-bold rounded-xl transition-all">
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : 'Confirm Withdrawal'}
              </button>
            </div>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-green-500/20 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🏦</div>
            <h2 className="font-display font-bold text-xl text-white mb-2">Withdrawal Requested!</h2>
            <p className="text-zinc-500 text-sm font-mono mb-1">
              <span className="text-orange-400 font-bold">${Number(form.amount).toFixed(2)}</span> is on its way to {form.bank}
            </p>
            <p className="text-zinc-600 text-xs font-mono mb-6">Expected arrival: 1–2 business days</p>
            <button onClick={() => { setStep('form'); setForm({ amount: '', bank: '', accountNumber: '', accountName: '' }); }}
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-display font-bold py-3 rounded-xl transition-all">
              Make Another Withdrawal
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdrawal history */}
      <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1a1a1a]">
          <h2 className="font-display font-semibold text-white text-sm">Withdrawal History</h2>
        </div>
        <div className="divide-y divide-[#161616]">
          {HISTORY.map(tx => (
            <div key={tx.id} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-sm">🏦</div>
                <div>
                  <p className="text-zinc-300 text-xs font-mono">{tx.bank} · {tx.account}</p>
                  <p className="text-zinc-700 text-[10px] font-mono">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-display font-bold text-sm">-${tx.amount.toFixed(2)}</p>
                <span className="text-[10px] text-green-400 font-mono">Completed ✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}