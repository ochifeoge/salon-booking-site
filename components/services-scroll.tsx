"use client"

import { useRef, type FocusEvent, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function ServicesScroll({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)

  useGSAP(
    () => {
      const section = scope.current?.querySelector<HTMLElement>("#services")
      const viewport = scope.current?.querySelector<HTMLElement>(
        "[data-services-viewport]"
      )
      const track = scope.current?.querySelector<HTMLElement>(
        "[data-services-track]"
      )
      if (!section || !viewport || !track) return

      const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
      const media = gsap.matchMedia()

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tween = gsap.to(track, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              start: "top -20%",
              end: () => `+=${travel()}`,
              scrub: 0.35,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          })
          trigger.current = tween.scrollTrigger ?? null

          let frame = 0
          const observer = new ResizeObserver(() => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => ScrollTrigger.refresh())
          })
          observer.observe(viewport)
          observer.observe(track)

          return () => {
            observer.disconnect()
            cancelAnimationFrame(frame)
            trigger.current = null
            tween.kill()
          }
        }
      )

      return () => media.revert()
    },
    { scope }
  )

  const bringCardIntoView = (event: FocusEvent<HTMLDivElement>) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-service-card]"
    )
    const viewport = scope.current?.querySelector<HTMLElement>(
      "[data-services-viewport]"
    )
    const track = scope.current?.querySelector<HTMLElement>(
      "[data-services-track]"
    )
    if (!card || !viewport || !track) return

    if (trigger.current) {
      const cardBounds = card.getBoundingClientRect()
      const viewportBounds = viewport.getBoundingClientRect()
      if (
        viewport.scrollLeft < 1 &&
        cardBounds.left >= viewportBounds.left - 1 &&
        cardBounds.right <= viewportBounds.right + 1
      )
        return

      // Browsers may scroll an overflow-hidden viewport to reveal focused content.
      // The pinned desktop view is controlled by the vertical ScrollTrigger instead.
      viewport.scrollLeft = 0
      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth)
      const inset = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0
      const target = Math.min(travel, Math.max(0, card.offsetLeft - inset))
      window.scrollTo({
        top: trigger.current.start + target,
        behavior: "instant",
      })
      ScrollTrigger.update()
    } else {
      card.scrollIntoView({ block: "nearest", inline: "nearest" })
    }
  }

  return (
    <div ref={scope} onFocusCapture={bringCardIntoView}>
      {children}
    </div>
  )
}
