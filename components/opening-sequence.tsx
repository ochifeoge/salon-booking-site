"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { FormeWordmark } from "@/components/forme-wordmark"

declare global {
  interface Window {
    __formeIntroPending?: boolean
    __formeIntroAbort?: () => void
    __formeIntroFailSafe?: number
  }
}

let pendingRelease: ReturnType<typeof setTimeout> | null = null

export function OpeningSequence() {
  useEffect(() => {
    if (pendingRelease !== null) {
      clearTimeout(pendingRelease)
      pendingRelease = null
    }

    const root = document.documentElement

    if (
      !window.__formeIntroPending ||
      !root.classList.contains("forme-intro-pending")
    ) {
      return
    }

    const curtain = document.querySelector<HTMLElement>("[data-intro-curtain]")
    const floating = document.querySelector<HTMLElement>(
      "[data-intro-wordmark-inner]"
    )
    const realWordmark = document.querySelector<HTMLElement>(
      "[data-site-wordmark]"
    )

    const book = document.querySelector<HTMLElement>("[data-intro-book]")
    const copy = document.querySelector<HTMLElement>("[data-intro-copy]")
    const control = document.querySelector<HTMLElement>("[data-intro-control]")

    const nav = Array.from(
      document.querySelectorAll<HTMLElement>("[data-intro-nav]")
    ).filter(
      (element) =>
        element.getClientRects().length > 0 &&
        element !== book &&
        !element.contains(book)
    )

    const lines = Array.from(
      document.querySelectorAll<HTMLElement>("[data-intro-line]")
    )

    function releasePendingState() {
      clearTimeout(window.__formeIntroFailSafe)
      window.__formeIntroFailSafe = undefined
      root.classList.remove("forme-intro-pending")
      window.__formeIntroPending = false
    }

    if (!curtain || !floating || !realWordmark || lines.length === 0) {
      releasePendingState()
      return
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    let finished = false
    let timeline: gsap.core.Timeline | null = null
    let context: gsap.Context | null = null

    const destination = () => {
      const bounds = realWordmark.getBoundingClientRect()

      return {
        x: bounds.left + bounds.width / 2 - window.innerWidth / 2,
        y: bounds.top + bounds.height / 2 - window.innerHeight / 2,
        scale: bounds.width / (floating.offsetWidth || bounds.width),
      }
    }

    function clearListeners() {
      window.removeEventListener("wheel", finish)
      window.removeEventListener("touchstart", finish)
      window.removeEventListener("pointerdown", finish)
      window.removeEventListener("keydown", finish)
      window.removeEventListener("resize", finish)
      reducedMotion.removeEventListener("change", onMotionChange)

      if (window.__formeIntroAbort === finish) {
        window.__formeIntroAbort = undefined
      }
    }

    function finish() {
      if (finished) return

      finished = true
      clearListeners()
      timeline?.kill()
      context?.revert()
      releasePendingState()
    }

    function onMotionChange() {
      if (reducedMotion.matches) finish()
    }

    window.__formeIntroAbort = finish

    window.addEventListener("wheel", finish, { passive: true })
    window.addEventListener("touchstart", finish, { passive: true })
    window.addEventListener("pointerdown", finish, { passive: true })
    window.addEventListener("keydown", finish)
    window.addEventListener("resize", finish)
    reducedMotion.addEventListener("change", onMotionChange)

    // Allow enough time for the longer guided sequence.
    clearTimeout(window.__formeIntroFailSafe)
    window.__formeIntroFailSafe = window.setTimeout(finish, 8000)

    if (reducedMotion.matches) {
      finish()
      return
    }

    try {
      context = gsap.context(() => {
        const startScale = window.innerWidth < 640 ? 3.2 : 4

        // Prepare every reveal before the curtain moves.
        gsap.set(floating, {
          x: 0,
          y: 0,
          scale: startScale,
          autoAlpha: 1,
          transformOrigin: "center center",
        })
        gsap.set(realWordmark, { autoAlpha: 0 })
        gsap.set(curtain, { yPercent: 0 })
        gsap.set(nav, { autoAlpha: 0, y: 6 })
        gsap.set(lines, { autoAlpha: 0, yPercent: 105 })

        if (copy) {
          gsap.set(copy, { autoAlpha: 0, y: 16 })
        }

        if (book) {
          gsap.set(book, {
            autoAlpha: 0,
            y: 14,
            scale: 0.97,
            transformOrigin: "center center",
          })
        }

        if (control) {
          gsap.set(control, { autoAlpha: 0 })
        }

        timeline = gsap.timeline({ onComplete: finish })

        // 1. Centre hold, then logo movement and curtain reveal.
        timeline
          .to(
            floating,
            {
              x: () => destination().x,
              y: () => destination().y,
              scale: () => destination().scale,
              duration: 1.35,
              ease: "power3.inOut",
            },
            0.35
          )
          .to(
            curtain,
            {
              yPercent: -100,
              duration: 1.15,
              ease: "power3.inOut",
            },
            0.85
          )
          .set(realWordmark, { autoAlpha: 1 }, 1.72)
          .set(floating, { autoAlpha: 0 }, 1.72)

          // 2. Reveal the headline line by line.
          .to(
            lines,
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.75,
              stagger: 0.16,
              ease: "power3.out",
            },
            1.85
          )
          .addLabel("headlineDone")

        // 3. Explain the offer.
        if (copy) {
          timeline.to(
            copy,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            "headlineDone+=0.12"
          )
        }

        timeline.addLabel("copyDone")

        // 4. Give the booking action its own reveal.
        if (book) {
          timeline.to(
            book,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
            },
            "copyDone+=0.18"
          )
        }

        timeline.addLabel("bookingDone")

        // 5. Bring in secondary navigation and controls.
        if (nav.length > 0) {
          timeline.to(
            nav,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.06,
              ease: "power2.out",
            },
            "bookingDone+=0.08"
          )
        }

        if (control) {
          timeline.to(
            control,
            {
              autoAlpha: 1,
              duration: 0.35,
              ease: "power2.out",
            },
            "bookingDone+=0.08"
          )
        }
      })
    } catch (error) {
      finish()
      console.error("Opening sequence failed", error)
    }

    return () => {
      clearListeners()
      clearTimeout(window.__formeIntroFailSafe)
      window.__formeIntroFailSafe = undefined
      timeline?.kill()
      context?.revert()

      // A Strict Mode remount cancels this deferred release.
      if (!finished) {
        pendingRelease = setTimeout(() => {
          pendingRelease = null
          releasePendingState()
        }, 0)
      }
    }
  }, [])

  return (
    <>
      <div
        data-intro-curtain
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] bg-brand-ink"
      />

      <div
        data-intro-floating-wordmark
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[71] place-items-center text-white"
      >
        <div
          data-intro-wordmark-inner
          className="flex scale-[3.2] flex-col items-center leading-none sm:scale-[4]"
        >
          <FormeWordmark />
        </div>
      </div>
    </>
  )
}
