import { SiteHeader } from "@/components/site-header"
import { SalonHero } from "@/components/salon-hero"
import { SalonPhilosophy } from "@/components/salon-philosophy"
import { SalonServices } from "@/components/salon-services"
import { SmoothScroll } from "@/components/smooth-scroll"

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
      <SmoothScroll />
      <main id="main" tabIndex={-1}>
        <SalonHero />
        <SalonServices />
        <SalonPhilosophy />
      </main>
    </>
  )
}
