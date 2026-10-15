"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/** Animates server-rendered content without making each section a client tree. */
export function SectionReveals() {
  useEffect(() => {
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: no-preference)", () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal-section]")
        .forEach((section) => {
          const heading = section.querySelector<HTMLElement>(
            "[data-reveal-heading]"
          )
          const copy = section.querySelector<HTMLElement>("[data-reveal-copy]")
          if (!heading) return

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          })

          timeline.fromTo(
            heading,
            { clipPath: "inset(0 0 100% 0)", y: 18 },
            {
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              duration: 0.72,
              ease: "power3.out",
            }
          )

          if (copy) {
            timeline.fromTo(
              copy,
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
              0.16
            )
          }
        })

      for (const sectionId of ["inspiration", "products"]) {
        document
          .querySelectorAll<HTMLElement>(`#${sectionId} [data-reveal-image]`)
          .forEach((image, index) => {
            gsap.fromTo(
              image,
              { clipPath: "inset(15% 0)", scale: 1.035 },
              {
                clipPath: "inset(0% 0)",
                scale: 1,
                duration: 0.9,
                delay: index * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: image,
                  start: "top 90%",
                  once: true,
                },
              }
            )
          })
      }

      const footer = document.querySelector<HTMLElement>("[data-reveal-footer]")
      const footerWordmark = footer?.querySelector<HTMLElement>(
        "[data-reveal-footer-wordmark]"
      )
      const footerLinks = footer?.querySelectorAll<HTMLElement>(
        "[data-reveal-footer-link]"
      )
      if (footer && footerWordmark && footerLinks?.length) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: footer,
              start: "top 83%",
              once: true,
            },
          })
          .fromTo(
            footerWordmark,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.58, ease: "power3.out" }
          )
          .fromTo(
            footerLinks,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.38,
              stagger: 0.055,
              ease: "power3.out",
            },
            0.16
          )
      }
    })

    return () => media.revert()
  }, [])

  return null
}
