'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type NotifType = 'sale' | 'review' | 'system' | 'payout';

interface Notif {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const INITIAL: Notif[] = [
  { id: 1, type: 'sale', title: 'New Signal Sale!', body: 'Trader_Mike just bought your BTC/USD signal for $4.49', time: '3m ago', read: false },
  { id: 2, type: 'sale', title: 'New Signal Sale!', body: 'CryptoGirl just bought your ETH/USD signal for $3.59', time: '12m ago', read: false },
  { id: 3, type: 'review', title: 'New 5-Star Review', body: 'ForexKing left you a 5★ review: "Accurate and well-explained. Will buy again!"', time: '1h ago', read: false },
  { id: 4, type: 'sale', title: 'New Signal Sale!', body: 'StockHunter just bought your SOL/USD signal for $3.14', time: '2h ago', read: true },
  { id: 5, type: 'payout', title: 'Payout Processed', body: 'Your withdrawal of $120.00 has been sent to GTBank ****4521', time: '1d ago', read: true },
  { id: 6, type: 'system', title: 'Profile Tip', body: 'Providers with profile photos earn 2x more. Add yours in Settings.', time: '1d ago', read: true },
  { id: 7, type: 'sale', title: 'New Signal Sale!', body: 'CryptoWizard just bought your ETH/USD signal for $3.59', time: '2d ago', read: true },
  { id: 8, type: 'review', title: 'New 4-Star Review', body: 'LondonFX left you a 4★ review: "Good analysis, entry was spot on."', time: '2d ago', read: true },
  { id: 9, type: 'system', title: 'You hit 50 buyers!', body: 'Congrats! You just crossed 50 total signal buyers. Keep it up 🎉', time: '3d ago', read: true },
  { id: 10, type: 'payout', title: 'Payout Processed', body: 'Your withdrawal of $85.50 has been sent to Access Bank ****2341', time: '5d ago', read: true },
];

const TYPE_CONFIG: Record<NotifType, { icon: string; color: string; bg: string }> = {
  sale: { icon: '💰', color: 'text-green-400', bg: 'bg-green-500/10' },
  review: { icon: '⭐', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  system: { icon: '📢', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  payout: { icon: '🏦', color: 'text-orange-400', bg: 'bg-orange-500/10' },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(INITIAL);
  const [filter, setFilter] = useState<'all' | NotifType>('all');

  const unreadCount = notifs.filter(n => !n.read).length;
  const filtered = filter === 'all' ? notifs : notifs.filter(n => n.type === filter);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: number) => setNotifs(prev => prev.filter(n => n.id !== id));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="text-xs bg-red-500 text-white font-mono font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-zinc-600 text-xs font-mono mt-0.5">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-orange-400 hover:text-orange-300 font-mono transition-colors">
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {([
          { key: 'all', label: 'All' },
          { key: 'sale', label: '💰 Sales' },
          { key: 'review', label: '⭐ Reviews' },
          { key: 'payout', label: '🏦 Payouts' },
          { key: 'system', label: '📢 System' },
        ] as const).map(tab => (
          <button key={tab.key} onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filter === tab.key ? 'bg-orange-500/15 border border-orange-500/20 text-orange-400' : 'text-zinc-600 hover:text-zinc-400'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-2">
        {filtered.map((notif, i) => (
          <motion.div key={notif.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className={`bg-[#111] border rounded-2xl p-4 transition-all group ${
              !notif.read ? 'border-orange-500/20' : 'border-[#1f1f1f]'
            }`}>
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 ${TYPE_CONFIG[notif.type].bg} rounded-xl flex items-center justify-center text-lg flex-shrink-0`}>
                {TYPE_CONFIG[notif.type].icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-display font-semibold">{notif.title}</p>
                    {!notif.read && <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />}
                  </div>
                  <span className="text-[10px] text-zinc-700 font-mono flex-shrink-0">{notif.time}</span>
                </div>
                <p className="text-zinc-500 text-xs font-mono mt-1 leading-relaxed">{notif.body}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              {!notif.read && (
                <button onClick={() => markRead(notif.id)}
                  className="text-[10px] text-orange-400 hover:text-orange-300 font-mono transition-colors">
                  Mark as read
                </button>
              )}
              <button onClick={() => deleteNotif(notif.id)}
                className="text-[10px] text-zinc-700 hover:text-red-400 font-mono transition-colors ml-auto">
                Dismiss
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-[#111] border border-[#1f1f1f] rounded-2xl">
          <p className="text-3xl mb-2">🔔</p>
          <p className="text-zinc-500 text-sm font-mono">No notifications here</p>
        </div>
      )}
    </div>
  );
}