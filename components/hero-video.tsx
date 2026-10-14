"use client"

import Image from "next/image"
import { useEffect, useId, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

type Props = { src: string; poster: string; posterAlt: string }

export function HeroVideo({ src, poster, posterAlt }: Props) {
  const video = useRef<HTMLVideoElement>(null)
  const manuallyPaused = useRef(false)
  const id = useId()
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const element = video.current
    if (!element) return
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!preference.matches) void element.play().catch(() => {})
    const onPreferenceChange = () => {
      if (preference.matches) {
        element.pause()
        setStarted(false)
      } else if (!manuallyPaused.current) {
        void element.play().catch(() => {})
      }
    }
    preference.addEventListener("change", onPreferenceChange)
    return () => {
      preference.removeEventListener("change", onPreferenceChange)
      element.pause()
    }
  }, [src])

  async function togglePlayback() {
    const element = video.current
    if (!element) return
    if (!element.paused) {
      manuallyPaused.current = true
      element.pause()
      return
    }
    try {
      manuallyPaused.current = false
      await element.play()
      setMessage("")
    } catch {
      setMessage("Video could not play. The still image is shown instead.")
    }
  }

  return (
    <>
      <Image
        className="absolute inset-0 z-0 object-cover object-[52%_center] md:object-center"
        src={poster}
        alt={posterAlt}
        fill
        sizes="100vw"
        preload
      />
      <video
        ref={video}
        id={id}
        className={`pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[52%_center] transition-opacity duration-200 md:object-center ${
          started && !failed ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => {
          setPlaying(true)
          setStarted(true)
        }}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true)
          setPlaying(false)
          setMessage("Video unavailable. Showing the still image.")
        }}
      />
      {!failed && (
        <button
          className="absolute top-23 right-5 z-20 inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/55 bg-black/45 px-3 text-xs font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[.97] md:top-26 md:right-10 lg:right-14"
          onClick={togglePlayback}
          aria-controls={id}
          aria-label={
            playing ? "Pause background video" : "Play background video"
          }
        >
          {playing ? (
            <Pause size={15} aria-hidden="true" />
          ) : (
            <Play size={15} aria-hidden="true" />
          )}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
      )}
      <span className="sr-only" role="status">
        {message}
      </span>
    </>
  )
}
