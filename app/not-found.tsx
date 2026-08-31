"use client";

import React from "react";
import Link from "next/link";
import { Construction, ArrowLeft, Home } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white selection:bg-amber-400 selection:text-slate-950 font-sans">
      <Navbar showRoleSelector={false} />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none -z-0" />

        <div className="relative z-10 max-w-md mx-auto bg-[#131B2E]/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 shadow-xs">
            <Construction className="h-7 w-7" />
          </div>

          <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Under Development
          </span>

          <h1 className="font-display text-2xl font-bold text-white tracking-tight mb-2">
            Page Coming Soon
          </h1>

          <p className="text-xs text-slate-400 leading-relaxed font-sans mb-8">
            This module is currently being finalized for the Apprizely platform. Check back soon or return to the main landing page.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-lg hover:from-amber-400 hover:to-orange-400 transition-all hover:scale-[1.02]"
          >
            <Home className="h-4 w-4" />
            <span>Return to Apprizely Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
