import Image from "next/image"
import { PhilosophyReveal } from "@/components/philosophy-reveal"
import { philosophyConfig } from "@/lib/philosophy-config"

export function SalonPhilosophy() {
  return (
    <PhilosophyReveal>
      <section
        id="philosophy"
        aria-labelledby="philosophy-title"
        className="grid bg-brand-surface text-brand-ink lg:min-h-[48rem] lg:grid-cols-[55%_45%]"
      >
        <div className="flex flex-col justify-between px-5 pt-28 pb-14 sm:px-8 lg:px-12 lg:pt-24 lg:pb-20 xl:px-18 xl:pt-28">
          <h2
            id="philosophy-title"
            className="text-[clamp(2.65rem,12.5vw,6.25rem)] leading-[0.98] font-bold tracking-[-0.065em] lg:text-[clamp(4.2rem,6.15vw,7.5rem)]"
          >
            {philosophyConfig.heading.map((line) => (
              <span key={line} data-philosophy-line className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-10 max-w-[37ch] text-lg leading-[1.45] font-medium tracking-[-0.02em] sm:text-xl lg:mt-16 lg:max-w-[35ch] lg:text-[1.35rem]">
            {philosophyConfig.description}
          </p>
        </div>
        <div
          data-philosophy-image
          className="relative min-h-[29rem] overflow-hidden sm:min-h-[39rem] lg:min-h-full"
        >
          <Image
            src={philosophyConfig.image.src}
            alt={philosophyConfig.image.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-[50%_43%] sm:object-[50%_42%]"
          />
        </div>
      </section>
    </PhilosophyReveal>
  )
}
