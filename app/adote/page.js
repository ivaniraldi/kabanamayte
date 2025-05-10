"use client"
import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { fadeIn, staggerContainer } from "@/utils/animations"
import PetModal from "@/components/PetModal"

export default function Adote() {
  const [selectedPet, setSelectedPet] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  const pets = [
    {
      id: 1,
      nome: "Rex",
      idade: "2 anos",
      porte: "Médio",
      descricao: "Rex é um cachorro muito brincalhão e carinhoso. Ele adora passear e brincar com bolinhas.",
      imagem: "https://images.unsplash.com/photo-1583511655826-05700442b31b?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 2,
      nome: "Luna",
      idade: "1 ano",
      porte: "Pequeno",
      descricao: "Luna é uma cachorrinha dócil e tranquila. Ela se dá bem com crianças e outros animais.",
      imagem: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=1935&auto=format&fit=crop",
    },
    {
      id: 3,
      nome: "Thor",
      idade: "3 anos",
      porte: "Grande",
      descricao: "Thor é um cachorro forte e protetor. Ele é muito leal e gosta de fazer exercícios.",
      imagem: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      nome: "Mia",
      idade: "6 meses",
      porte: "Pequeno",
      descricao: "Mia é uma gatinha muito curiosa e brincalhona. Ela adora brincar com bolinhas de papel.",
      imagem: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
    },
    {
      id: 5,
      nome: "Bob",
      idade: "4 anos",
      porte: "Médio",
      descricao: "Bob é um cachorro calmo e obediente. Ele já está treinado e adora fazer companhia.",
      imagem: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 6,
      nome: "Nina",
      idade: "2 anos",
      porte: "Médio",
      descricao: "Nina é uma cachorra muito amorosa. Ela adora carinho e é ótima companheira.",
      imagem: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop",
    },
  ]

  const openModal = (pet) => {
    setSelectedPet(pet)
    setIsModalOpen(true)
  }

  return (
    <>
      {/* Hero com Parallax */}
      <section ref={ref} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <Image
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop"
            alt="Animais para adoção na ONG Kabanamayte"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow">Adote um Pet</h1>
          <p className="text-xl max-w-2xl mx-auto text-shadow">
            Encontre um novo amigo e transforme duas vidas: a dele e a sua
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
          Conheça nossos amiguinhos que estão à procura de um lar amoroso. Todos os animais são vacinados, castrados e
          estão prontos para fazer parte da sua família.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              className="glassmorphism overflow-hidden rounded-xl transform hover:scale-105 transition-all duration-300"
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            >
              <div className="relative h-64">
                <Image
                  src={pet.imagem || "/placeholder.svg"}
                  alt={`${pet.nome} - animal para adoção na ONG Kabanamayte`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-xl font-bold text-white">{pet.nome}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="bg-orange-400/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs">
                        {pet.idade}
                      </span>
                      <span className="bg-green-400/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs">
                        Porte {pet.porte}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-600 line-clamp-2">{pet.descricao}</p>
                <button onClick={() => openModal(pet)} className="btn-primary w-full">
                  Quero Adotar
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {isModalOpen && selectedPet && (
          <PetModal pet={selectedPet} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </>
  )
}
