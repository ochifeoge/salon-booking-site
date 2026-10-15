import { InspirationGallery } from "@/components/inspiration-gallery"
import { inspiration } from "@/lib/home-content"

export function StyleInspiration() {
  return (
    <section
      id="inspiration"
      data-reveal-section
      aria-labelledby="inspiration-title"
      className="overflow-hidden bg-brand-surface px-5 py-27 text-brand-ink sm:px-8 lg:px-[5vw] lg:py-36"
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-8 border-t border-brand-ink/20 pt-6 md:grid-cols-[1fr_auto] md:items-end">
          <h2
            id="inspiration-title"
            data-reveal-heading
            className="max-w-[9ch] text-[clamp(3.4rem,8vw,7.5rem)] leading-[0.93] font-bold tracking-[-0.055em]"
          >
            Find your next look.
          </h2>
          <p
            data-reveal-copy
            className="max-w-[23ch] text-sm leading-relaxed font-medium text-brand-ink/65 md:pb-2 md:text-right"
          >
            Style inspiration imagery. Explore a direction, then make it your
            own.
          </p>
        </div>
        <InspirationGallery items={inspiration} />
      </div>
    </section>
  )
}
