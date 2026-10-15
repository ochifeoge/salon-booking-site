import { ArrowUpRight } from "lucide-react"
import { studioDetails } from "@/lib/home-content"

const hasContact = Boolean(studioDetails.email || studioDetails.phone)

export function VisitStudio() {
  return (
    <section
      id="visit"
      data-reveal-section
      aria-labelledby="visit-title"
      className="bg-[#dfe0dc] px-5 py-27 text-brand-ink sm:px-8 lg:px-[5vw] lg:py-36"
    >
      <div className="mx-auto max-w-[100rem] border-t border-brand-ink/25 pt-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <h2
            id="visit-title"
            data-reveal-heading
            className="max-w-[10ch] text-[clamp(3.5rem,7vw,7rem)] leading-[0.94] font-bold tracking-[-0.055em]"
          >
            Make time for you.
          </h2>
          <p
            data-reveal-copy
            className="max-w-[29ch] self-end text-lg leading-[1.45] font-medium tracking-[-0.02em] lg:text-2xl"
          >
            Your time in the chair should feel like time well spent. Plan your
            visit around the service that suits you.
          </p>
        </div>
        <div className="mt-18 grid border-t border-brand-ink/25 md:grid-cols-3 lg:mt-28">
          <div className="border-b border-brand-ink/25 py-5 pr-6 md:border-r md:border-b-0">
            <h3 className="text-sm font-semibold tracking-[0.08em] uppercase">
              Location
            </h3>
            {studioDetails.address ? (
              <>
                <p className="mt-5 max-w-[22ch] text-lg leading-snug">
                  {studioDetails.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioDetails.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-5 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Get directions <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </>
            ) : (
              <p className="mt-5 max-w-[25ch] text-base leading-relaxed text-brand-ink/70">
                Studio address will be shared when it is confirmed.
              </p>
            )}
          </div>
          <div className="border-b border-brand-ink/25 py-5 md:border-r md:border-b-0 md:px-7">
            <h3 className="text-sm font-semibold tracking-[0.08em] uppercase">
              Opening hours
            </h3>
            {studioDetails.hours.length ? (
              <dl className="mt-5 space-y-2">
                {studioDetails.hours.map((entry) => (
                  <div
                    key={entry.day}
                    className="flex justify-between gap-5 text-base"
                  >
                    <dt>{entry.day}</dt>
                    <dd className="font-medium">{entry.time}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-5 max-w-[25ch] text-base leading-relaxed text-brand-ink/70">
                Opening hours have not been published yet.
              </p>
            )}
          </div>
          <div className="py-5 md:pl-7">
            <h3 className="text-sm font-semibold tracking-[0.08em] uppercase">
              Contact
            </h3>
            {hasContact ? (
              <div className="mt-5 flex flex-col items-start gap-3 text-base font-medium">
                {studioDetails.phone && (
                  <a
                    className="underline underline-offset-5 focus-visible:outline-2 focus-visible:outline-offset-4"
                    href={`tel:${studioDetails.phone}`}
                  >
                    {studioDetails.phone}
                  </a>
                )}
                {studioDetails.email && (
                  <a
                    className="break-all underline underline-offset-5 focus-visible:outline-2 focus-visible:outline-offset-4"
                    href={`mailto:${studioDetails.email}`}
                  >
                    {studioDetails.email}
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-5 max-w-[25ch] text-base leading-relaxed text-brand-ink/70">
                Direct contact details are not available in this demo.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
