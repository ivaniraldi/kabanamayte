"use client"
import { createContext, useContext, useState, useEffect } from "react"

const CarrinhoContext = createContext()

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([])

  // Carregar itens do localStorage quando o componente montar
  useEffect(() => {
    const itensArmazenados = localStorage.getItem("carrinho-doacoes")
    if (itensArmazenados) {
      setItens(JSON.parse(itensArmazenados))
    }
  }, [])

  // Salvar itens no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem("carrinho-doacoes", JSON.stringify(itens))
  }, [itens])

  const adicionarItem = (item) => {
    setItens((prevItens) => {
      const itemExistente = prevItens.find((i) => i.id === item.id)

      if (itemExistente) {
        return prevItens.map((i) => (i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i))
      } else {
        return [...prevItens, { ...item, quantidade: 1 }]
      }
    })
  }

  const removerItem = (id) => {
    setItens((prevItens) => prevItens.filter((item) => item.id !== id))
  }

  const limparCarrinho = () => {
    setItens([])
  }

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  return useContext(CarrinhoContext)
}
