import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon" | "wordmark";
  theme?: "dark" | "light";
  className?: string;
  href?: string;
}

export function BrandLogo({
  showTagline = false,
  size = "md",
  variant = "full",
  theme = "dark",
  className,
  href = "/",
}: BrandLogoProps) {
  // Height mappings matching official minimum size ratios in BRAND.md
  const heightMap = {
    sm: showTagline ? 28 : 24,
    md: showTagline ? 36 : 32,
    lg: showTagline ? 44 : 40,
  };

  const iconSizeMap = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  const currentHeight = heightMap[size];
  const currentIconSize = iconSizeMap[size];

  // Determine the precise SVG file from official brand assets
  let svgPath = "/apprizely-brand-assets/svg/logo-lockup-on-dark.svg";

  if (variant === "icon") {
    svgPath = "/apprizely-brand-assets/svg/icon.svg";
  } else if (variant === "wordmark") {
    svgPath = showTagline
      ? theme === "light"
        ? "/apprizely-brand-assets/svg/wordmark-tagline-on-light.svg"
        : "/apprizely-brand-assets/svg/wordmark-tagline-on-dark.svg"
      : theme === "light"
      ? "/apprizely-brand-assets/svg/wordmark-on-light.svg"
      : "/apprizely-brand-assets/svg/wordmark-on-dark.svg";
  } else {
    // Full Lockup
    svgPath = showTagline
      ? theme === "light"
        ? "/apprizely-brand-assets/svg/logo-lockup-tagline-on-light.svg"
        : "/apprizely-brand-assets/svg/logo-lockup-tagline-on-dark.svg"
      : theme === "light"
      ? "/apprizely-brand-assets/svg/logo-lockup-on-light.svg"
      : "/apprizely-brand-assets/svg/logo-lockup-on-dark.svg";
  }

  const LogoImage = (
    <div className={cn("inline-flex items-center select-none group", className)}>
      <img
        src={svgPath}
        alt="Apprizely"
        height={currentHeight}
        style={{ height: `${currentHeight}px`, width: "auto" }}
        className="transition-transform duration-200 group-hover:scale-[1.02]"
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center no-underline">
        {LogoImage}
      </Link>
    );
  }

  return LogoImage;
}
