import type { Metadata } from "next"
import BookingWidget from "@/components/BookingWidget"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Book an appointment | Forme Studio",
  description: "Choose an appointment with Forme Studio.",
}

export default function BookPage() {
  return (
    <>
      <a
        className="fixed top-2 left-4 z-[100] -translate-y-[150%] bg-brand-surface px-4 py-3 text-brand-ink focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <SiteHeader initialSolid />
      <main
        id="main"
        tabIndex={-1}
        className="min-h-dvh bg-brand-surface px-5 pt-35 pb-20 text-brand-ink sm:px-8 lg:px-14 lg:pt-43"
      >
        <div className="mx-auto max-w-[1440px]">
          <h1 className="max-w-[13ch] text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.96] font-bold tracking-[-0.065em]">
            Book an appointment.
          </h1>
          <p className="mt-6 max-w-[39ch] text-base leading-relaxed md:text-lg">
            Choose a service and an available time in the booking panel below.
          </p>
          <div className="mt-12 lg:mt-16">
            <BookingWidget />
          </div>
        </div>
      </main>
    </>
  )
}
