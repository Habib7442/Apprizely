"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  UserCheck,
  ShieldAlert,
  Users,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { cn } from "@/lib/utils";

export type RoleView = "employee" | "manager" | "org_admin" | "super_admin";

interface NavbarProps {
  activeRole?: RoleView;
  onRoleChange?: (role: RoleView) => void;
  showRoleSelector?: boolean;
}

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Increment Calculator", href: "#increments" },
  { name: "Pricing", href: "#pricing" },
];

const rolesList: { id: RoleView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "employee", label: "Employee View", icon: UserCheck },
  { id: "manager", label: "Manager View", icon: Users },
  { id: "org_admin", label: "HR Admin View", icon: Briefcase },
  { id: "super_admin", label: "Super Admin", icon: ShieldAlert },
];

export function Navbar({
  activeRole = "employee",
  onRoleChange,
  showRoleSelector = false,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleView>(activeRole);

  const handleRoleSelect = (role: RoleView) => {
    setSelectedRole(role);
    setRoleDropdownOpen(false);
    if (onRoleChange) {
      onRoleChange(role);
    }
  };

  const currentRoleLabel =
    rolesList.find((r) => r.id === selectedRole)?.label || "Select Role";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/40 bg-white/30 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo (Left) */}
        <div className="flex items-center">
          <BrandLogo showTagline={true} theme="light" size="md" href="/" />
        </div>

        {/* Desktop Navigation Links (Centered) */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-medium text-slate-600 transition-colors hover:text-slate-950 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Auth Action Buttons */}
          <Link
            href="/sign-in"
            className="text-xs font-medium text-slate-700 transition-colors hover:text-slate-950 px-3 py-1.5"
          >
            Login
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-[#111827] hover:bg-slate-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Sign Up</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-[#24304A] bg-[#121A2E] p-2 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="border-b border-[#24304A] bg-[#0B1020] px-4 py-6 md:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-200 transition-colors hover:text-cyan-400"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Role switcher inside mobile menu */}
            {showRoleSelector && (
              <div className="mb-6 pt-4 border-t border-[#24304A]">
                <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Preview Dashboard Role
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {rolesList.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => {
                          handleRoleSelect(role.id);
                          setMobileMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border p-2 text-xs font-medium transition-all text-left",
                          isSelected
                            ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
                            : "border-[#24304A] bg-[#121A2E] text-slate-300"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{role.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-lg border border-[#24304A] bg-[#121A2E] py-2.5 text-xs font-semibold text-slate-200"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-500 py-2.5 text-xs font-semibold text-white"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
