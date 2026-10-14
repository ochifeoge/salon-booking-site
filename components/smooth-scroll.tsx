"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/** One page-level Lenis instance, driven by GSAP's existing ticker. */
export function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    )
    let lenis: Lenis | null = null

    const tick = (time: number) => lenis?.raf(time * 1000)
    const sync = () => {
      if (media.matches && !lenis) {
        lenis = new Lenis({
          autoRaf: false,
          anchors: true,
          prevent: (node) =>
            Boolean(
              node.closest("dialog, [role='dialog'], [data-lenis-prevent]")
            ),
        })
        lenis.on("scroll", ScrollTrigger.update)
        gsap.ticker.add(tick)
      } else if (!media.matches && lenis) {
        gsap.ticker.remove(tick)
        lenis.off("scroll", ScrollTrigger.update)
        lenis.destroy()
        lenis = null
      }
    }

    sync()
    media.addEventListener("change", sync)

    return () => {
      media.removeEventListener("change", sync)
      gsap.ticker.remove(tick)
      lenis?.off("scroll", ScrollTrigger.update)
      lenis?.destroy()
    }
  }, [])

  return null
}
