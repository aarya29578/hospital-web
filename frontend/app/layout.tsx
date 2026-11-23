import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";

const grotesque = Bricolage_Grotesque({
  variable: "--font-grotesque",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mumbaiorthototal.in"),
  title: "Best Orthopedic Surgeon in Mumbai | Dr. Girish Bhalerao",
  description: "Mumbai Ortho Total provides comprehensive orthopedic care, joint replacement, sports medicine, spine treatment and trauma care across Mumbai.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grotesque.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
