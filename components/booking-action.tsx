import Link from "next/link"

type Props = {
  href: string
  compact?: boolean
  fullWidth?: boolean
  variant?: "dark" | "light" | "accent"
  service?: string
}

export function BookingAction({
  href,
  compact = false,
  fullWidth = false,
  variant = "dark",
  service,
}: Props) {
  const label = compact ? "Book" : "Book an appointment"
  const classes = [
    "inline-flex h-12 min-w-12 items-center justify-center rounded-sm px-5 text-center text-sm font-semibold transition-[background-color,color,transform] duration-150 ease-out active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-4",
    variant === "light"
      ? "bg-white text-brand-ink hover:bg-brand-surface"
      : variant === "accent"
        ? "bg-brand-accent text-white hover:bg-brand-ink"
        : "bg-brand-ink text-white hover:bg-neutral-700",
    fullWidth ? "w-full md:w-auto md:min-w-54" : "",
  ].join(" ")

  return (
    <Link
      href={href}
      className={classes}
      aria-label={service ? "Book " + service : "Book an appointment"}
    >
      {label}
    </Link>
  )
}
