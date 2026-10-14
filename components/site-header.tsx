"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BookingAction } from "@/components/booking-action"
import { MobileNavigation } from "@/components/mobile-navigation"
import { salonConfig } from "@/lib/salon-config"

export function SiteHeader({
  initialSolid = false,
}: {
  initialSolid?: boolean
}) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(initialSolid)

  useEffect(() => {
    const update = () => setScrolled(initialSolid || window.scrollY > 32)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [initialSolid])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 grid h-18 grid-cols-[1fr_auto_1fr] items-center px-5 transition-[background-color,color,box-shadow] duration-200 ease-out md:h-21 md:px-10 lg:px-14 ${
        scrolled
          ? "bg-brand-surface text-brand-ink shadow-[0_1px_0_rgba(20,20,18,.1)]"
          : "bg-transparent text-white"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="hidden items-center gap-8 md:flex"
      >
        {salonConfig.navigation.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={link.href === pathname ? "page" : undefined}
            className="inline-flex min-h-11 items-center text-sm font-medium underline-offset-8 transition-opacity duration-150 hover:opacity-65 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="md:hidden">
        <MobileNavigation
          links={salonConfig.navigation}
          bookingUrl={salonConfig.bookingUrl}
        />
      </div>

      <Link
        href="/"
        aria-label={`${salonConfig.name} home`}
        className="flex flex-col items-center leading-none focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-6"
      >
        <span className="text-[1.35rem] font-black tracking-[-0.055em] md:text-[1.7rem]">
          FORME
        </span>
        <span className="mt-0.5 text-[0.48rem] font-bold tracking-[0.42em] md:text-[0.55rem]">
          STUDIO
        </span>
      </Link>

      <div className="flex justify-end">
        <div className="hidden md:block">
          <BookingAction
            href={salonConfig.bookingUrl}
            variant={scrolled ? "accent" : "light"}
          />
        </div>
        <div className="md:hidden">
          <BookingAction
            href={salonConfig.bookingUrl}
            compact
            variant={scrolled ? "accent" : "light"}
          />
        </div>
      </div>
    </header>
  )
}
