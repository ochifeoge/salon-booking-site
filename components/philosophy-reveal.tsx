"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function PhilosophyReveal({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: "top 58%",
              once: true,
            },
          })
          .from("[data-philosophy-line]", {
            autoAlpha: 0,
            y: 26,
            duration: 0.72,
            stagger: 0.09,
            ease: "power3.out",
          })
          .from(
            "[data-philosophy-image]",
            {
              clipPath: "inset(20% 0)",
              opacity: 0.1,
              autoAlpha: 0.88,
              duration: 0.85,
              ease: "power2.out",
            },
            0.12
          )
          .from(
            "[data-philosophy-copy]",
            {
              autoAlpha: 0,
              y: 16,
              duration: 0.58,
              ease: "power3.out",
            },
            0.2
          )
      })

      return () => mm.revert()
    },
    { scope }
  )

  return <div ref={scope}>{children}</div>
}
