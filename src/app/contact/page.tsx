"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const TOPICS = [
  "General Inquiry",
  "Custom Signal Platform",
  "Partnership",
  "Bug Report",
  "Billing",
  "Other",
];

const CONTACT_INFO = [
  {
    icon: "📧",
    label: "Email",
    value: "hello@signalhub.io",
    href: "mailto:hello@signalhub.io",
  },
  { icon: "𝕏", label: "Twitter / X", value: "@SignalHubIO", href: "#" },
  { icon: "✈", label: "Telegram", value: "@SignalHubSupport", href: "#" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/8 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-[#080808]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
              S
            </div>
            <span className="font-display font-bold text-base">
              <span className="text-white">Signal</span>
              <span className="text-orange-500">Hub</span>
            </span>
          </Link>
          <Link
            href="/marketplace"
            className="text-zinc-500 hover:text-white text-sm font-mono transition-colors"
          >
            Marketplace
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs text-orange-500 font-mono tracking-widest">
            GET IN TOUCH
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mt-2 mb-3">
            Contact Us
          </h1>
          <p className="text-zinc-400 max-w-md mx-auto text-sm leading-relaxed">
            Questions, partnerships, or want a custom trading platform built?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
              <h3 className="font-display font-semibold text-white mb-4">
                Contact Info
              </h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex items-center justify-center text-sm flex-shrink-0 group-hover:border-orange-500/30 transition-colors">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-600 font-mono">
                        {c.label}
                      </p>
                      <p className="text-zinc-300 text-sm font-mono group-hover:text-orange-400 transition-colors">
                        {c.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-2xl p-6">
              <h3 className="font-display font-semibold text-white mb-2">
                🚀 Custom Platform?
              </h3>
              <p className="text-zinc-400 text-xs font-mono leading-relaxed mb-4">
                I build custom signal marketplaces, trading communities, and
                fintech dashboards for businesses. Starting at ₦50,000.
              </p>
              <div className="space-y-1.5 text-xs font-mono text-zinc-500">
                {[
                  "Custom signal marketplace",
                  "Trading community platform",
                  "Fintech dashboard",
                  "Mobile app integration",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-orange-500">→</span> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
              <h3 className="font-display font-semibold text-white text-sm mb-3">
                Response Times
              </h3>
              <div className="space-y-2">
                {[
                  { type: "General", time: "24–48 hours" },
                  { type: "Technical", time: "12–24 hours" },
                  { type: "Business", time: "2–4 hours" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-zinc-600 text-xs font-mono">
                      {r.type}
                    </span>
                    <span className="text-zinc-400 text-xs font-mono">
                      {r.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {!sent ? (
              <form
                onSubmit={handleSubmit}
                className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-7 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "YOUR NAME",
                      key: "name",
                      placeholder: "John Doe",
                      type: "text",
                    },
                    {
                      label: "EMAIL",
                      key: "email",
                      placeholder: "you@email.com",
                      type: "email",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => update(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono"
                      />
                    </div>
                  ))}
                </div>

                {/* Topic */}
                <div>
                  <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-2">
                    TOPIC
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update("topic", t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                          form.topic === t
                            ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                            : "bg-[#0d0d0d] border-[#2a2a2a] text-zinc-600 hover:border-[#333] hover:text-zinc-400"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-[10px] text-zinc-500 font-mono tracking-widest block mb-1.5">
                    MESSAGE
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    required
                    className="w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-orange-500/40 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-700 outline-none transition-all font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-display font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/25"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#111] border border-green-500/20 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="text-5xl mb-4">📨</div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  Message sent!
                </h3>
                <p className="text-zinc-500 text-sm font-mono mb-6 max-w-xs">
                  Thanks for reaching out. We'll get back to you within 24–48
                  hours.
                </p>
                <Link
                  href="/"
                  className="text-orange-400 hover:text-orange-300 text-sm font-mono transition-colors"
                >
                  ← Back to homepage
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-12 border-t border-[#1f1f1f] text-center">
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-zinc-600 text-xs font-mono mb-2">
                READY TO START?
              </p>
              <Link
                href="/provider-signup"
                className="text-orange-400 hover:text-orange-300 text-sm font-mono transition-colors"
              >
                Become a Provider →
              </Link>
            </div>
            <div>
              <p className="text-zinc-600 text-xs font-mono mb-2">
                EARLY ACCESS
              </p>
              <Link
                href="/waitlist"
                className="text-orange-400 hover:text-orange-300 text-sm font-mono transition-colors"
              >
                Join Waitlist →
              </Link>
            </div>
            <div>
              <p className="text-zinc-600 text-xs font-mono mb-2">BACK HOME</p>
              <Link
                href="/"
                className="text-orange-400 hover:text-orange-300 text-sm font-mono transition-colors"
              >
                Homepage →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
