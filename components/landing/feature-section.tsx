"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const bentoFeatures = [
  {
    tag: "Define Good Work",
    title: 'Set what "good work" means',
    desc: "Pick the things that count for each role — targets, attendance, ratings — and how much each matters. Works for any job: teacher, cashier, banker, nurse.",
    linkText: "Set Up Roles",
    href: "#pricing",
    bgClass: "bg-[#FFF9F0] border-amber-200/80",
    shapeClass: "bg-amber-400/20",
    linkBorder: "border-amber-900/40 text-amber-950",
  },
  {
    tag: "Continuous Log",
    title: "Log work as it happens",
    desc: "Staff and managers record work through the year, so raises reflect the whole year — not just the last few weeks before appraisal.",
    linkText: "See How Logging Works",
    href: "#pricing",
    bgClass: "bg-[#F0F7FF] border-blue-200/80",
    shapeClass: "bg-blue-400/20",
    linkBorder: "border-blue-900/40 text-blue-950",
  },
  {
    tag: "Clear Increases",
    title: "See the real raise amount",
    desc: "Every score turns into an actual monthly figure (like +₹2,700/mo), so there's no mystery about how a raise was decided.",
    linkText: "View Salary Mapping",
    href: "#pricing",
    bgClass: "bg-[#FAF5FF] border-purple-200/80",
    shapeClass: "bg-purple-400/20",
    linkBorder: "border-purple-900/40 text-purple-950",
  },
  {
    tag: "Fair Approvals",
    title: "Approvals without arguments",
    desc: "HR reviews and approves each increment with a reason on record, and sends every employee a clear PDF letter.",
    linkText: "Explore HR Workflow",
    href: "#pricing",
    bgClass: "bg-[#F0FDF4] border-emerald-200/80",
    shapeClass: "bg-emerald-400/20",
    linkBorder: "border-emerald-900/40 text-emerald-950",
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="w-full py-24 bg-white border-t border-b border-slate-200/80 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-tight"
          >
            Everything You Need for Fair Evaluation
          </motion.h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg font-sans">
            Apprizely connects continuous work logging to objective monthly salary rewards.
          </p>
        </div>

        {/* 2x2 Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {bentoFeatures.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-3xl border ${item.bgClass} p-8 sm:p-10 flex flex-col justify-between min-h-[290px] shadow-xs transition-all duration-200 hover:shadow-md`}
            >
              {/* Abstract Decorative Right Geometric Pattern */}
              <div className="absolute right-[-20px] bottom-[-20px] pointer-events-none opacity-60">
                <div className={`w-36 h-36 rounded-3xl transform rotate-12 ${item.shapeClass}`} />
                <div className={`w-28 h-28 rounded-2xl transform -rotate-6 -mt-20 ml-6 ${item.shapeClass}`} />
              </div>

              <div className="relative z-10">
                {/* Top White Pill Tag */}
                <div className="mb-6">
                  <span className="inline-block bg-white text-slate-800 text-xs font-semibold px-3 py-1 rounded-md shadow-xs border border-slate-200/60">
                    {item.tag}
                  </span>
                </div>

                {/* Bold Heading & Description */}
                <h3 className="font-display text-2xl font-bold text-slate-950 mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Link with Arrow */}
              <div className="relative z-10 pt-6">
                <a
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold border-b pb-0.5 transition-opacity hover:opacity-75 ${item.linkBorder}`}
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
