import { HeroVideo } from "@/components/hero-video"
import { BookingAction } from "@/components/booking-action"
import { salonConfig } from "@/lib/salon-config"

export function SalonHero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100dvh] overflow-hidden bg-brand-ink text-white"
    >
      <HeroVideo
        src={salonConfig.video}
        poster={salonConfig.poster}
        posterAlt={salonConfig.posterAlt}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(0,0,0,.56)_0%,rgba(0,0,0,.23)_34%,rgba(0,0,0,.48)_62%,rgba(0,0,0,.86)_100%)]"
      />
      <div className="relative z-10 mt-auto w-full px-5 pt-34 pb-26 sm:px-8 md:px-10 md:pb-12 lg:px-14 lg:pb-14">
        <h1
          id="hero-title"
          className="max-w-[15ch] text-[clamp(3.35rem,14vw,5rem)] leading-[0.96] font-bold tracking-[-0.045em] text-balance md:max-w-none md:text-[clamp(5rem,8.1vw,8rem)]"
        >
          <span className="block overflow-hidden">
            <span className="block" data-intro-line>
              Good hair.
            </span>
          </span>
          <span className="block overflow-hidden md:pl-[17vw]">
            <span className="block" data-intro-line>
              Your way.
            </span>
          </span>
        </h1>
        <div className="mt-7 flex flex-col gap-7 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p
            data-intro-copy
            className="max-w-[29ch] text-base leading-snug font-medium text-white md:max-w-[36ch] md:text-lg"
          >
            Personalised styling and thoughtful care, shaped around you.
          </p>
          <div data-intro-book>
            <BookingAction
              href={salonConfig.bookingUrl}
              variant="light"
              fullWidth
            />
          </div>
        </div>
      </div>
    </section>
  )
}
