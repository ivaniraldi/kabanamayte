"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { fadeIn, staggerContainer } from "@/utils/animations"
import { useIg } from "@/contexts/AccountContext"

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  const brechoRef = useRef(null)
  const { scrollYProgress: brechoScrollProgress } = useScroll({
    target: brechoRef,
    offset: ["start end", "end start"],
  })

  const brechoY = useTransform(brechoScrollProgress, [0, 1], [0, 150])

  const instaRef = useRef(null)
  const { scrollYProgress: instaScrollProgress } = useScroll({
    target: instaRef,
    offset: ["start end", "end start"],
  })
 const { data } = useIg()
  const instaY = useTransform(instaScrollProgress, [0, 1], [0, 100])

  console.log(data.instagram)

  return (
    <>
      {/* Banner Principal com Parallax */}
      <section ref={ref} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
            alt="Cachorros resgatados pela ONG Kabanamayte"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
        <motion.div
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow">Ajude a transformar vidas</h1>
          <p className="text-xl md:text-2xl mb-8 text-shadow max-w-2xl mx-auto">
            Cada animal merece uma segunda chance. Junte-se a nós nessa missão de amor e cuidado.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/doe" className="btn-primary text-lg px-8 py-3">
              Quero Ajudar
            </Link>
            <Link
              href="/adote"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Adotar um Pet
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Destaques */}
      <motion.section
        className="container-custom gradient-bg-cream"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <h2 className="section-title">Nosso Impacto</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div className="glassmorphism p-8 text-center rounded-2xl" variants={fadeIn("up", "spring", 0.2, 1)}>
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              250+
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gradient">Animais Resgatados</h3>
            <p className="text-gray-700">Já resgatamos e cuidamos de mais de 250 animais em situação de rua</p>
          </motion.div>

          <motion.div className="glassmorphism p-8 text-center rounded-2xl" variants={fadeIn("up", "spring", 0.4, 1)}>
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              180+
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gradient">Adoções Realizadas</h3>
            <p className="text-gray-700">Mais de 180 animais encontraram um novo lar cheio de amor</p>
          </motion.div>

          <motion.div className="glassmorphism p-8 text-center rounded-2xl" variants={fadeIn("up", "spring", 0.6, 1)}>
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
              5 anos
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gradient">De História</h3>
            <p className="text-gray-700">Trabalhando incansavelmente pelo bem-estar animal</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Brechó Solidário com Parallax */}
      <motion.section
        ref={brechoRef}
        className="relative py-32 overflow-hidden"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: brechoY }}>
          <Image
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop"
            alt="Brechó solidário da ONG Kabanamayte"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <h2 className="section-title text-white">Brechó Solidário</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={fadeIn("right", "tween", 0.2, 1)}
              className="glassmorphism-dark p-8 rounded-2xl text-white"
            >
              <h3 className="text-2xl font-bold mb-4 text-orange-300">Moda Consciente que Salva Vidas</h3>
              <p className="mb-4">
                Nosso brechó solidário oferece roupas e acessórios de segunda mão em ótimo estado e com preços
                acessíveis. Cada compra que você faz ajuda diretamente no resgate e cuidado dos animais.
              </p>
              <p className="mb-6">
                Além de ajudar os animais, você também contribui para um consumo mais consciente e sustentável!
              </p>
              <Link href="/loja" className="btn-secondary inline-block">
                Visite nosso Brechó
              </Link>
            </motion.div>

            <motion.div variants={fadeIn("left", "tween", 0.2, 1)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=627&auto=format&fit=crop"
                    alt="Camiseta do Brechó Solidário Kabanamayte"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop"
                    alt="Roupa do Brechó Solidário Kabanamayte"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop"
                    alt="Calça do Brechó Solidário Kabanamayte"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2005&auto=format&fit=crop"
                    alt="Acessório do Brechó Solidário Kabanamayte"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Chamada para Instagram com Parallax */}
      <section ref={instaRef} className="relative py-24 overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: instaY }}>

        </motion.div>
 
        <div className="container mx-auto px-4 text-center relative z-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black text-shadow">Acompanhe nosso trabalho</h2>
          <Link
            href="https://www.instagram.com/kabanamayte"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <Instagram size={24} />
            @kabanamayte
          </Link>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1169&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1374&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=1170&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop",
            ].map((src, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Foto de animal resgatado pela ONG Kabanamayte ${index + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                    <p className="text-white text-sm font-medium">Ver no Instagram</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
