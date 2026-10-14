import { bookingConfig } from "@/lib/booking-config"

export const salonConfig = {
  name: "Forme Studio",
  description: "Haircuts, styling and care.",
  video: "/assets/hero.mp4",
  poster: "/assets/salon-video-poster.webp",
  posterAlt: "Demonstration photograph of a stylist working in a salon",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
  ],
  bookingUrl: bookingConfig.path,
} as const
