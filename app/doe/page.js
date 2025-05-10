"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useCarrinho } from "@/contexts/CarrinhoContext"
import { fadeIn, staggerContainer } from "@/utils/animations"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function Doe() {
  const { adicionarItem, itens } = useCarrinho()
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

  const doacoes = [
    {
      id: 1,
      nome: "Saco de Ração Premium",
      descricao: "Ração de alta qualidade para alimentar nossos animais por uma semana.",
      valor: 89.9,
      imagem: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?q=80&w=1173&auto=format&fit=crop",
    },
    {
      id: 2,
      nome: "Caminha Premium",
      descricao: "Uma caminha confortável e quentinha para os animais descansarem.",
      valor: 129.9,
      imagem: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      nome: "Kit de Vacinas",
      descricao: "Kit completo de vacinas para garantir a saúde dos nossos animais.",
      valor: 199.9,
      imagem: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop",
    },
    {
      id: 4,
      nome: "Banho + Tosa",
      descricao: "Serviço de banho e tosa para manter nossos animais limpos e saudáveis.",
      valor: 79.9,
      imagem: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1171&auto=format&fit=crop",
    },
    {
      id: 5,
      nome: "Ajuda Mensal",
      descricao: "Contribuição mensal para ajudar com os custos de manutenção do abrigo.",
      valor: 49.9,
      imagem: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop",
    },
  ]

  return (
    <>
      {/* Hero com Parallax */}
      <section ref={ref} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <Image
            src="https://images.unsplash.com/photo-1415369629372-26f2fe60c467?q=80&w=2487&auto=format&fit=crop"
            alt="Doações para animais da ONG Kabanamayte"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
        <motion.div
          className="relative z-20 text-center text-white px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow">Faça uma Doação</h1>
          <p className="text-xl max-w-2xl mx-auto text-shadow">
            Sua ajuda é fundamental para continuarmos nosso trabalho
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-16 gradient-bg-cream rounded-t-3xl -mt-10 relative z-10">
        <motion.p
          className="text-center max-w-2xl mx-auto mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Sua contribuição é fundamental para mantermos nosso trabalho. Escolha abaixo como você deseja ajudar os
          animais da Kabanamayte.
        </motion.p>

        <div className="flex justify-end mb-6">
          <Link href="/carrinho-solidario" className="relative inline-flex items-center gap-2 btn-secondary">
            <ShoppingBag size={20} />
            Carrinho Solidário
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
          {doacoes.map((doacao, index) => (
            <motion.div
              key={doacao.id}
              className="glassmorphism overflow-hidden rounded-xl"
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            >
              <div className="p-4 flex justify-center">
                <Image
                  src={doacao.imagem || "/placeholder.svg"}
                  alt={doacao.nome}
                  width={150}
                  height={150}
                  className="object-contain h-40"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gradient">{doacao.nome}</h3>
                <p className="mb-4 text-gray-600">{doacao.descricao}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    R$ {doacao.valor.toFixed(2).replace(".", ",")}
                  </span>
                  <button
                    onClick={() =>
                      adicionarItem({
                        id: doacao.id,
                        nome: doacao.nome,
                        valor: doacao.valor,
                        imagem: doacao.imagem,
                        tipo: "doacao",
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
