"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free Plan",
    desc: "Ideal for small teams testing continuous evaluation.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    priceSuffix: "Free forever",
    capacity: "Up to 10 active employees",
    features: [
      "Up to 10 active employees",
      "1 role template included",
      "Core evaluation & score loop",
      "1 active review cycle",
      "Staff & HR dashboards",
      "Standard email alerts",
    ],
    ctaText: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth Plan",
    desc: "Ideal for growing teams seeking fair, transparent raises.",
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    priceSuffix: "/ month (up to 50 staff)",
    capacity: "Up to 50 active employees",
    features: [
      "Up to 50 active employees",
      "Custom role weights & targets",
      "Multiple review cycles (Quarterly/Monthly)",
      "Real rupee raises (+₹2,700/mo)",
      "HR reason & adjustment log",
      "PDF increment letter export",
      "Priority email & chat support",
    ],
    ctaText: "Get Started Now",
    popular: true,
  },
  {
    name: "Business Plan",
    desc: "For larger organizations, schools, banks & multi-team staff.",
    monthlyPrice: 5999,
    yearlyPrice: 4799,
    priceSuffix: "/ month (up to 150 staff)",
    capacity: "Up to 150 active employees",
    features: [
      "Up to 150 active employees",
      "Everything in Growth plan",
      "Advanced role-based access",
      "Realtime activity & score feed",
      "Full compliance audit export",
      "Dedicated HR onboarding",
      "24/7 VIP SLA support",
    ],
    ctaText: "Select Business Plan",
    popular: false,
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="w-full py-24 bg-[#F8FAFC] text-slate-900 border-t border-b border-slate-200/80 relative overflow-hidden">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-violet-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-white text-slate-800 text-xs font-semibold px-3.5 py-1 rounded-md shadow-xs border border-slate-200/80 mb-4"
          >
            Pricing
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-tight"
          >
            Affordable plans with no hidden fees
          </motion.h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg font-sans">
            Flat team pricing. Billed only on active employees evaluated in a cycle.
          </p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={cn("text-xs font-semibold transition-colors", !isYearly ? "text-slate-950" : "text-slate-500")}>
              Monthly
            </span>

            <button
              type="button"
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-slate-300 bg-slate-200 transition-colors duration-200 ease-in-out focus:outline-none"
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-violet-600 shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5",
                  isYearly ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>

            <span className={cn("text-xs font-semibold flex items-center gap-1.5 transition-colors", isYearly ? "text-slate-950" : "text-slate-500")}>
              <span>Yearly (Save 20%)</span>
            </span>
          </div>
        </div>

        {/* 3 Light Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => {
            const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={cn(
                  "rounded-2xl p-8 flex flex-col justify-between text-left transition-all duration-200 relative bg-white",
                  plan.popular
                    ? "border-2 border-violet-600 shadow-xl ring-1 ring-violet-600/20"
                    : "border border-slate-200/90 hover:border-slate-300 shadow-xs"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-1">
                    <span>🔥 Popular</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-950 tracking-tight">{plan.name}</h3>
                  <p className="mt-2 text-xs text-slate-600 min-h-[36px] leading-relaxed">{plan.desc}</p>

                  {/* Price display */}
                  <div className="mt-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold text-slate-950 tabular-nums tracking-tight">
                        {currentPrice === 0 ? "₹0" : `₹${currentPrice.toLocaleString("en-IN")}`}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {plan.priceSuffix}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-violet-600 font-medium">
                      {plan.capacity}
                    </div>
                  </div>

                  {/* What's included list */}
                  <div className="mt-8 space-y-3 border-t border-slate-100 pt-6">
                    <div className="text-xs font-semibold text-slate-800 mb-4">What&apos;s included:</div>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href="#pricing"
                    className={cn(
                      "flex w-full items-center justify-center rounded-xl py-3.5 text-xs font-bold transition-all duration-200",
                      plan.popular
                        ? "bg-violet-600 hover:bg-violet-700 text-white shadow-md"
                        : "bg-slate-950 hover:bg-slate-800 text-white shadow-xs"
                    )}
                  >
                    {plan.ctaText}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Guarantee Note */}
        <div className="mt-12 text-center text-xs text-slate-500 font-mono">
          * Billed only on active employees evaluated in a cycle. Prices exclude 18% GST.
        </div>
      </div>
    </section>
  );
}
