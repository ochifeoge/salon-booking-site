import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { salonConfig } from "@/lib/salon-config"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
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
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  )
}
