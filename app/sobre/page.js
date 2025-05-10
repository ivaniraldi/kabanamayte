"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { fadeIn, staggerContainer } from "@/utils/animations"
import GlassmorphicCard from "@/components/GlassmorphicCard"

export default function Sobre() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  const frasesRef = useRef(null)
  const { scrollYProgress: frasesScrollProgress } = useScroll({
    target: frasesRef,
    offset: ["start end", "end start"],
  })

  const frasesY = useTransform(frasesScrollProgress, [0, 1], [0, 100])

  return (
    <>
      {/* Hero com Parallax */}
      <section ref={ref} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <Image
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop"
            alt="Animais resgatados"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre a Kabanamayte</h1>
          <p className="text-xl max-w-2xl mx-auto">Conheça nossa história e o trabalho que realizamos pelos animais</p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* História da ONG */}
        <motion.section
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div className="md:w-1/2" variants={fadeIn("right", "tween", 0.2, 1)}>
              <GlassmorphicCard className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-orange-600">Nossa História</h2>
                <p className="mb-4">
                  A Kabanamayte nasceu do amor incondicional de nossa fundadora pelos animais em situação de
                  vulnerabilidade. Tudo começou quando ela resgatou seu primeiro cachorro abandonado em 2018, e percebeu
                  que poderia fazer muito mais.
                </p>
                <p className="mb-4">
                  O que começou como um pequeno abrigo improvisado em seu quintal, hoje se tornou uma organização
                  reconhecida que já salvou centenas de vidas e transformou a realidade de muitos animais abandonados.
                </p>
                <p>
                  Nosso nome, "Kabanamayte", representa o abrigo e a amizade que oferecemos a cada animal que passa por
                  nossas portas.
                </p>
              </GlassmorphicCard>
            </motion.div>
            <motion.div className="md:w-1/2" variants={fadeIn("left", "tween", 0.2, 1)}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=1170&auto=format&fit=crop"
                  alt="Fundadora da ONG Kabanamayte"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Frases emocionais com Parallax */}
        <motion.section
          ref={frasesRef}
          className="relative my-16 py-16 overflow-hidden rounded-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div className="absolute inset-0 z-0" style={{ y: frasesY }}>
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
              alt="Fundo de frase"
              fill
              className="object-cover brightness-50"
            />
          </motion.div>
          <blockquote className="text-center relative z-10">
            <p className="text-2xl md:text-3xl italic font-light text-white mb-6">
              "Cada animal resgatado é uma história de superação. Cada adoção é um novo capítulo de amor."
            </p>
            <cite className="text-lg font-medium text-white">— Maria Silva, Fundadora</cite>
          </blockquote>
        </motion.section>

        {/* Fotos do trabalho */}
        <motion.section
          className="my-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-orange-600">Nosso Trabalho</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1374&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=1170&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1169&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=1170&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop",
            ].map((src, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden shadow-md"
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Trabalho da ONG ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Diferenciais */}
        <motion.section
          className="my-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-orange-600">Nossos Diferenciais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn("up", "spring", 0.2, 1)}>
              <GlassmorphicCard className="p-6 h-full">
                <h3 className="text-xl font-bold mb-3 text-green-600">Cuidado Personalizado</h3>
                <p>Cada animal recebe atenção individual e um plano de cuidados específico para suas necessidades.</p>
              </GlassmorphicCard>
            </motion.div>

            <motion.div variants={fadeIn("up", "spring", 0.4, 1)}>
              <GlassmorphicCard className="p-6 h-full">
                <h3 className="text-xl font-bold mb-3 text-green-600">Acompanhamento Pós-adoção</h3>
                <p>Mantemos contato com as famílias adotantes para garantir que os animais estejam bem adaptados.</p>
              </GlassmorphicCard>
            </motion.div>

            <motion.div variants={fadeIn("up", "spring", 0.6, 1)}>
              <GlassmorphicCard className="p-6 h-full">
                <h3 className="text-xl font-bold mb-3 text-green-600">Educação e Conscientização</h3>
                <p>
                  Promovemos palestras e eventos para conscientizar a comunidade sobre a importância da adoção
                  responsável.
                </p>
              </GlassmorphicCard>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  )
}
