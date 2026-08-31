"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "94.8%", label: "Objective Rating Accuracy Rate", sub: "Grounded in verified work entries" },
  { value: "250+", label: "Organizations Active", sub: "Schools, Banks, Retail & Tech" },
  { value: "4.9★", label: "HR & Staff Satisfaction", sub: "Dispute-free appraisal cycles" },
  { value: "₹4.8Cr+", label: "Salary Increments Calculated", sub: "Transparent monthly rupee rewards" },
];

export function StatsCounter() {
  return (
    <section className="w-full py-16 bg-[#F1F5F9] border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-slate-950 tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-semibold text-slate-800">
                {stat.label}
              </div>
              <div className="mt-1 text-[11px] text-slate-500 font-mono">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
