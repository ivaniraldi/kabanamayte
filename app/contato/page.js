"use client"
import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { fadeIn } from "@/utils/animations"
import { Instagram, Facebook, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import GlassmorphicCard from "@/components/GlassmorphicCard"

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  })
  const [enviado, setEnviado] = useState(false)

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulação de envio
    setTimeout(() => {
      setEnviado(true)
      setFormData({
        nome: "",
        email: "",
        mensagem: "",
      })
    }, 1000)
  }

  return (
    <>
      {/* Hero com Parallax */}
      <section ref={ref} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <Image
            src="https://images.unsplash.com/photo-1444212477490-ca407925329e?q=80&w=2428&auto=format&fit=crop"
            alt="Contato"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-xl max-w-2xl mx-auto">Estamos aqui para ajudar você e nossos amigos de quatro patas</p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div variants={fadeIn("right", "tween", 0.2, 1)} initial="hidden" animate="show">
            <GlassmorphicCard className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-orange-600">Fale Conosco</h2>

              {enviado ? (
                <motion.div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-bold">Mensagem enviada!</p>
                  <p>Agradecemos seu contato. Responderemos em breve.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nome" className="block mb-2 font-medium">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block mb-2 font-medium">
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </GlassmorphicCard>
          </motion.div>

          <motion.div variants={fadeIn("left", "tween", 0.2, 1)} initial="hidden" animate="show">
            <GlassmorphicCard className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-orange-600">Outras Formas de Contato</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Redes Sociais</h3>
                  <div className="flex gap-4">
                    <Link
                      href="https://www.instagram.com/kabanamayte"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                    >
                      <Instagram size={20} />
                      Instagram
                    </Link>

                    <Link
                      href="#"
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                      <Facebook size={20} />
                      Facebook
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">WhatsApp</h3>
                  <Link
                    href="https://wa.me/5548988116036"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all inline-block"
                  >
                    <MessageSquare size={20} />
                    Iniciar Conversa
                  </Link>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Localização</h3>
                  <div className="rounded-lg overflow-hidden shadow-md h-64 bg-gray-200">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975886075113!2d-46.6522202!3d-23.5646162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzUyLjUiUyA0NsKwMzknMDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1620160000000!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Mapa da localização da ONG"
                    ></iframe>
                  </div>
                  <p className="mt-2 text-gray-600">Rua Exemplo, 123 - Bairro, Cidade - SP</p>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </div>
    </>
  )
}
