"use client"

import { useEffect, useRef, useState } from "react"
import { bookingConfig } from "@/lib/booking-config"

type SimplybookConfig = {
  widget_type: "iframe"
  url: string
  theme: string
  theme_settings: {
    sb_base_color: string
    header_color: string
    timeline_hide_unavailable: string
    hide_past_days: string
    timeline_show_end_time: string
    timeline_modern_display: string
    display_item_mode: string
    body_bg_color: string
    sb_review_image: string
    dark_font_color: string
    light_font_color: string
    btn_color_1: string
    sb_company_label_color: string
    hide_img_mode: string
    show_sidebar: string
    sb_busy: string
    sb_available: string
  }
  timeline: "modern"
  datepicker: "top_calendar"
  is_rtl: false
  app_config: {
    clear_session: number
    allow_switch_to_ada: number
    predefined: readonly unknown[]
  }
  container_id: "sbw_xbnhki"
}

type WidgetState = {
  container: HTMLDivElement
  scriptPromise: Promise<void> | null
  initializationAttempted: boolean
  initialized: boolean
  instance: unknown
}

declare global {
  interface Window {
    SimplybookWidget?: new (config: SimplybookConfig) => unknown
    __formeSimplyBookState?: WidgetState
  }
}

const widgetConfig = {
  widget_type: "iframe",
  url: bookingConfig.accountUrl,
  theme: "simple_beauty_theme",
  theme_settings: {
    sb_base_color: "#d42853",
    header_color: "#ffffff",
    timeline_hide_unavailable: "1",
    hide_past_days: "0",
    timeline_show_end_time: "0",
    timeline_modern_display: "as_slots",
    display_item_mode: "block",
    body_bg_color: "#ffffff",
    sb_review_image: "",
    dark_font_color: "#474747",
    light_font_color: "#ffffff",
    btn_color_1: "#d42853",
    sb_company_label_color: "#333333",
    hide_img_mode: "0",
    show_sidebar: "1",
    sb_busy: "#dad2ce",
    sb_available: "#d3e0f1",
  },
  timeline: "modern",
  datepicker: "top_calendar",
  is_rtl: false,
  app_config: {
    clear_session: 0,
    allow_switch_to_ada: 0,
    predefined: [],
  },
  container_id: "sbw_xbnhki",
} as const satisfies SimplybookConfig

function getWidgetState(): WidgetState {
  if (!window.__formeSimplyBookState) {
    const container = document.createElement("div")
    container.id = widgetConfig.container_id
    window.__formeSimplyBookState = {
      container,
      scriptPromise: null,
      initializationAttempted: false,
      initialized: false,
      instance: null,
    }
  }
  return window.__formeSimplyBookState
}

function loadWidgetScript(state: WidgetState): Promise<void> {
  if (window.SimplybookWidget) return Promise.resolve()
  if (state.scriptPromise) return state.scriptPromise

  state.scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = Array.from(document.scripts).find(
      (script) => script.src === bookingConfig.widgetScriptUrl
    )
    const script = existing ?? document.createElement("script")

    const onLoad = () => {
      if (window.SimplybookWidget) resolve()
      else
        reject(new Error("SimplyBook.me did not expose its widget constructor"))
    }
    const onError = () => {
      state.scriptPromise = null
      script.remove()
      reject(new Error("SimplyBook.me widget script could not be loaded"))
    }

    script.addEventListener("load", onLoad, { once: true })
    script.addEventListener("error", onError, { once: true })

    if (!existing) {
      script.async = true
      script.src = bookingConfig.widgetScriptUrl
      document.head.appendChild(script)
    }
  })

  return state.scriptPromise
}

export default function BookingWidget() {
  const host = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    const mount = host.current
    if (!mount) return

    const state = getWidgetState()
    mount.appendChild(state.container)
    let active = true

    if (state.initialized) {
      queueMicrotask(() => {
        if (active) setStatus("ready")
      })
    } else if (state.initializationAttempted) {
      queueMicrotask(() => {
        if (active) setStatus("error")
      })
    } else {
      void loadWidgetScript(state)
        .then(() => {
          if (!active) return
          if (state.initialized) {
            setStatus("ready")
            return
          }
          if (state.initializationAttempted) {
            setStatus("error")
            return
          }

          const Widget = window.SimplybookWidget
          if (!Widget) throw new Error("SimplyBook.me widget is unavailable")

          // The provider has no documented destroy method. Keep one instance
          // and its container alive across Strict Mode and route remounts.
          state.initializationAttempted = true
          state.instance = new Widget(widgetConfig)
          state.initialized = true
          setStatus("ready")
        })
        .catch(() => {
          if (active) setStatus("error")
        })
    }

    return () => {
      active = false
      if (state.container.parentElement === mount)
        mount.removeChild(state.container)
    }
  }, [])

  return (
    <div data-lenis-prevent className="min-h-[36rem] bg-white">
      {status === "loading" && (
        <p role="status" className="px-5 py-8 text-sm text-brand-ink/70">
          Loading booking options…
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="px-5 py-8 text-sm text-brand-ink">
          The booking panel could not load. You can book directly with
          SimplyBook.me using the link below.
        </p>
      )}
      <div ref={host} className={status === "error" ? "hidden" : ""} />
      <div className="border-t border-brand-ink/10 px-5 py-5 text-sm text-brand-ink">
        <a
          href={bookingConfig.accountUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Open booking directly in a new tab ↗
        </a>
      </div>
    </div>
  )
}
