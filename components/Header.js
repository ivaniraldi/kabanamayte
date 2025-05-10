"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingBag, ShoppingCart } from "lucide-react"
import { useCarrinho } from "@/contexts/CarrinhoContext"
import { useLoja } from "@/contexts/LojaContext"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { itens: itensDoacoes } = useCarrinho()
  const { itens: itensLoja } = useLoja()
  const pathname = usePathname()

  const totalDoacoes = itensDoacoes.reduce((acc, item) => acc + item.quantidade, 0)
  const totalLoja = itensLoja.reduce((acc, item) => acc + item.quantidade, 0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Fechar o menu quando mudar de página
    setIsMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre" },
    // { href: "/adote", label: "Adote" },
    { href: "/doe", label: "Doe" },
    // { href: "/loja", label: "Loja" },
    { href: "/contato", label: "Contato" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glassmorphism py-2" : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-10 h-10 mr-2">
            <Image
              src="https://i.imgur.com/xCkIw7H.jpeg"
              alt="Kabanamayte Logo"
              width={40}
              height={40}
              className="object-contain rounded-full"
            />
          </div>
          <span className={`font-bold text-xl ${isScrolled ? "text-orange-600" : "text-white"}`}>Kabanamayte</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium hover:text-orange-500 transition-colors ${
                pathname === link.href ? "text-orange-500" : isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/carrinho-solidario" className="relative">
            <ShoppingBag
              className={`h-6 w-6 hover:text-orange-500 transition-colors ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            />
            {totalDoacoes > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalDoacoes}
              </span>
            )}
          </Link>

          {/* <Link href="/carrinho-loja" className="relative">
            <ShoppingCart
              className={`h-6 w-6 hover:text-orange-500 transition-colors ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            />
            {totalLoja > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalLoja}
              </span>
            )}
          </Link> */}

          <Link href="/doe" className="btn-primary">
            Quero Ajudar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Link href="/carrinho-solidario" className="relative">
            <ShoppingBag className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"}`} />
            {totalDoacoes > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalDoacoes}
              </span>
            )}
          </Link>

          {/* <Link href="/carrinho-loja" className="relative">
            <ShoppingCart className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"}`} />
            {totalLoja > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalLoja}
              </span>
            )}
          </Link> */}

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={isScrolled ? "text-gray-700" : "text-white"}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glassmorphism border-t"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium py-2 ${pathname === link.href ? "text-orange-500" : "text-gray-700"}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/doe" className="btn-primary text-center mt-4">
                Quero Ajudar
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
