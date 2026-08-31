"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ShieldCheck, X, Construction } from "lucide-react";

export function Footer() {
  const [comingSoonModalOpen, setComingSoonModalOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState("");

  const handleLinkClick = (e: React.MouseEvent, featureName: string, href?: string) => {
    // If it's a section anchor like #features or #pricing, allow normal smooth scroll
    if (href?.startsWith("#")) {
      return;
    }
    // If it's sign-in or dashboard, allow navigation
    if (href === "/sign-in" || href === "/dashboard" || href === "/sign-up") {
      return;
    }

    // Otherwise show "In Development / Coming Soon" modal
    e.preventDefault();
    setComingSoonFeature(featureName);
    setComingSoonModalOpen(true);
  };

  return (
    <>
      <footer className="w-full bg-[#070B14] text-slate-300 border-t border-slate-800/80 relative overflow-hidden pt-16 pb-12 font-sans">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-violet-600/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
            {/* Brand Info Column (Spans 2 columns) */}
            <div className="lg:col-span-2 space-y-4">
              <BrandLogo showTagline={true} theme="dark" size="md" href="/" />
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mt-4 font-sans">
                Apprizely helps organizations track real work throughout the year and turn it into fair, transparent monthly salary raises.
              </p>
            </div>

            {/* Column 1: Product */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">Product</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">Features</a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "Role Presets")}
                    className="hover:text-white transition-colors"
                  >
                    Role Presets
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "Salary Raise Calculator")}
                    className="hover:text-white transition-colors"
                  >
                    Salary Calculator
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </li>
              </ul>
            </div>

            {/* Column 2: Roles */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">Roles</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "Teachers & School Staff")}
                    className="hover:text-white transition-colors"
                  >
                    Teachers & Schools
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "Bank & Financial Officers")}
                    className="hover:text-white transition-colors"
                  >
                    Bank Staff
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "Retail & Store Teams")}
                    className="hover:text-white transition-colors"
                  >
                    Retail Stores
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "Office & Tech Staff")}
                    className="hover:text-white transition-colors"
                  >
                    Office Teams
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Trust & Security */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">Trust & Security</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "Data Protection & Security")}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Data Security</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "Privacy Policy")}
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "Terms of Service")}
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, "HR Compliance")}
                    className="hover:text-white transition-colors"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
            <div>© {new Date().getFullYear()} Apprizely Inc. All rights reserved.</div>
            <div>Built for modern organizations with Next.js, Clerk & Supabase.</div>
          </div>
        </div>
      </footer>

      {/* "In Development / Coming Soon" Modal */}
      {comingSoonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#121A2E] border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
            <button
              type="button"
              onClick={() => setComingSoonModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Construction className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">In Development</h3>
                <p className="text-xs text-amber-400/90 font-mono">Coming Soon</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              The <span className="font-semibold text-white">&quot;{comingSoonFeature}&quot;</span> module is currently being finalized. It will be available in the upcoming Apprizely release.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setComingSoonModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
