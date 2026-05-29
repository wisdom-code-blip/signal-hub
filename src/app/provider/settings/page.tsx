'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Tab = 'account' | 'notifications' | 'security' | 'billing';

interface Toggle {
  label: string;
  desc: string;
  key: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('account');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Account fields
  const [account, setAccount] = useState({
    name: 'Wizzy',
    email: 'wizzy@email.com',
    bio: 'Professional crypto trader with 5+ years experience. Specialising in BTC and ETH setups.',
    twitter: '@wizzytrader',
    telegram: '@wizzyfx',
  });

  // Notification toggles
  const [notifToggles, setNotifToggles] = useState({
    newSale: true,
    newReview: true,
    payoutComplete: true,
    systemUpdates: false,
    marketingEmails: false,
    telegramAlerts: true,
  });

  // Security
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [twoFA, setTwoFA] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: 'account', label: 'Account', icon: '👤' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'security', label: 'Security', icon: '🔒' },
    { key: 'billing', label: 'Billing', icon: '💳' },
  ];

  const NOTIF_GROUPS: { title: string; items: Toggle[] }[] = [
    {
      title: 'Activity',
      items: [
        { label: 'New Signal Sale', desc: 'Get notified when someone buys your signal', key: 'newSale' },
        { label: 'New Review', desc: 'Get notified when a buyer leaves a review', key: 'newReview' },
        { label: 'Payout Complete', desc: 'Get notified when your withdrawal is processed', key: 'payoutComplete' },
      ],
    },
    {
      title: 'General',
      items: [
        { label: 'System Updates', desc: 'Platform announcements and feature releases', key: 'systemUpdates' },
        { label: 'Marketing Emails', desc: 'Tips, guides and promotional content', key: 'marketingEmails' },
        { label: 'Telegram Alerts', desc: 'Push notifications via your linked Telegram', key: 'telegramAlerts' },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Settings</h1>
          <p className="text-zinc-600 text-xs font-mono mt-0.5">Manage your account preferences</p>
        </div>
        {saved && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2">
            <span className="text-green-400 text-xs font-mono">✓ Changes saved</span>
          </motion.div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111] border border-[#1f1f1f] rounded-2xl p-1.5">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono transition-all ${
              activeTab === tab.key
                ? 'bg-orange-500/15 border border-orange-500/20 text-orange-400'
                : 'text-zinc-600 hover:text-zinc-400'
            }`}>
            <span>{tab.icon}</span>
            <span className="hidden sm:block">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Account ── */}
      {activeTab === 'account' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="space-y-5">

          {/* Avatar */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest mb-4">PROFILE PHOTO</p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-orange-500/20">
                {account.name[0]}
              </div>
              <div>
                <button className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-orange-500/30 text-zinc-400 hover:text-orange-400 text-xs font-mono rounded-xl transition-all">
                  Upload Photo
                </button>
                <p className="text-zinc-700 text-[10px] font-mono mt-1.5">JPG or PNG · Max 2MB</p>
              </div>
            </div>
          </div>

          {/* Profile info */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 space-y-4">
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest">PROFILE INFO</p>
            {[
              { label: 'DISPLAY NAME', key: 'name', placeholder: 'Your provider name' },
              { label: 'EMAIL', key: 'email', placeholder: 'your@email.com' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-[10px] text-zinc-600 font-mono block mb-1.5">{field.label}</label>
                <input value={account[field.key as keyof typeof account]}
                  onChange={e => setAccount(p => ({ ...p, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all" />
              </div>
            ))}
            <div>
              <label className="text-[10px] text-zinc-600 font-mono block mb-1.5">BIO</label>
              <textarea value={account.bio} onChange={e => setAccount(p => ({ ...p, bio: e.target.value }))}
                rows={3} className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all resize-none" />
            </div>
          </div>

          {/* Social links */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 space-y-4">
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest">SOCIAL LINKS</p>
            {[
              { label: 'TWITTER / X', key: 'twitter', icon: '𝕏', placeholder: '@yourhandle' },
              { label: 'TELEGRAM', key: 'telegram', icon: '✈', placeholder: '@yourtelegram' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-[10px] text-zinc-600 font-mono block mb-1.5">{field.label}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 text-sm font-mono">{field.icon}</span>
                  <input value={account[field.key as keyof typeof account]}
                    onChange={e => setAccount(p => ({ ...p, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm font-mono outline-none transition-all" />
                </div>
              </div>
            ))}
          </div>

          {/* Danger zone */}
          <div className="bg-[#111] border border-red-500/20 rounded-2xl p-6">
            <p className="text-[10px] text-red-500/70 font-mono tracking-widest mb-4">DANGER ZONE</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-display font-semibold">Delete Account</p>
                <p className="text-zinc-600 text-xs font-mono mt-0.5">Permanently delete your account and all data</p>
              </div>
              <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-mono rounded-xl transition-all">
                Delete
              </button>
            </div>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-display font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25">
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </span>
            ) : 'Save Changes'}
          </button>
        </motion.div>
      )}

      {/* ── Notifications ── */}
      {activeTab === 'notifications' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {NOTIF_GROUPS.map((group, gi) => (
            <div key={gi} className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 space-y-4">
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest">{group.title.toUpperCase()}</p>
              {group.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#1a1a1a] last:border-0">
                  <div>
                    <p className="text-white text-sm font-mono">{item.label}</p>
                    <p className="text-zinc-600 text-[11px] font-mono mt-0.5">{item.desc}</p>
                  </div>
                  <button onClick={() => setNotifToggles(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                    className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                      notifToggles[item.key as keyof typeof notifToggles] ? 'bg-orange-500' : 'bg-[#2a2a2a]'
                    }`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                      notifToggles[item.key as keyof typeof notifToggles] ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSave} disabled={saving}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-display font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25">
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </motion.div>
      )}

      {/* ── Security ── */}
      {activeTab === 'security' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

          {/* Change password */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 space-y-4">
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest">CHANGE PASSWORD</p>
            {[
              { label: 'CURRENT PASSWORD', key: 'current', placeholder: '••••••••' },
              { label: 'NEW PASSWORD', key: 'newPass', placeholder: 'Min 8 characters' },
              { label: 'CONFIRM NEW PASSWORD', key: 'confirm', placeholder: 'Repeat new password' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-[10px] text-zinc-600 font-mono block mb-1.5">{field.label}</label>
                <input type="password"
                  value={passwords[field.key as keyof typeof passwords]}
                  onChange={e => setPasswords(p => ({ ...p, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all" />
              </div>
            ))}
            <button onClick={handleSave} disabled={saving || !passwords.current || !passwords.newPass || passwords.newPass !== passwords.confirm}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white font-display font-bold py-3 rounded-xl transition-all">
              {saving ? 'Updating...' : 'Update Password'}
            </button>
          </div>

          {/* 2FA */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white font-display font-semibold">Two-Factor Authentication</p>
                <p className="text-zinc-600 text-xs font-mono mt-0.5">Add an extra layer of security to your account</p>
              </div>
              <button onClick={() => setTwoFA(!twoFA)}
                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${twoFA ? 'bg-orange-500' : 'bg-[#2a2a2a]'}`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${twoFA ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
            {twoFA && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 mt-2">
                <p className="text-zinc-500 text-xs font-mono">Scan the QR code with Google Authenticator or Authy to enable 2FA. (QR code will appear after connecting to Supabase auth)</p>
              </motion.div>
            )}
          </div>

          {/* Active sessions */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest mb-4">ACTIVE SESSIONS</p>
            {[
              { device: 'Windows PC · Chrome', location: 'Lagos, Nigeria', time: 'Current session', current: true },
              { device: 'iPhone 14 · Safari', location: 'Lagos, Nigeria', time: '2 days ago', current: false },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#1a1a1a] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-sm">
                    {session.current ? '💻' : '📱'}
                  </div>
                  <div>
                    <p className="text-zinc-300 text-xs font-mono">{session.device}</p>
                    <p className="text-zinc-600 text-[10px] font-mono">{session.location} · {session.time}</p>
                  </div>
                </div>
                {session.current
                  ? <span className="text-[10px] text-green-400 font-mono bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-lg">Active</span>
                  : <button className="text-[10px] text-red-400 font-mono hover:text-red-300 transition-colors">Revoke</button>
                }
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Billing ── */}
      {activeTab === 'billing' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

          {/* Current plan */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] text-orange-500 font-mono tracking-widest mb-1">CURRENT PLAN</p>
                <h2 className="font-display font-bold text-2xl text-white">Free Provider</h2>
                <p className="text-zinc-500 text-xs font-mono mt-1">10% platform commission · Unlimited signals</p>
              </div>
              <span className="text-xs font-mono bg-orange-500/20 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full">Active</span>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-orange-500/10">
              {[
                { label: 'Commission', value: '10%' },
                { label: 'Signal Limit', value: 'Unlimited' },
                { label: 'Payout', value: 'Weekly' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-white font-display font-bold text-sm">{item.value}</p>
                  <p className="text-zinc-600 text-[10px] font-mono">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coming soon plans */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest mb-4">UPCOMING PLANS</p>
            <div className="space-y-3">
              {[
                { name: 'Pro Provider', price: '$9.99/mo', commission: '5% commission', perks: ['Priority listing', 'Analytics dashboard', 'Custom pricing'] },
                { name: 'Elite Provider', price: '$24.99/mo', commission: '2% commission', perks: ['Featured placement', 'Dedicated support', 'API access'] },
              ].map((plan, i) => (
                <div key={i} className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 opacity-60">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-display font-bold text-white text-sm">{plan.name}</p>
                      <p className="text-zinc-600 text-[10px] font-mono">{plan.commission}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-400 font-display font-bold">{plan.price}</p>
                      <span className="text-[10px] font-mono text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">Coming Soon</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.perks.map((perk, j) => (
                      <span key={j} className="text-[10px] font-mono text-zinc-600 bg-[#1a1a1a] px-2 py-0.5 rounded-md">✓ {perk}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payout settings */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest mb-4">PAYOUT SETTINGS</p>
            <div className="space-y-3">
              {[
                { label: 'Payout Frequency', value: 'Weekly (every Monday)' },
                { label: 'Minimum Payout', value: '$5.00' },
                { label: 'Default Bank', value: 'GTBank ****4521' },
                { label: 'Payout Method', value: 'Paystack Transfer' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#1a1a1a] last:border-0">
                  <span className="text-zinc-600 text-xs font-mono">{item.label}</span>
                  <span className="text-zinc-300 text-xs font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}