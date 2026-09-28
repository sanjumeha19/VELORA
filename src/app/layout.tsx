import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { VeloraThemeProvider } from "@/component/velora-theme-provider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velora — AI Career Companion",
  description:
    "Build your career with AI-powered resume, ATS, interview and career tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable}`}
    >
    <body>
  <VeloraThemeProvider>
    {children}
  </VeloraThemeProvider>
</body>
    </html>
  );
}