import "@styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Script from "next/script";
import { cn } from "@lib/utils";
import { ThemeProvider } from "@components/theme-provider";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Vivek Kumar — Portfolio",
  description: "Full-stack developer & AI/ML enthusiast. Explore my projects, experience, and technical blog.",
  icons: "/favicon.ico",
  metadataBase: new URL("https://vivekkumar.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-full bg-background font-sans antialiased overflow-y-scroll no-scrollbar",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              const theme = localStorage.getItem('theme') ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              if (theme === 'dark') document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
            } catch (_) {}
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          enableColorScheme={false}
        >
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}