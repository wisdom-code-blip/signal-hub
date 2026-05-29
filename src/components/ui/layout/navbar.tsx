"use client";

import Link from "next/link";
import { useState } from "react";
import { Activity, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/provider-signup", label: "Sell Signals" },
  { href: "/get-verified", label: "Get Verified" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-40 border-b border-border1 bg-background/85 backdrop-blur  w-full">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-lg shadow-orange-500/25">
            <Activity size={20} />
          </span>
          <span className="font-display text-xl font-bold">SignalHub</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/signin">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button>Join now</Button>
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border1 md:hidden"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border1 bg-background/95 backdrop-blur md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-border1" />
              <div className="flex flex-col gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-2 text-center text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-orange-500 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Join now
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
