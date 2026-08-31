"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Landmark, Store, Building2, Stethoscope } from "lucide-react";

const clients = [
  { name: "Global Edu Academy", icon: GraduationCap, category: "Education" },
  { name: "First Capital Bank", icon: Landmark, category: "Financial" },
  { name: "Apex Retail Chains", icon: Store, category: "Retail & Sales" },
  { name: "Nexus Digital Agency", icon: Building2, category: "Technology" },
  { name: "MedCare Health Network", icon: Stethoscope, category: "Healthcare" },
];

export function LogoCloud() {
  return (
    <section className="w-full border-t border-b border-[#24304A] bg-[#0B1020] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-slate-400 mb-8"
        >
          Trusted by 250+ progressive organizations across industries
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center opacity-80"
        >
          {clients.map((client) => {
            const Icon = client.icon;
            return (
              <div
                key={client.name}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#24304A]/60 bg-[#121A2E]/50 transition-all duration-200 hover:border-cyan-500/40 hover:bg-[#121A2E] group"
              >
                <Icon className="h-6 w-6 text-slate-400 transition-colors group-hover:text-cyan-400 mb-2" />
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white">
                  {client.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {client.category}
                </span>
              </div>
            );
          })}
        </motion.div>

        <p className="mt-8 text-xs text-slate-400 font-mono">
          Join 250+ companies already converting work into fair rewards.
        </p>
      </div>
    </section>
  );
}
