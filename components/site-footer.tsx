import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { BookingAction } from "@/components/booking-action"
import { salonConfig } from "@/lib/salon-config"
import { studioDetails } from "@/lib/home-content"

const footerNavigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Inspiration", href: "/#inspiration" },
  { label: "Products", href: "/#products" },
  { label: "Before your visit", href: "/#faq" },
  { label: "Visit", href: "/#visit" },
  { label: "Book", href: salonConfig.bookingUrl },
] as const

export function SiteFooter() {
  return (
    <>
      <section
        data-reveal-section
        className="bg-brand-accent px-5 py-27 text-white sm:px-8 lg:px-[5vw] lg:py-38"
        aria-labelledby="closing-title"
      >
        <div className="mx-auto max-w-[100rem] border-t border-white/45 pt-6">
          <h2
            id="closing-title"
            data-reveal-heading
            className="max-w-[14ch] text-[clamp(3.4rem,9.4vw,9rem)] leading-[0.93] font-bold tracking-[-0.055em]"
          >
            Your next good hair day starts here.
          </h2>
          <div className="mt-12 flex flex-col gap-8 border-t border-white/45 pt-7 md:mt-20 md:flex-row md:items-end md:justify-between">
            <p
              data-reveal-copy
              className="max-w-[30ch] text-lg leading-snug font-medium"
            >
              Choose the service that feels right. We&apos;ll see you there.
            </p>
            <BookingAction href={salonConfig.bookingUrl} variant="light" />
          </div>
        </div>
      </section>
      <footer
        data-reveal-footer
        className="bg-brand-ink px-5 pt-18 pb-8 text-white sm:px-8 lg:px-[5vw] lg:pt-25"
      >
        <div className="mx-auto max-w-[100rem]">
          <div className="grid gap-14 lg:grid-cols-[1fr_auto]">
            <Link
              href="/"
              data-reveal-footer-wordmark
              aria-label="Forme Studio home"
              className="w-fit self-start text-[clamp(3.8rem,12vw,11rem)] leading-[.8] font-black tracking-[-0.075em] focus-visible:outline-2 focus-visible:outline-offset-5 focus-visible:outline-white"
            >
              FORME
              <span className="mt-4 block pl-1 text-[.14em] leading-none tracking-[.47em]">
                STUDIO
              </span>
            </Link>
            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 gap-x-10 gap-y-2 self-start text-sm font-medium sm:grid-cols-3 lg:gap-x-16"
            >
              {footerNavigation.map((link) => (
                <a
                  key={link.href}
                  data-reveal-footer-link
                  href={link.href}
                  className="inline-flex min-h-11 items-center underline-offset-5 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          {studioDetails.social.length > 0 && (
            <div className="mt-14 flex flex-wrap gap-7 border-t border-white/25 pt-5">
              {studioDetails.social.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
                >
                  {social.label} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
          <div className="mt-20 flex flex-col gap-4 border-t border-white/25 pt-5 text-xs leading-relaxed text-white/60 md:flex-row md:justify-between">
            <p>© {new Date().getFullYear()} Forme Studio. Website preview.</p>
            <p>
              Illustrative imagery, services, and product content. Confirm
              details with the studio.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
