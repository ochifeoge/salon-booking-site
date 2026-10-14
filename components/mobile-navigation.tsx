"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { BookingAction } from "@/components/booking-action"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type Props = {
  links: readonly { label: string; href: string }[]
  bookingUrl: string
}

export function MobileNavigation({ links, bookingUrl }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="grid size-11 place-items-center rounded-sm transition-opacity duration-150 hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Menu size={25} strokeWidth={1.75} aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        data-lenis-prevent
        side="left"
        showCloseButton={false}
        className="!inset-0 !h-dvh !w-full !max-w-none !gap-0 !border-0 !bg-brand-ink !p-0 !text-white !shadow-none"
      >
        <div className="flex h-18 items-center justify-between px-5">
          <SheetTitle className="flex items-baseline gap-2 text-xl font-black tracking-[-0.05em] text-white">
            FORME <span className="text-xs tracking-[0.15em]">STUDIO</span>
          </SheetTitle>
          <SheetClose
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X size={25} strokeWidth={1.75} aria-hidden="true" />
          </SheetClose>
        </div>
        <nav aria-label="Mobile navigation" className="mt-14 px-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.href === pathname ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="block border-b border-white/25 py-4 text-5xl font-semibold tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto px-6 pb-10">
          <BookingAction href={bookingUrl} variant="light" fullWidth />
        </div>
      </SheetContent>
    </Sheet>
  )
}
