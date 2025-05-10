"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CarrinhoProvider } from "@/contexts/CarrinhoContext"
import { LojaProvider } from "@/contexts/LojaContext"
import { AnimatePresence } from "framer-motion"
import { IgProvider } from "@/contexts/AccountContext"
import { Schema } from "./Schema"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <Schema />
      </head>
      <body className={`${inter.className} bg-cream min-h-screen flex flex-col`}>
        <LojaProvider>
          <CarrinhoProvider>
            <IgProvider>

            <Header />
            <AnimatePresence mode="wait">
              <main className="flex-grow">{children}</main>
            </AnimatePresence>
            <Footer />
            </IgProvider>
          </CarrinhoProvider>
        </LojaProvider>
      </body>
    </html>
  )
}
