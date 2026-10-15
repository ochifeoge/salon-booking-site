/** Replace illustrative copy and imagery with each studio's verified content. */
export const inspiration = [
  {
    id: "natural-curls",
    title: "Natural shape",
    image: "/assets/curly-hair-portrait.webp",
    alt: "Portrait showing defined natural curls framing the face",
    position: "object-[50%_38%]",
  },
  {
    id: "cornrow-detail",
    title: "Braided detail",
    image: "/assets/cornrow-braids.webp",
    alt: "Close view of a neat cornrow braid pattern",
    position: "object-[50%_42%]",
  },
  {
    id: "texture-care",
    title: "Texture in motion",
    image: "/assets/salon-hair-treatment.webp",
    alt: "Stylist working through natural textured hair",
    position: "object-[50%_48%]",
  },
] as const

export const products = [
  {
    id: "daily-care",
    name: "Daily care",
    description: "A simple starting point for a considered haircare routine.",
    image: "/assets/haircare-pump-bottles.webp",
    alt: "Pump bottles photographed as illustrative haircare products",
    position: "object-center",
    price: null,
  },
  {
    id: "wash-day",
    name: "Wash day",
    description: "Make space for the care your hair needs between visits.",
    image: "/assets/shower-haircare.webp",
    alt: "Haircare bottles arranged in a shower setting",
    position: "object-center",
    price: null,
  },
] as const

export const faqs = [
  {
    id: "preparation",
    question: "How should I prepare for my appointment?",
    answer:
      "Preparation depends on the service you choose. Please confirm wash, detangling, and arrival requirements with the studio before your visit.",
  },
  {
    id: "extension-hair",
    question: "Do I need to bring extension hair?",
    answer:
      "Whether extension hair is included or needs to be brought in has not been confirmed. Ask the studio about the exact hair type, colour, and quantity before booking a protective style.",
  },
  {
    id: "consultation",
    question: "Can I discuss my look before booking?",
    answer:
      "Consultation availability and format are still to be confirmed by the studio. You can review the service menu before starting a booking.",
  },
  {
    id: "deposits",
    question: "Is a deposit required?",
    answer:
      "The studio's deposit policy has not been provided. Please check the booking details or confirm directly with the studio before paying anything.",
  },
  {
    id: "rescheduling",
    question: "Can I reschedule?",
    answer:
      "Rescheduling terms have not been confirmed. Check the policy shown during booking or contact the studio for the applicable process and timing.",
  },
  {
    id: "cancellation",
    question: "What if I need to cancel?",
    answer:
      "Cancellation terms, deadlines, and any fees must be confirmed by the studio. Refer to the policy presented during booking.",
  },
] as const

export const studioDetails: {
  address: string | null
  hours: readonly { day: string; time: string }[]
  phone: string | null
  email: string | null
  social: readonly { label: string; href: string }[]
} = {
  address: null,
  hours: [],
  phone: null,
  email: null,
  social: [],
}
