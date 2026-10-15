import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { products, studioDetails } from "@/lib/home-content"

function enquiryHref(name: string) {
  if (studioDetails.email) {
    return `mailto:${studioDetails.email}?subject=${encodeURIComponent(`Product enquiry: ${name}`)}`
  }
  if (studioDetails.phone) {
    return `sms:${studioDetails.phone}?body=${encodeURIComponent(`Hello, I would like to enquire about ${name}.`)}`
  }
  return null
}

export function HaircareProducts() {
  return (
    <section
      id="products"
      data-reveal-section
      aria-labelledby="products-title"
      className="bg-brand-ink px-5 py-27 text-white sm:px-8 lg:px-[5vw] lg:py-36"
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-7 border-t border-white/25 pt-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <h2
            id="products-title"
            data-reveal-heading
            className="max-w-[13ch] text-[clamp(3.1rem,6.7vw,6.75rem)] leading-[0.95] font-bold tracking-[-0.055em]"
          >
            Good hair, beyond the appointment.
          </h2>
          <p
            data-reveal-copy
            className="max-w-[33ch] self-end text-base leading-[1.5] text-white/75 lg:pb-2 lg:text-lg"
          >
            A closer look at care for the days between appointments. Product
            imagery and names shown here are illustrative.
          </p>
        </div>

        <div className="mt-15 grid gap-12 border-t border-white/25 pt-8 lg:mt-22 lg:grid-cols-[1.12fr_.88fr] lg:gap-8">
          {products.map((product, index) => {
            const href = enquiryHref(product.name)
            return (
              <article
                key={product.id}
                className={index === 1 ? "lg:pt-32" : ""}
              >
                <div
                  data-reveal-image
                  className={`relative overflow-hidden bg-white/10 ${index === 0 ? "aspect-[5/4]" : "aspect-[4/5]"}`}
                >
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(min-width: 1024px) 54vw, 100vw"
                        : "(min-width: 1024px) 39vw, 100vw"
                    }
                    className={`object-cover ${product.position}`}
                  />
                </div>
                <div className="mt-5 grid gap-4 border-t border-white/25 pt-4 sm:grid-cols-[1fr_auto] sm:gap-7">
                  <div>
                    <h3 className="text-[clamp(1.7rem,2.3vw,2.5rem)] leading-tight font-semibold tracking-[-0.035em]">
                      {product.name}
                    </h3>
                    <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-white/70">
                      {product.description}
                    </p>
                    {product.price && (
                      <p className="mt-3 text-sm font-semibold">
                        {product.price}
                      </p>
                    )}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold underline decoration-white/50 underline-offset-6 transition-colors hover:text-white/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      Enquire about this product{" "}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  ) : (
                    <div className="self-start">
                      <button
                        type="button"
                        disabled
                        className="inline-flex min-h-11 items-center text-sm font-semibold text-white/50"
                      >
                        Enquire about this product
                      </button>
                      <p className="max-w-[24ch] text-xs leading-relaxed text-white/60">
                        Enquiries are unavailable in this demo.
                      </p>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
