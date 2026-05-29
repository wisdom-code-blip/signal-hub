"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/layout/navbar";

// ─── MIGRATION NOTE ───────────────────────────────────────────────
// Replace this mock with your real useAuth once AuthContext is set up:
// import { useAuth } from '@/context/AuthContext'
const useAuth = () => ({ user: null as null | { role: string } });
// ──────────────────────────────────────────────────────────────────

// ─── Animation variants ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// ─── Mini Dashboard Mockup (hero section preview) ─────────────────
function DashboardMockup() {
  return (
    <div className="relative mt-14 mx-auto max-w-4xl animate-float">
      {/* Glow behind mockup */}
      <div className="absolute inset-x-0 -bottom-10 h-40 bg-orange-500/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative rounded-2xl overflow-hidden border border-[#2a2a2a] shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d0d0d] border-b border-[#1a1a1a]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 mx-4 bg-[#1a1a1a] rounded-md px-3 py-1 text-[11px] text-zinc-600 font-mono text-center">
            app.signalhub.io/dashboard
          </div>
        </div>

        {/* Dashboard body */}
        <div className="flex bg-[#0e0e0e]">
          {/* Sidebar */}
          <div className="w-14 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col items-center pt-4 pb-6 gap-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-bold font-display">
              S
            </div>
            <div className="mt-2 flex flex-col gap-3">
              {["▦", "⊞", "↑↓", "◎", "$"].map((icon, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs
                  ${i === 0 ? "bg-orange-500/20 text-orange-400" : "bg-[#1a1a1a] text-zinc-600"}`}
                >
                  {icon}
                </div>
              ))}
            </div>
            <div className="mt-auto w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-[10px] text-white flex items-center justify-center font-bold">
              JD
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 overflow-hidden">
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] text-zinc-500 font-mono">OVERVIEW</p>
                <p className="text-white text-sm font-display font-semibold">
                  Hello, Trader 👋
                </p>
              </div>
              <div className="flex gap-2">
                {["This Month", "Forex", "Crypto"].map((t, i) => (
                  <span
                    key={i}
                    className={`text-[10px] px-2 py-1 rounded-md font-mono
                    ${i === 0 ? "bg-orange-500 text-white" : "bg-[#1a1a1a] text-zinc-500"}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Metric cards row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                {
                  label: "Active Signals",
                  value: "342",
                  change: "+12.5%",
                  up: true,
                },
                {
                  label: "Avg Win Rate",
                  value: "87.4%",
                  change: "+3.2%",
                  up: true,
                },
                {
                  label: "My Balance",
                  value: "$1,240",
                  change: "-2.1%",
                  up: false,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-3"
                >
                  <p className="text-[10px] text-zinc-500 mb-1 font-mono">
                    {card.label}
                  </p>
                  <p className="text-white font-display font-bold text-base">
                    {card.value}
                  </p>
                  <p
                    className={`text-[10px] font-mono mt-0.5 ${card.up ? "text-green-400" : "text-red-400"}`}
                  >
                    {card.change} vs last month
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom row: chart + feed */}
            <div className="grid grid-cols-5 gap-3">
              {/* Mini chart */}
              <div className="col-span-3 bg-[#141414] border border-[#1f1f1f] rounded-xl p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-zinc-400 font-mono">
                    SIGNAL PERFORMANCE
                  </span>
                  <span className="text-[10px] text-orange-400 font-mono">
                    +18.3% ↑
                  </span>
                </div>
                <div className="flex items-end gap-1 h-16">
                  {[40, 55, 35, 70, 45, 85, 60, 90, 65, 88, 72, 95].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background:
                            i >= 9
                              ? "#f97316"
                              : i >= 6
                                ? "rgba(249,115,22,0.4)"
                                : "#1f1f1f",
                        }}
                      />
                    ),
                  )}
                </div>
                <div className="flex justify-between mt-1">
                  {["Jan", "Mar", "May", "Jul"].map((m) => (
                    <span
                      key={m}
                      className="text-[9px] text-zinc-700 font-mono"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent signals feed */}
              <div className="col-span-2 bg-[#141414] border border-[#1f1f1f] rounded-xl p-3">
                <span className="text-[10px] text-zinc-400 font-mono block mb-2">
                  LIVE SIGNALS
                </span>
                <div className="flex flex-col gap-2">
                  {[
                    { pair: "BTC/USD", dir: "LONG", color: "text-green-400" },
                    { pair: "EUR/USD", dir: "SHORT", color: "text-red-400" },
                    { pair: "SOL/USD", dir: "LONG", color: "text-green-400" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[10px] text-white font-mono">
                        {s.pair}
                      </span>
                      <span
                        className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-[#1f1f1f] ${s.color}`}
                      >
                        {s.dir}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function LandingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("forex");
  const [animatedNumbers, setAnimatedNumbers] = useState({
    signals: 0,
    winRate: 0,
    providers: 0,
    price: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveFeed, setLiveFeed] = useState<
    {
      id: number;
      user: string;
      action: "bought" | "published";
      signal: string;
      amount?: string;
      price?: string;
      time: string;
    }[]
  >([
    {
      id: 1,
      user: "Trader_Jason",
      action: "bought",
      signal: "BTC/USD",
      amount: "4.99",
      time: "Just now",
    },
    {
      id: 2,
      user: "CryptoGirl",
      action: "bought",
      signal: "ETH/USD",
      amount: "3.99",
      time: "12s ago",
    },
    {
      id: 3,
      user: "ForexKing",
      action: "published",
      signal: "EUR/USD",
      price: "2.99",
      time: "45s ago",
    },
    {
      id: 4,
      user: "StockMaster",
      action: "bought",
      signal: "NVDA",
      amount: "4.99",
      time: "1m ago",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveFeed((prev) => {
        const action =
          Math.random() > 0.5 ? ("bought" as const) : ("published" as const);
        const item = {
          id: Date.now(),
          user: ["TraderMike", "CryptoWizard", "ForexPro", "StockHunter"][
            Math.floor(Math.random() * 4)
          ],
          action,
          signal: ["BTC/USD", "ETH/USD", "EUR/USD", "AAPL", "SOL/USD"][
            Math.floor(Math.random() * 5)
          ],
          amount: (Math.random() * 5 + 1).toFixed(2),
          price: (Math.random() * 5 + 1).toFixed(2),
          time: "Just now",
        };
        return [item, ...prev.slice(0, 9)];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    const el = document.getElementById("stats-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const targets = { signals: 500, winRate: 89, providers: 50, price: 299 };
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      setAnimatedNumbers({
        signals: Math.floor(targets.signals * p),
        winRate: Math.floor(targets.winRate * p),
        providers: Math.floor(targets.providers * p),
        price: Math.floor(targets.price * p),
      });
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible]);

  const getDashboardLink = () => {
    if (!user) return "/signin";
    if (user.role === "admin") return "/admin";
    if (user.role === "provider") return "/provider";
    return "/dashboard";
  };
  const getDashboardText = () => {
    if (!user) return "Sign In";
    if (user.role === "admin") return "Admin Panel";
    if (user.role === "provider") return "Provider Dashboard";
    return "Dashboard";
  };

  const topSignals = useMemo(
    () => ({
      forex: [
        {
          pair: "EUR/USD",
          price: "1.0892",
          change: "+0.42%",
          provider: "ForexMaster",
          winRate: "78%",
          signalPrice: "$2.99",
          buyers: 23,
        },
        {
          pair: "GBP/JPY",
          price: "191.45",
          change: "+1.23%",
          provider: "LondonTrader",
          winRate: "82%",
          signalPrice: "$3.49",
          buyers: 18,
        },
        {
          pair: "AUD/USD",
          price: "0.6584",
          change: "-0.18%",
          provider: "AussieShark",
          winRate: "71%",
          signalPrice: "$2.49",
          buyers: 31,
        },
        {
          pair: "USD/CAD",
          price: "1.3742",
          change: "+0.31%",
          provider: "OilTrader",
          winRate: "76%",
          signalPrice: "$2.99",
          buyers: 27,
        },
        {
          pair: "NZD/USD",
          price: "0.5942",
          change: "+0.15%",
          provider: "KiwiPro",
          winRate: "74%",
          signalPrice: "$2.79",
          buyers: 15,
        },
      ],
      crypto: [
        {
          pair: "BTC/USD",
          price: "$68,420",
          change: "+2.7%",
          provider: "CryptoKing",
          winRate: "84%",
          signalPrice: "$4.99",
          buyers: 67,
        },
        {
          pair: "ETH/USD",
          price: "$3,845",
          change: "+5.57%",
          provider: "EtherWhale",
          winRate: "79%",
          signalPrice: "$3.99",
          buyers: 54,
        },
        {
          pair: "SOL/USD",
          price: "$162.18",
          change: "+14.44%",
          provider: "SolanaBull",
          winRate: "88%",
          signalPrice: "$3.49",
          buyers: 42,
        },
        {
          pair: "DOGE/USD",
          price: "$0.158",
          change: "-1.32%",
          provider: "MemeMaster",
          winRate: "65%",
          signalPrice: "$1.99",
          buyers: 89,
        },
        {
          pair: "BNB/USD",
          price: "$582.50",
          change: "+3.21%",
          provider: "BinancePro",
          winRate: "81%",
          signalPrice: "$3.99",
          buyers: 34,
        },
      ],
      stocks: [
        {
          pair: "AAPL",
          price: "$187.32",
          change: "+1.25%",
          provider: "TechTrader",
          winRate: "76%",
          signalPrice: "$3.49",
          buyers: 45,
        },
        {
          pair: "NVDA",
          price: "$892.64",
          change: "+3.42%",
          provider: "AIInvestor",
          winRate: "91%",
          signalPrice: "$4.99",
          buyers: 78,
        },
        {
          pair: "TSLA",
          price: "$175.48",
          change: "-0.85%",
          provider: "MuskWatcher",
          winRate: "69%",
          signalPrice: "$3.99",
          buyers: 23,
        },
        {
          pair: "MSFT",
          price: "$420.15",
          change: "+0.92%",
          provider: "CloudExpert",
          winRate: "82%",
          signalPrice: "$3.49",
          buyers: 56,
        },
        {
          pair: "AMZN",
          price: "$178.22",
          change: "+1.08%",
          provider: "EcomPro",
          winRate: "77%",
          signalPrice: "$3.29",
          buyers: 41,
        },
      ],
    }),
    [],
  );

  const topProviders = useMemo(
    () => [
      {
        name: "CryptoKing",
        market: "Crypto",
        winRate: "84%",
        rating: 4.9,
        totalSignals: 342,
        earnings: "$12,847",
        verified: true,
      },
      {
        name: "AIInvestor",
        market: "Stocks",
        winRate: "91%",
        rating: 4.95,
        totalSignals: 156,
        earnings: "$8,234",
        verified: true,
      },
      {
        name: "LondonTrader",
        market: "Forex",
        winRate: "82%",
        rating: 4.8,
        totalSignals: 423,
        earnings: "$15,632",
        verified: true,
      },
      {
        name: "SolanaBull",
        market: "Crypto",
        winRate: "88%",
        rating: 4.85,
        totalSignals: 98,
        earnings: "$4,567",
        verified: false,
      },
      {
        name: "ForexMaster",
        market: "Forex",
        winRate: "78%",
        rating: 4.7,
        totalSignals: 567,
        earnings: "$18,923",
        verified: true,
      },
    ],
    [],
  );

  const testimonials = useMemo(
    () => [
      {
        name: "Marcus T.",
        role: "Part-time Trader",
        text: "Went from losing money to consistent profits. Best $3 I spend every day.",
        rating: 5,
        avatar: "MT",
      },
      {
        name: "Sarah K.",
        role: "Full-time Mom",
        text: "I don't have time to analyze charts. Signal Hub does it for me. Life changer!",
        rating: 5,
        avatar: "SK",
      },
      {
        name: "David L.",
        role: "Student",
        text: "Cheaper than any mentorship and actually works. My portfolio is up 34% this month.",
        rating: 5,
        avatar: "DL",
      },
    ],
    [],
  );

  const rankEmoji = (i: number) =>
    i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "📊";

  return (
    <div className="min-h-screen bg-[#080808] overflow-x-hidden">
      {/* ── Global background glow (Image 1 atmospheric effect) ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-orange-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Navbar ────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero Section ──────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 text-center">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs text-orange-300 font-mono tracking-wide">
            🔥 LIVE SIGNALS AVAILABLE NOW
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-7xl text-white leading-[1.08] tracking-tight mb-6"
        >
          Buy verified forex &<br />
          crypto signals{" "}
          <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            from top traders
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Join 10,000+ traders who get profitable signals daily. No expensive
          mentorships. Pay per signal, keep 80% of your profits.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {!user ? (
            <>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
              >
                Start Trading Now →
              </Link>
              <Link
                href="/signin"
                className="inline-flex items-center justify-center gap-2 border border-[#2a2a2a] hover:border-orange-500/50 text-zinc-400 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:bg-white/5"
              >
                Sign In
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
              >
                Browse Signals →
              </Link>
              <Link
                href="/provider-signup"
                className="inline-flex items-center justify-center gap-2 border border-[#2a2a2a] hover:border-orange-500/50 text-zinc-400 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:bg-white/5"
              >
                Start Selling Signals
              </Link>
            </>
          )}
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <DashboardMockup />
        </motion.div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────── */}
      <section
        id="stats-section"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              value: `${animatedNumbers.signals}+`,
              label: "Active Signals",
              suffix: "",
            },
            {
              value: `${animatedNumbers.winRate}%`,
              label: "Avg Win Rate",
              suffix: "",
            },
            {
              value: `${animatedNumbers.providers}+`,
              label: "Expert Providers",
              suffix: "",
            },
            {
              value: `$${(animatedNumbers.price / 100).toFixed(2)}`,
              label: "Starting Price",
              suffix: "",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 text-center hover:border-orange-500/30 transition-colors group"
            >
              <div className="font-display font-bold text-3xl text-orange-500 group-hover:text-orange-400 transition-colors font-mono">
                {stat.value}
              </div>
              <div className="text-zinc-500 text-sm mt-1 font-mono tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live Feed ─────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#111]/80 border border-[#1f1f1f] rounded-xl px-4 py-3 overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[11px] text-zinc-500 font-mono tracking-widest">
              📡 LIVE ACTIVITY FEED
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar flex-wrap">
            {liveFeed.map((item) => (
              <div
                key={item.id}
                className="text-[11px] bg-[#0d0d0d] border border-[#1f1f1f] rounded-full px-3 py-1 whitespace-nowrap font-mono"
              >
                <span className="text-orange-400">{item.user}</span>
                <span className="text-zinc-600 mx-1">
                  {item.action === "bought" ? "bought" : "published"}
                </span>
                <span className="text-white">{item.signal}</span>
                {item.action === "bought" ? (
                  <span className="text-green-400 ml-1">${item.amount}</span>
                ) : (
                  <span className="text-blue-400 ml-1">${item.price}</span>
                )}
                <span className="text-zinc-700 ml-1">· {item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <span className="text-xs text-orange-500 font-mono tracking-widest uppercase">
            Simple Process
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2">
            How SignalHub Works
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: "🛒",
              step: "01",
              title: "Buy Signals",
              desc: "Choose from 500+ signals. Pay as low as $2.99. Full analysis revealed instantly.",
            },
            {
              icon: "📡",
              step: "02",
              title: "Sell Signals",
              desc: "Become a provider, share your analysis, and earn 80% of every sale you make.",
            },
            {
              icon: "💸",
              step: "03",
              title: "Get Paid",
              desc: "Withdraw earnings weekly via bank transfer, crypto, or PayPal. Zero hidden fees.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 hover:border-orange-500/30 transition-all group overflow-hidden"
            >
              <div className="absolute top-4 right-4 font-display font-bold text-4xl text-[#1a1a1a] group-hover:text-[#222] transition-colors">
                {item.step}
              </div>
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Top Signals Table ─────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center mb-10">
          <span className="text-xs text-orange-500 font-mono tracking-widest uppercase">
            Live Data
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2 mb-2">
            Top Performing Signals
          </h2>
          <p className="text-zinc-500 text-sm">
            Real-time signals from our highest-rated providers
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          {[
            { key: "forex", label: "💱 Forex" },
            { key: "crypto", label: "₿ Crypto" },
            { key: "stocks", label: "📈 Stocks" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold font-mono transition-all ${
                activeTab === tab.key
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "bg-[#111] border border-[#1f1f1f] text-zinc-500 hover:text-white hover:border-[#2a2a2a]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {[
                    "Pair",
                    "Price",
                    "Provider",
                    "Win Rate",
                    "Signal Price",
                    "Activity",
                    "",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className="text-left px-5 py-4 text-zinc-600 text-xs font-mono tracking-widest uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(topSignals as Record<string, typeof topSignals.forex>)[
                  activeTab
                ].map((signal, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#161616] hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <span className="text-white font-display font-semibold">
                        {signal.pair}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white font-mono text-sm">
                        {signal.price}
                      </span>
                      <span
                        className={`ml-2 text-xs font-mono ${signal.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                      >
                        {signal.change}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-zinc-300 text-sm">
                        {signal.provider}
                      </span>
                      <div className="text-xs text-yellow-500 font-mono">
                        ★ {signal.winRate} win
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#1f1f1f] rounded-full h-1.5">
                          <div
                            className="bg-green-500 rounded-full h-1.5 transition-all"
                            style={{ width: signal.winRate }}
                          />
                        </div>
                        <span className="text-green-400 text-xs font-mono">
                          {signal.winRate}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-orange-400 font-display font-bold">
                        {signal.signalPrice}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-zinc-600 font-mono">
                        📊 {signal.buyers} bought today
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={user ? "/marketplace" : "/signup"}
                        className="text-xs bg-orange-500/10 hover:bg-orange-500 border border-orange-500/20 hover:border-orange-500 text-orange-400 hover:text-white px-4 py-1.5 rounded-lg transition-all font-mono"
                      >
                        Buy
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-zinc-700 text-xs font-mono mt-4">
          † 500+ more signals available. Prices vary by provider.
        </p>
      </motion.section>

      {/* ── Top Providers ─────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div variants={fadeUp} className="text-center mb-10">
          <span className="text-xs text-orange-500 font-mono tracking-widest uppercase">
            Verified Traders
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2 mb-2">
            Top Providers
          </h2>
          <p className="text-zinc-500 text-sm">
            Real performance. Full transparency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topProviders.map((provider, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-5 hover:border-orange-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{rankEmoji(idx)}</span>
                    <h3 className="font-display font-bold text-white">
                      {provider.name}
                    </h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-zinc-500 font-mono mt-1 inline-block">
                    {provider.market}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-yellow-500 text-sm font-mono">
                    ★ {provider.rating}
                  </div>
                  <div className="text-green-400 text-xs font-mono">
                    {provider.winRate} win
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1a1a1a]">
                <div>
                  <p className="text-zinc-600 text-xs font-mono mb-0.5">
                    TOTAL SIGNALS
                  </p>
                  <p className="text-white font-display font-semibold">
                    {provider.totalSignals}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-600 text-xs font-mono mb-0.5">
                    EARNINGS
                  </p>
                  <p className="text-green-400 font-display font-semibold">
                    {provider.earnings}
                  </p>
                </div>
              </div>

              {provider.verified && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-400 font-mono">
                  <span>✓</span> Verified Trader
                </div>
              )}

              <Link
                href="/marketplace"
                className="mt-4 block text-center bg-[#1a1a1a] hover:bg-orange-500/10 border border-[#2a2a2a] hover:border-orange-500/30 text-zinc-400 hover:text-orange-400 py-2 rounded-xl text-sm transition-all font-mono"
              >
                View Signals →
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="relative z-10 py-16 border-y border-[#1a1a1a]"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(249,115,22,0.03), transparent)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="text-xs text-orange-500 font-mono tracking-widest uppercase">
              Social Proof
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2 mb-2">
              Trusted by 10,000+ Traders
            </h2>
            <p className="text-zinc-500 text-sm">
              Real results from real people
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 hover:border-orange-500/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-display font-bold text-sm shadow-lg shadow-orange-500/20">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-display font-semibold text-sm">
                      {t.name}
                    </p>
                    <p className="text-zinc-600 text-xs font-mono">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {"★★★★★".split("").map((s, j) => (
                    <span key={j} className="text-yellow-500 text-sm">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Final CTA ─────────────────────────────────────────── 
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="relative bg-[#111] border border-orange-500/20 rounded-3xl p-10 overflow-hidden">
          {/* Inner glow 
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
          <div className="relative">
            <span className="text-xs text-orange-500 font-mono tracking-widest uppercase">Ready to start?</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3 mb-3">
              🚀 Want to build a platform like Signal Hub?
            </h2>
            <p className="text-zinc-400 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
              I help businesses create custom signal marketplaces, trading communities, and fintech dashboards. Starting at $50–$200.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-6 py-3 rounded-xl transition-all text-sm font-semibold">
              Get a Quote →
            </Link>
            <div className="mt-8 pt-6 border-t border-[#1f1f1f]">
              <p className="text-zinc-600 text-xs font-mono mb-2">Join the waitlist for early access to premium features</p>
              <Link href="/waitlist" className="text-orange-400 hover:text-orange-300 text-sm font-mono underline underline-offset-2">
                Notify me →
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-[#1a1a1a] py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center font-display font-bold text-white text-xs">
              S
            </div>
            <span className="font-display font-bold text-base">
              <span className="text-white">Signal</span>
              <span className="text-orange-500">Hub</span>
            </span>
          </Link>
          <p className="text-zinc-700 text-xs font-mono">
            © 2025 Signal Hub. All rights reserved.
          </p>
          <p className="text-zinc-800 text-xs font-mono mt-1">
            Not financial advice. Trade responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
}
