import { bookingConfig } from "@/lib/booking-config"

export const salonConfig = {
  name: "Forme Studio",
  description: "Haircuts, styling and care.",
  video: "https://res.cloudinary.com/douvlyzys/video/upload/v1792088765/12730569_3840_2160_60fps_irbpqc.mp4",
  poster: "/assets/salon-video-poster.webp",
  posterAlt: "Demonstration photograph of a stylist working in a salon",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Products", href: "/#products" },
    { label: "FAQ", href: "/#faq" },
  ],
  bookingUrl: bookingConfig.path,
} as const
