import ClientLayout from "./ClientLayout"
import { Schema } from "./Schema"

export const metadata = {
  title: "Kabanamayte - ONG de Resgate Animal",
  description:
    "Ajudamos a resgatar e cuidar de cachorros e outros animais em situação de rua. Adote, doe ou compre em nosso brechó solidário.",
  manifest: "/manifest.json",
  keywords: ["ONG", "animais", "adoção", "resgate animal", "cachorros", "gatos", "brechó solidário", "doação"],
  authors: [{ name: "Kabanamayte" }],
  openGraph: {
    title: "Kabanamayte - ONG de Resgate Animal",
    description:
      "Ajudamos a resgatar e cuidar de cachorros e outros animais em situação de rua. Adote, doe ou compre em nosso brechó solidário.",
    url: "https://kabanamayte.org",
    siteName: "Kabanamayte",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Kabanamayte - ONG de Resgate Animal",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kabanamayte - ONG de Resgate Animal",
    description:
      "Ajudamos a resgatar e cuidar de cachorros e outros animais em situação de rua. Adote, doe ou compre em nosso brechó solidário.",
    images: ["https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"],
  },
  alternates: {
    canonical: "https://kabanamayte.org",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <>
      <Schema />
      <ClientLayout>{children}</ClientLayout>
    </>
  )
}


import './globals.css'