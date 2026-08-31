"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Award, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const rolePresets = [
  { role: "School Teacher", defaultSalary: 35000, defaultScore: 88 },
  { role: "Bank Officer", defaultSalary: 55000, defaultScore: 92 },
  { role: "Retail Manager", defaultSalary: 28000, defaultScore: 82 },
  { role: "Software Engineer", defaultSalary: 75000, defaultScore: 95 },
];

export function IncrementCalculator() {
  const [monthlySalary, setMonthlySalary] = useState<number>(35000);
  const [score, setScore] = useState<number>(88);

  // Score to Increment percentage formula per AGENTS.md §8.2
  const getIncrementPercent = (val: number): number => {
    if (val >= 90) return 12;
    if (val >= 80) return 9;
    if (val >= 70) return 6;
    if (val >= 60) return 3;
    return 0;
  };

  const getTierLabel = (val: number): string => {
    if (val >= 90) return "Exceptional Contributor (12%)";
    if (val >= 80) return "High Performer (9%)";
    if (val >= 70) return "Solid Contributor (6%)";
    if (val >= 60) return "Meets Minimum (3%)";
    return "Needs Improvement (0%)";
  };

  const incrementPercent = getIncrementPercent(score);
  const monthlyAmount = Math.round((incrementPercent / 100) * monthlySalary);
  const newMonthlySalary = monthlySalary + monthlyAmount;
  const annualAmount = monthlyAmount * 12;

  return (
    <section id="increments" className="w-full py-24 bg-white border-t border-b border-slate-200/80 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-[#F8FAFC] px-3.5 py-1 text-xs font-semibold text-slate-800 mb-4 shadow-xs"
          >
            <Calculator className="h-3.5 w-3.5 text-violet-600" />
            <span>Interactive Tool</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-tight"
          >
            See How Scores Convert Into Real Raises
          </motion.h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg font-sans">
            Adjust monthly salary and performance score to see exact Rupee increases in real time.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Column: Sliders & Presets (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
            {/* Quick Role Presets */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5 font-mono">
                Sample Role Presets
              </label>
              <div className="flex flex-wrap gap-2">
                {rolePresets.map((preset) => (
                  <button
                    key={preset.role}
                    type="button"
                    onClick={() => {
                      setMonthlySalary(preset.defaultSalary);
                      setScore(preset.defaultScore);
                    }}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-violet-600 hover:text-violet-600 transition-colors shadow-xs"
                  >
                    {preset.role}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Monthly Salary */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-900">
                  Current Monthly Salary
                </label>
                <span className="font-display font-bold text-lg text-slate-950 tabular-nums">
                  ₹{monthlySalary.toLocaleString("en-IN")}
                  <span className="text-xs text-slate-500 font-mono font-normal"> / mo</span>
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={300000}
                step={2000}
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>₹10,000</span>
                <span>₹1,50,000</span>
                <span>₹3,00,000</span>
              </div>
            </div>

            {/* Slider 2: Performance Score */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-900">
                  Annual Score (0 – 100)
                </label>
                <span className="font-display font-bold text-lg text-violet-600 tabular-nums">
                  {score} <span className="text-xs text-slate-500 font-normal">points</span>
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={100}
                step={1}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>40 (Needs Work)</span>
                <span>75 (Solid)</span>
                <span>100 (Exceptional)</span>
              </div>
            </div>

            {/* Score Tier Badge */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-600 font-medium">Performance Band:</span>
              <span className="font-bold text-slate-900">{getTierLabel(score)}</span>
            </div>
          </div>

          {/* Right Column: Live Calculation Output Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#0B0F19] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[360px]">
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-500/20 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                  Calculated Monthly Raise
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[11px] font-mono font-bold text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  +{incrementPercent}% Raise
                </span>
              </div>

              {/* Big Rupee Amount Highlight */}
              <div className="font-display text-4xl sm:text-5xl font-bold text-emerald-400 tabular-nums tracking-tight mb-2">
                +₹{monthlyAmount.toLocaleString("en-IN")}
                <span className="text-sm text-slate-400 font-sans font-normal ml-1">/ month</span>
              </div>

              <p className="text-xs text-slate-400 mb-8 font-sans">
                Added directly to employee&apos;s base salary starting next payroll cycle.
              </p>

              {/* Salary Breakdown List */}
              <div className="space-y-3 border-t border-slate-800 pt-6 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>New Total Salary:</span>
                  <span className="font-bold text-white tabular-nums text-sm">
                    ₹{newMonthlySalary.toLocaleString("en-IN")} / mo
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Annualized Extra Earnings:</span>
                  <span className="font-bold text-emerald-400 tabular-nums">
                    +₹{annualAmount.toLocaleString("en-IN")} / year
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <a
                href="#pricing"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold py-3.5 text-xs shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Automate This For Your Team</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
