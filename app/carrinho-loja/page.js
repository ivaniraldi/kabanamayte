"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLoja } from "@/contexts/LojaContext"
import { fadeIn } from "@/utils/animations"
import { Trash2, ArrowLeft } from "lucide-react"
import GlassmorphicCard from "@/components/GlassmorphicCard"

export default function CarrinhoLoja() {
  const { itens, removerItem, limparCarrinho } = useLoja()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
  })
  const [etapa, setEtapa] = useState("carrinho")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Preparar mensagem para WhatsApp
    let mensagem = `*Nova Compra - Brechó Kabanamayte*\n\n`
    mensagem += `*Nome:* ${formData.nome}\n`
    mensagem += `*Email:* ${formData.email}\n`
    mensagem += `*Telefone:* ${formData.telefone}\n`
    mensagem += `*Endereço:* ${formData.endereco}, ${formData.cidade}/${formData.estado} - CEP: ${formData.cep}\n\n`
    mensagem += `*Itens Comprados:*\n`

    itens.forEach((item) => {
      mensagem += `- ${item.nome} (${item.quantidade}x): R$ ${(item.valor * item.quantidade).toFixed(2).replace(".", ",")}\n`
    })

    mensagem += `\n*Subtotal:* R$ ${total.toFixed(2).replace(".", ",")}\n`
    mensagem += `*Frete:* R$ ${frete.toFixed(2).replace(".", ",")}\n`
    mensagem += `*Total da Compra:* R$ ${totalComFrete.toFixed(2).replace(".", ",")}`

    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem)

    // Abrir WhatsApp em nova aba
    window.open(`https://wa.me/5548988116036?text=${mensagemCodificada}`, "_blank")

    // Continuar com o fluxo normal
    setEtapa("agradecimento")
    limparCarrinho()
  }

  const total = itens.reduce((acc, item) => acc + item.valor * item.quantidade, 0)
  const frete = total > 0 ? 15.9 : 0
  const totalComFrete = total + frete

  if (etapa === "agradecimento") {
    return (
      <motion.div
        className="container mx-auto px-4 py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-green-600 mb-4">Compra Realizada!</h1>
          <p className="text-lg mb-6">
            Sua compra foi realizada com sucesso! Obrigado por apoiar nossa causa. Todo o valor será revertido para o
            cuidado dos animais.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/" className="btn-secondary">
              Voltar ao Início
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Compra na Loja Solidária Kabanamayte",
                    text: "Acabei de comprar na loja solidária da ONG Kabanamayte! Confira você também!",
                  })
                }
              }}
              className="btn-primary"
            >
              Compartilhar
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Carrinho de Compras
      </motion.h1>

      {itens.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl mb-6">Seu carrinho está vazio.</p>
          <Link href="/loja" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={20} />
            Voltar para Loja
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            variants={fadeIn("right", "tween", 0.2, 1)}
            initial="hidden"
            animate="show"
          >
            <GlassmorphicCard>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Itens do Carrinho</h2>

                <div className="divide-y">
                  {itens.map((item) => (
                    <div key={item.id} className="py-4 flex items-center">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={item.imagem || "/placeholder.svg"}
                          alt={item.nome}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.nome}</h3>
                        <p className="text-gray-600">
                          R$ {item.valor.toFixed(2).replace(".", ",")} x {item.quantidade}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">R$ {(item.valor * item.quantidade).toFixed(2).replace(".", ",")}</p>
                        <button onClick={() => removerItem(item.id)} className="text-red-500 hover:text-red-700 mt-1">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-bold">R$ {total.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Frete:</span>
                    <span className="font-bold">R$ {frete.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t mt-2">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold text-green-600">
                      R$ {totalComFrete.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            variants={fadeIn("left", "tween", 0.2, 1)}
            initial="hidden"
            animate="show"
          >
            <GlassmorphicCard>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Dados de Entrega</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nome" className="block mb-1 font-medium">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block mb-1 font-medium">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone" className="block mb-1 font-medium">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="endereco" className="block mb-1 font-medium">
                      Endereço
                    </label>
                    <input
                      type="text"
                      id="endereco"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cidade" className="block mb-1 font-medium">
                        Cidade
                      </label>
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="estado" className="block mb-1 font-medium">
                        Estado
                      </label>
                      <input
                        type="text"
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cep" className="block mb-1 font-medium">
                      CEP
                    </label>
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="btn-primary w-full">
                      Finalizar Compra
                    </button>
                  </div>
                </form>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      )}
    </div>
  )
}
