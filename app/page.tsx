import { SiteHeader } from "@/components/site-header"
import { SalonHero } from "@/components/salon-hero"
import { SalonPhilosophy } from "@/components/salon-philosophy"
import { SalonServices } from "@/components/salon-services"
import { SmoothScroll } from "@/components/smooth-scroll"
import { StyleInspiration } from "@/components/style-inspiration"
import { HaircareProducts } from "@/components/haircare-products"
import { AppointmentFaq } from "@/components/appointment-faq"
import { VisitStudio } from "@/components/visit-studio"
import { SiteFooter } from "@/components/site-footer"
import { OpeningSequence } from "@/components/opening-sequence"
import { SectionReveals } from "@/components/section-reveals"

export default function Page() {
  return (
    <>
      <a
        className="fixed top-2 left-4 z-[100] -translate-y-[150%] bg-brand-surface px-4 py-3 text-brand-ink focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <SiteHeader />
      <OpeningSequence />
      <SmoothScroll />
      <SectionReveals />
      <main id="main" tabIndex={-1}>
        <SalonHero />
        <SalonServices />
        <SalonPhilosophy />
        <StyleInspiration />
        <HaircareProducts />
        <AppointmentFaq />
        <VisitStudio />
      </main>
      <SiteFooter />
    </>
  )
}
