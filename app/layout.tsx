import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import { salonConfig } from "@/lib/salon-config"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: `${salonConfig.name} | Salon website demo`,
  description: `${salonConfig.description} Explore this configurable salon website demonstration.`,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname!=="/"||location.hash||matchMedia("(prefers-reduced-motion: reduce)").matches||performance.getEntriesByType("navigation")[0]?.type==="back_forward")return;var root=document.documentElement;root.classList.add("forme-intro-pending");window.__formeIntroPending=true;window.__formeIntroFailSafe=setTimeout(function(){window.__formeIntroAbort?.();root.classList.remove("forme-intro-pending");window.__formeIntroPending=false},3500)}catch(e){document.documentElement.classList.remove("forme-intro-pending")}})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
