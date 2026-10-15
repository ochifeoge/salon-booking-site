import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/home-content"

export function AppointmentFaq() {
  return (
    <section
      id="faq"
      data-reveal-section
      aria-labelledby="faq-title"
      className="bg-brand-surface px-5 py-27 text-brand-ink sm:px-8 lg:px-[5vw] lg:py-36"
    >
      <div className="mx-auto grid max-w-[100rem] gap-12 border-t border-brand-ink/20 pt-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <h2
            id="faq-title"
            data-reveal-heading
            className="max-w-[9ch] text-[clamp(3.3rem,6.4vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.055em]"
          >
            Before your visit.
          </h2>
          <p
            data-reveal-copy
            className="mt-6 max-w-[34ch] text-base leading-relaxed text-brand-ink/70"
          >
            A few useful things to know as you plan. Policies are confirmed by
            the studio during booking.
          </p>
        </div>
        <Accordion className="border-t border-brand-ink/25" defaultValue={[]}>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-brand-ink/25"
            >
              <AccordionTrigger className="min-h-20 items-center gap-6 rounded-none border-0 py-5 text-left text-[clamp(1.1rem,1.6vw,1.5rem)] leading-snug font-semibold tracking-[-0.025em] no-underline hover:no-underline focus-visible:rounded-sm focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-brand-ink">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="h-auto max-w-[62ch] pb-7 text-base leading-relaxed text-brand-ink/75 motion-reduce:transition-none">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
