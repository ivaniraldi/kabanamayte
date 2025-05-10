import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-orange-50 to-orange-100 pt-16 pb-6 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="relative w-10 h-10 mr-2">
                <Image
                  src="https://i.imgur.com/xCkIw7H.jpeg"
                  alt="Kabanamayte Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                />
              </div>
              <span className="font-bold text-xl text-orange-600">Kabanamayte</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Transformando vidas animais desde 2018. Resgate, cuidado e adoção responsável.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/kabanamayte"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Kabanamayte"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                <Instagram size={20} />
              </Link>
              {/* <Link
                href="#"
                aria-label="Facebook da Kabanamayte"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                <Facebook size={20} />
              </Link> */}
              {/* <Link
                href="#"
                aria-label="Twitter da Kabanamayte"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white hover:from-sky-500 hover:to-sky-600 transition-all"
              >
                <Twitter size={20} />
              </Link> */}
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-gradient">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-orange-500 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-600 hover:text-orange-500 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                  Sobre Nós
                </Link>
              </li>
              {/* <li>
                <Link href="/adote" className="text-gray-600 hover:text-orange-500 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                  Adote um Pet
                </Link>
              </li> */}
              <li>
                <Link href="/doe" className="text-gray-600 hover:text-orange-500 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                  Faça uma Doação
                </Link>
              </li>
              {/* <li>
                <Link href="/loja" className="text-gray-600 hover:text-orange-500 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                  Loja Solidária
                </Link>
              </li> */}
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-orange-500 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-gradient">Informações</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-orange-500 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-orange-500 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-orange-500 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-orange-500 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div> */}

          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-gradient">Contato</h3>
            <address className="not-italic text-sm text-gray-600 space-y-2">
              <p className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                Rua Exemplo, 123
              </p>
              <p className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                Bairro, Cidade - SP
              </p>
              <p className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                CEP: 00000-000
              </p>
              <p className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                contato@kabanamayte.org
              </p>
              <p className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
                (48) 98811-6036
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Kabanamayte. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-600">
            <Link href="https://www.webrushbrasil.com.br/" target="_blank" className="text-orange-500 hover:text-orange-600 transition-colors">
              Site desenvolvido com ♥ por WebRush Brasil 
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
