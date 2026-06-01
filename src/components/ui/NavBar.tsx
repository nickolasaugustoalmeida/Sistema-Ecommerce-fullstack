//import { useState } from "react";
import { ShoppingCart } from "lucide-react";


function Navbar() {

  //const [menuAberto, setMenuAberto] = useState(false); -> Hook para implementação de menu mobile

  return (
    /*
      No React, usamos className no lugar de class.

      Aqui estamos usando Tailwind CSS.
      Tailwind funciona com classes pequenas, e cada classe faz uma coisa.

      flex             -> coloca os elementos lado a lado
      justify-between  -> coloca o primeiro item na esquerda e o segundo na direita
      p-4              -> adiciona espaco interno em todos os lados
      bg-black         -> deixa o fundo preto
      text-white       -> deixa o texto branco
    */
    <header className="flex justify-between p-4 bg-white text-black shadow-md">
      {/*
        Este link funciona como a logo da loja.

        text-xl    -> aumenta um pouco o tamanho do texto
        font-bold  -> deixa o texto em negrito
      */}
      <a href="#" className="text-xl font-bold">
        Minha Loja
      </a>

      {/*
        A tag nav representa uma area de navegacao.

        flex   -> deixa os links um ao lado do outro
        gap-4  -> coloca espaco entre os links
      */}
      {/* {menuAberto && ( -> para implementar menu mobile */}
      <nav className="flex gap-5">
        
        <a href="#home">Inicio</a>
        <a href="#produtos">Produtos</a>
        <a href="#crud-produtos">Gerenciamento de produtos</a>
        <a href="#sobre">Sobre</a>
        <a href="#acesso">Acesso</a>
      </nav>

        <button className="shadow-lg bg-black flex items-center gap-2 px-4 py-2 rounded text-white transition hover:scale-105 hover:bg-slate-900 hover:shadow-slate-300">
          <ShoppingCart size={22} />
          <span>Carrinho</span>
        </button>

      {/*)} -> implementação botão*/}
      {/*<button  //onClick={() => setMenuAberto(!menuAberto)} --> implementação futura do botão
        className="group flex flex-col gap-1 rounded p-2 transition  hover:shadow">

 <span className="block h-1 w-6 bg-black transition group-hover:bg-slate-700"></span>
  <span className="block h-1 w-6 bg-black transition group-hover:bg-slate-700"></span>
  <span className="block h-1 w-6 bg-black transition group-hover:bg-slate-700"></span>
</button> */}
      
    </header>
  );
}

export default Navbar;
