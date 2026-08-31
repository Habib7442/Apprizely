import type { Metadata } from "next";
import { fontDisplay, fontSans } from "@/app/fonts";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Apprizely — Where good work pays off",
  description:
    "An increment-based employee management SaaS platform that measures real employee contribution and turns it into fair, transparent salary rewards.",
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
