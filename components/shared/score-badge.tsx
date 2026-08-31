import React from "react";
import { cn } from "@/lib/utils";

export type ScoreBand =
  | "outstanding"
  | "exceeds"
  | "meets"
  | "developing"
  | "needs_improvement";

interface ScoreBadgeProps {
  score?: number;
  band?: ScoreBand;
  showScore?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function getScoreBand(score: number): {
  band: ScoreBand;
  label: string;
  suggestedIncrement: string;
} {
  if (score >= 90) {
    return { band: "outstanding", label: "Outstanding", suggestedIncrement: "12%" };
  }
  if (score >= 80) {
    return { band: "exceeds", label: "Exceeds", suggestedIncrement: "9%" };
  }
  if (score >= 70) {
    return { band: "meets", label: "Meets", suggestedIncrement: "6%" };
  }
  if (score >= 60) {
    return { band: "developing", label: "Developing", suggestedIncrement: "3%" };
  }
  return {
    band: "needs_improvement",
    label: "Needs Improvement",
    suggestedIncrement: "0%",
  };
}

export function ScoreBadge({
  score,
  band: providedBand,
  showScore = true,
  size = "md",
  className,
}: ScoreBadgeProps) {
  const resolvedInfo =
    score !== undefined ? getScoreBand(score) : undefined;
  const activeBand = providedBand || resolvedInfo?.band || "meets";
  const displayLabel = resolvedInfo?.label || activeBand.replace("_", " ");

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3.5 py-1.5 text-sm font-semibold",
  };

  const bandStyles: Record<ScoreBand, string> = {
    outstanding:
      "bg-gradient-primary text-white shadow-glow border border-violet-400/40",
    exceeds:
      "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
    meets:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    developing:
      "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    needs_improvement:
      "bg-rose-500/15 text-rose-400 border border-rose-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase font-sans select-none",
        sizeClasses[size],
        bandStyles[activeBand],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
      <span>{displayLabel}</span>
      {showScore && score !== undefined && (
        <span className="tabular-nums font-mono opacity-90 border-l border-current/20 pl-1.5 ml-0.5">
          {score.toFixed(1)}
        </span>
      )}
    </span>
  );
}
