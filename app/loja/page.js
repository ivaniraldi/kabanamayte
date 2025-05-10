"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useLoja } from "@/contexts/LojaContext"
import { fadeIn, staggerContainer } from "@/utils/animations"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function Loja() {
  const { adicionarItem, itens } = useLoja()
  const [quantidadeTotal, setQuantidadeTotal] = useState(0)

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  useEffect(() => {
    const total = itens.reduce((acc, item) => acc + item.quantidade, 0)
    setQuantidadeTotal(total)
  }, [itens])

  const produtos = [
    {
      id: 1,
      nome: "Camiseta Vintage",
      descricao: "Camiseta usada em ótimo estado, tamanho M.",
      valor: 29.9,
      imagem: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=627&auto=format&fit=crop",
      estado: "Seminovo",
      tamanho: "M",
    },
    {
      id: 2,
      nome: "Calça Jeans",
      descricao: "Calça jeans usada, modelo reto, tamanho 40.",
      valor: 49.9,
      imagem: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop",
      estado: "Bom",
      tamanho: "40",
    },
    {
      id: 3,
      nome: "Vestido Floral",
      descricao: "Vestido estampado, pouco usado, tamanho P.",
      valor: 39.9,
      imagem: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1974&auto=format&fit=crop",
      estado: "Ótimo",
      tamanho: "P",
    },
    {
      id: 4,
      nome: "Moletom Unissex",
      descricao: "Moletom cinza básico, tamanho G.",
      valor: 45.9,
      imagem: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop",
      estado: "Seminovo",
      tamanho: "G",
    },
    {
      id: 5,
      nome: "Sapato Social",
      descricao: "Sapato social preto, número 42, pouco uso.",
      valor: 59.9,
      imagem: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1974&auto=format&fit=crop",
      estado: "Bom",
      tamanho: "42",
    },
    {
      id: 6,
      nome: "Bolsa de Couro",
      descricao: "Bolsa de couro marrom, usada mas bem conservada.",
      valor: 69.9,
      imagem: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2076&auto=format&fit=crop",
      estado: "Usado",
      tamanho: "Único",
    },
    {
      id: 7,
      nome: "Camisa Social",
      descricao: "Camisa social branca, tamanho 3.",
      valor: 35.9,
      imagem: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1925&auto=format&fit=crop",
      estado: "Bom",
      tamanho: "3",
    },
    {
      id: 8,
      nome: "Shorts Jeans",
      descricao: "Shorts jeans feminino, tamanho 38.",
      valor: 29.9,
      imagem: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2070&auto=format&fit=crop",
      estado: "Usado",
      tamanho: "38",
    },
    {
      id: 9,
      nome: "Tênis Casual",
      descricao: "Tênis casual preto, número 39, pouco uso.",
      valor: 49.9,
      imagem: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
      estado: "Seminovo",
      tamanho: "39",
    },
  ]

  return (
    <>
      {/* Hero com Parallax */}
      <section ref={ref} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <Image
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop"
            alt="Brechó solidário"
            fill
            className="object-cover brightness-50"
            priority
          />
        </motion.div>
        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Brechó Solidário</h1>
          <p className="text-xl max-w-2xl mx-auto">Moda consciente que ajuda a salvar vidas</p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <motion.p
          className="text-center max-w-2xl mx-auto mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Roupas e acessórios de segunda mão com preços acessíveis. Todo o valor arrecadado é revertido para o cuidado
          dos animais. Compre consciente, ajude os animais e o planeta!
        </motion.p>

        <div className="flex justify-end mb-6">
          <Link href="/carrinho-loja" className="relative inline-flex items-center gap-2 btn-secondary">
            <ShoppingCart size={20} />
            Carrinho de Compras
            {quantidadeTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {quantidadeTotal}
              </span>
            )}
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {produtos.map((produto, index) => (
            <motion.div
              key={produto.id}
              className="card overflow-hidden"
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            >
              <div className="p-4 flex justify-center bg-white">
                <Image
                  src={produto.imagem || "/placeholder.svg"}
                  alt={produto.nome}
                  width={150}
                  height={150}
                  className="object-contain h-40"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-orange-600">{produto.nome}</h3>
                <div className="flex gap-2 mb-3">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">{produto.estado}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Tam: {produto.tamanho}
                  </span>
                </div>
                <p className="mb-4 text-gray-600">{produto.descricao}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    R$ {produto.valor.toFixed(2).replace(".", ",")}
                  </span>
                  <button
                    onClick={() =>
                      adicionarItem({
                        id: produto.id,
                        nome: produto.nome,
                        valor: produto.valor,
                        imagem: produto.imagem,
                        tipo: "produto",
                        tamanho: produto.tamanho,
                      })
                    }
                    className="btn-primary"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
