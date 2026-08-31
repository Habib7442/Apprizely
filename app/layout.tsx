import type { Metadata } from "next";
import { fontDisplay, fontSans } from "@/app/fonts";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Apprizely — Where good work pays off",
  description:
    "An increment-based employee management SaaS platform that measures real employee contribution and turns it into fair, transparent salary rewards.",
  openGraph: {
    title: "Apprizely — Where good work pays off",
    description:
      "An increment-based employee management SaaS platform that measures real employee contribution and turns it into fair, transparent salary rewards.",
    url: "https://apprizely.com",
    siteName: "Apprizely",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Apprizely — Continuous Employee Evaluation & Salary Increments",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apprizely — Where good work pays off",
    description:
      "An increment-based employee management SaaS platform that measures real employee contribution and turns it into fair, transparent salary rewards.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        fontDisplay.variable,
        fontSans.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
