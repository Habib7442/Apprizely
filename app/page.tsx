"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sliders, Play } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import { FeatureSection } from "@/components/landing/feature-section";
import { IncrementCalculator } from "@/components/landing/increment-calculator";
import { PricingSection } from "@/components/landing/pricing-section";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  const scrollToId = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Wrapper containing hero_bg.png flowing seamlessly behind Navbar and Hero */}
      <div
        className="relative w-full min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero_bg.png')" }}
      >
        {/* Subtle Light Tint Overlay */}
        <div className="absolute inset-0 bg-white/10 pointer-events-none" />

        {/* Glassmorphic Navbar */}
        <Navbar showRoleSelector={false} />

        {/* Hero Content (Centered) */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto relative z-10">
          {/* Hero Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md px-3.5 py-1 text-xs font-medium text-slate-800 mb-8 shadow-xs"
          >
            <Sliders className="h-3.5 w-3.5 text-violet-600" />
            <span>Continuous evaluation → fair increments</span>
          </motion.div>

          {/* Centered Headline with Serif Italic Accents (Sociora Style - 2 Lines) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-5xl lg:text-[56px] tracking-tight text-slate-950 max-w-4xl leading-[1.18]"
          >
            Track your team&apos;s{" "}
            <span className="font-serif italic font-normal text-slate-900">real work.</span>
            <br className="hidden sm:block" />
            Turn it into fair{" "}
            <span className="relative inline-block">
              <span className="font-serif italic font-normal text-slate-900">
                salary increments.
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3.5 text-violet-600 overflow-visible pointer-events-none"
                viewBox="0 0 260 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C65 3 175 2 258 9"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Single Proof Subline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl font-sans leading-relaxed"
          >
            Continuous scoring for any salaried role. Built for modern organizations.
          </motion.p>

          {/* Dual Action CTA Buttons (Full width on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none"
          >
            <a
              href="#pricing"
              onClick={(e) => scrollToId(e, "pricing")}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#111827] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] cursor-pointer"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#features"
              onClick={(e) => scrollToId(e, "features")}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white/90 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-white shadow-xs cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-slate-800 text-slate-800" />
              <span>Watch Demo</span>
            </a>
          </motion.div>
        </main>
      </div>

      {/* 1. Features Grid (White Background) */}
      <FeatureSection />

      {/* 2. Interactive Real-Time Increment Calculator */}
      <IncrementCalculator />

      {/* 3. Pricing Cards Section (Light Theme) */}
      <PricingSection />

      {/* 3. Luxury Dark Footer */}
      <Footer />
    </div>
  );
}
