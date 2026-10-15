"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import type { inspiration } from "@/lib/home-content"

type Item = (typeof inspiration)[number]

export function InspirationGallery({ items }: { items: readonly Item[] }) {
  const opener = useRef<HTMLButtonElement | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  function open(index: number, button: HTMLButtonElement) {
    opener.current = button
    setSelected(index)
  }

  function close() {
    setSelected(null)
    requestAnimationFrame(() => opener.current?.focus())
  }

  function move(direction: -1 | 1) {
    setSelected((current) =>
      current === null
        ? null
        : (current + direction + items.length) % items.length
    )
  }

  const active = selected === null ? null : items[selected]

  return (
    <div className="mt-15 md:mt-22">
      <div className="grid grid-cols-12 gap-x-4 gap-y-14 sm:gap-x-8 md:gap-y-0">
        {items.map((item, index) => (
          <figure
            key={item.id}
            data-gallery-item
            className={
              index === 0
                ? "col-span-11 md:col-span-5"
                : index === 1
                  ? "col-span-9 col-start-4 md:col-span-5 md:col-start-8 md:mt-44"
                  : "col-span-10 col-start-2 md:col-span-6 md:col-start-3 md:mt-18"
            }
          >
            <button
              type="button"
              aria-label={`Enlarge ${item.title} image, ${index + 1} of ${items.length}`}
              onClick={(event) => open(index, event.currentTarget)}
              className="group block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-5"
            >
              <span
                data-reveal-image
                className={`relative block overflow-hidden bg-brand-ink/10 ${index === 2 ? "aspect-[6/4]" : "aspect-[4/5]"}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={
                    index === 2
                      ? "(min-width: 768px) 50vw, 85vw"
                      : "(min-width: 768px) 42vw, 90vw"
                  }
                  className={`object-cover transition-transform duration-500 ease-[var(--ease-out)] motion-safe:group-hover:scale-[1.025] ${item.position}`}
                />
                <span className="absolute right-4 bottom-4 grid size-11 place-items-center bg-brand-surface text-brand-ink opacity-100 transition-colors duration-150 group-hover:bg-brand-accent group-hover:text-white md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                  <ArrowRight size={20} aria-hidden="true" />
                </span>
              </span>
              <span className="mt-4 flex items-baseline justify-between gap-4 border-t border-brand-ink/25 pt-3 text-base font-semibold">
                <span>{item.title}</span>
                <span className="text-xs font-medium text-brand-ink/55 tabular-nums">
                  0{index + 1}
                </span>
              </span>
            </button>
          </figure>
        ))}
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(isOpen) => !isOpen && close()}
      >
        {active && (
          <DialogContent
            showCloseButton={false}
            data-lenis-prevent
            className="flex h-[100dvh] max-h-[100dvh] max-w-none flex-col gap-0 overflow-y-auto rounded-none border-0 bg-brand-ink p-0 text-white ring-0 sm:max-w-none"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault()
                move(-1)
              } else if (event.key === "ArrowRight") {
                event.preventDefault()
                move(1)
              }
            }}
          >
            <div className="flex min-h-16 items-center justify-between gap-4 border-b border-white/20 px-5 md:px-10">
              <div>
                <DialogTitle className="text-base font-semibold">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="text-xs text-white/65">
                  Style inspiration imagery · {selected! + 1} of {items.length}
                </DialogDescription>
              </div>
              <button
                type="button"
                aria-label="Close enlarged image"
                onClick={close}
                className="grid size-11 place-items-center rounded-sm transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1 p-4 md:p-8">
              <Image
                src={active.image}
                alt={active.alt}
                fill
                sizes="100vw"
                className="object-contain p-4 md:p-8"
              />
            </div>
            <div className="flex justify-between border-t border-white/20 px-5 py-3 md:px-10">
              <button
                type="button"
                onClick={() => move(-1)}
                className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-white"
              >
                <ArrowLeft size={18} aria-hidden="true" /> Previous
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-white"
              >
                Next <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
