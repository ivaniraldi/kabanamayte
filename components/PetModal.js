"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

export default function PetModal({ pet, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cidade: "",
    motivo: "",
  })
  const [enviado, setEnviado] = useState(false)

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
    }, 1000)
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200/50">
              <h2 className="text-2xl font-bold text-gradient">{pet.nome}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 bg-white/50 hover:bg-white/80 rounded-full p-1 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="rounded-lg overflow-hidden mb-4 shadow-lg">
                    <Image
                      src={pet.imagem || "/placeholder.svg"}
                      alt={`${pet.nome} - animal para adoção na ONG Kabanamayte`}
                      width={400}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="flex gap-4 mb-4">
                    <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm shadow-sm">
                      {pet.idade}
                    </span>
                    <span className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-sm shadow-sm">
                      Porte {pet.porte}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-gradient">Sobre {pet.nome}</h3>
                  <p className="text-gray-600 mb-4">{pet.descricao}</p>

                  <div className="glassmorphism p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gradient">Informações Adicionais</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                        Vacinado
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                        Castrado
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                        Vermifugado
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                        Microchipado
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gradient">Quero Adotar {pet.nome}</h3>

                  {enviado ? (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                      <p className="font-bold">Solicitação enviada!</p>
                      <p>
                        Agradecemos seu interesse em adotar {pet.nome}. Entraremos em contato em breve para dar
                        continuidade ao processo de adoção.
                      </p>
                    </div>
                  ) : (
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
                          className="w-full px-3 py-2 border border-gray-300/50 bg-white/50 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>

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
                          className="w-full px-3 py-2 border border-gray-300/50 bg-white/50 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="cidade" className="block mb-1 font-medium">
                          Cidade/Estado
                        </label>
                        <input
                          type="text"
                          id="cidade"
                          name="cidade"
                          value={formData.cidade}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300/50 bg-white/50 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="motivo" className="block mb-1 font-medium">
                          Por que você quer adotar {pet.nome}?
                        </label>
                        <textarea
                          id="motivo"
                          name="motivo"
                          value={formData.motivo}
                          onChange={handleChange}
                          required
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300/50 bg-white/50 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        ></textarea>
                      </div>

                      <button type="submit" className="btn-primary w-full">
                        Enviar Solicitação
                      </button>
                    </form>
                  )}

                  <div className="mt-6 glassmorphism p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gradient">Processo de Adoção</h4>
                    <ol className="space-y-1">
                      {[
                        "Preenchimento do formulário",
                        "Entrevista com nossa equipe",
                        "Visita ao abrigo para conhecer o animal",
                        "Assinatura do termo de adoção",
                        "Acompanhamento pós-adoção",
                      ].map((step, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
