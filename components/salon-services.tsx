import Image from "next/image"
import { BookingAction } from "@/components/booking-action"
import { ServicesScroll } from "@/components/services-scroll"
import { salonConfig } from "@/lib/salon-config"
import { services } from "@/lib/service-config"

export function SalonServices() {
  return (
    <ServicesScroll>
      <section
        id="services"
        data-reveal-section
        aria-labelledby="services-title"
        className="bg-brand-ink pt-28 pb-20 text-white lg:flex lg:h-[100dvh] lg:min-h-[44rem] lg:flex-col lg:pt-27 lg:pb-0 motion-reduce:lg:h-auto motion-reduce:lg:pb-24"
      >
        <div className="flex items-end justify-between gap-8 px-5 sm:px-8 lg:px-[5vw]">
          <h2
            id="services-title"
            data-reveal-heading
            className="text-[clamp(3.25rem,7vw,7.25rem)] leading-[0.94] font-bold tracking-[-0.065em]"
          >
            The services.
          </h2>
          <span className="hidden pb-2 text-sm font-medium text-white/65 lg:block">
            Scroll to explore ↓
          </span>
        </div>
        <p
          data-reveal-copy
          className="mt-5 px-5 text-sm leading-relaxed text-white/70 sm:px-8 lg:px-[5vw]"
        >
          Sample prices and timings. Your final service details are confirmed
          with the studio.
        </p>

        <div
          data-services-viewport
          aria-label="Services"
          className="mt-10 snap-x snap-mandatory scroll-px-5 overflow-x-auto overscroll-x-contain sm:scroll-px-8 lg:mt-8 lg:min-h-0 lg:flex-1 lg:snap-none lg:overflow-hidden motion-reduce:lg:overflow-visible"
        >
          <div
            data-services-track
            className="flex w-max gap-4 px-5 pb-5 sm:gap-6 sm:px-8 lg:h-full lg:items-center lg:gap-[2vw] lg:px-[5vw] lg:pb-0 motion-reduce:lg:w-full motion-reduce:lg:flex-col motion-reduce:lg:gap-10 motion-reduce:lg:pt-4"
          >
            {services.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                data-service-card
                className="flex w-[min(82vw,26rem)] shrink-0 snap-start flex-col bg-brand-surface text-brand-ink lg:h-[min(62dvh,37rem)] lg:w-[min(78vw,70rem)] lg:flex-row motion-reduce:lg:w-full"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-700 lg:aspect-auto lg:h-full lg:w-[57%] lg:shrink-0">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 45vw, (min-width: 640px) 416px, 82vw"
                    className={`object-cover ${service.imagePosition}`}
                  />
                  <span className="absolute top-4 left-4 text-sm font-semibold text-white drop-shadow-md lg:top-6 lg:left-6">
                    0{index + 1} / 0{services.length}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col px-5 pt-6 pb-6 sm:px-7 lg:px-8 lg:pt-8 lg:pb-8 xl:px-10 xl:pt-10 xl:pb-10">
                  <h3 className="max-w-[12ch] text-[clamp(2.25rem,4vw,4rem)] leading-[0.98] font-bold tracking-[-0.06em]">
                    {service.name}
                  </h3>
                  <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-brand-ink/75 sm:text-base">
                    {service.description}
                  </p>
                  <div className="mt-7 flex gap-8 border-t border-brand-ink/20 pt-4 text-sm font-semibold lg:mt-auto">
                    <span>{service.price}</span>
                    <span>{service.duration}</span>
                  </div>
                  <div className="mt-5">
                    <BookingAction
                      href={salonConfig.bookingUrl}
                      service={service.name}
                      variant="dark"
                      fullWidth
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ServicesScroll>
  )
}
