import {
  ArrowRight,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";
import HERO from "../../assets/hero.png";
import IMG from "../../assets/images.jpg";
import IMG2 from "../../assets/download.jpg";
import Navbar from "../ui/NavBar";

const produtosEmDestaque = [
  {
    id: 1,
    imagem: HERO,
    categoria: "ELETRONICOS",
    nome: "Fone Bluetooth Pro X",
    descricao: "Cancelamento ativo de ruido, bateria de 30h e som de alta fidelidade.",
    preco: "R$ 899,90",
    estoque: "12 em estoque",
  },
  {
    id: 2,
    imagem: HERO,
    categoria: "CALCADOS",
    nome: "Tenis Urban Runner",
    descricao: "Conforto e estilo para o dia a dia, com solado ultra leve.",
    preco: "R$ 459,00",
    estoque: "25 em estoque",
  },
  {
    id: 3,
    imagem: HERO,
    categoria: "CASA",
    nome: "Cafeteira Italiana 6 Xicaras",
    descricao: "Cafe espresso em casa com o aroma autentico das moka italianas.",
    preco: "R$ 189,90",
    estoque: "40 em estoque",
  },
  {
    id: 4,
    imagem: HERO,
    categoria: "ACESSORIOS",
    nome: "Mochila Executive 20L",
    descricao: "Compartimento acolchoado para notebook ate 15.6 polegadas.",
    preco: "R$ 329,00",
    estoque: "8 em estoque",
  },
];

function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-8 py-24 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
              <Sparkles size={16} />
              Nova colecao disponivel
            </div>

            <h1 className="font-bold leading-tight text-slate-950 lg:text-5xl">
              Tudo o que voce ama, <span className="block text-red-500">em um so lugar</span></h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Curadoria de eletronicos, casa, moda e acessorios com frete
              rapido, precos honestos e suporte humano de verdade.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-red-700">
                Comprar agora
                <ArrowRight size={18} />
              </button>

              <button className="rounded-md border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100">
                Explorar categorias
              </button>
            </div>

            <div className="mt-12 flex flex-wrap gap-12">
              <div>
                <p className="text-sm text-slate-500">Clientes</p>
                <strong className="text-xl text-slate-950">+12k</strong>
              </div>

              <div>
                <p className="text-sm text-slate-500">Avaliacao</p>
                <strong className="text-xl text-slate-950">4.8 ★</strong>
              </div>

              <div>
                <p className="text-sm text-slate-500">Produtos</p>
                <strong className="text-xl text-slate-950">+500</strong>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center gap-6">
            <div className="h-80 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <img
                src={IMG}
                alt="Produto em destaque"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="h-80 w-64 overflow-hidden rounded-2xl bg-white shadow-xl">
              <img
                src={IMG2}
                alt="Produto em destaque"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute bottom-4 left-8 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl">
              <div className="rounded-full bg-red-50 p-2 text-red-600">
                <ShieldCheck size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Compra protegida
                </p>
                <p className="text-xs text-slate-500">
                  7 dias para troca
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-8 py-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-slate-100 p-3 text-red-600">
                <Truck size={20} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">Frete rapido</p>
                <p className="text-sm text-slate-500">Entrega em 2-5 dias</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-slate-100 p-3 text-red-600">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">Pagamento seguro</p>
                <p className="text-sm text-slate-500">Pix, cartao e boleto</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-slate-100 p-3 text-red-600">
                <RefreshCcw size={20} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">Troca facilitada</p>
                <p className="text-sm text-slate-500">Ate 7 dias sem custo</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-slate-100 p-3 text-red-600">
                <Sparkles size={20} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">Curadoria</p>
                <p className="text-sm text-slate-500">Marcas selecionadas</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-8 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-600">
                  Em destaque
                </p>

                <h2 className="text-3xl font-bold text-slate-950">
                  Mais desejados da semana
                </h2>
              </div>

              <a
                href="/produtos"
                className="flex items-center gap-2 font-semibold text-slate-950 transition hover:text-red-600"
              >
                Ver tudo
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {produtosEmDestaque.map((produto) => (
                <article
                  key={produto.id}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-72 bg-slate-100">
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {produto.categoria}
                    </p>

                    <h3 className="mt-3 text-lg font-semibold text-slate-950">
                      {produto.nome}
                    </h3>

                    <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">
                      {produto.descricao}
                    </p>

                    <div className="mt-5">
                      <p className="text-xl font-bold text-slate-950">
                        {produto.preco}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {produto.estoque}
                      </p>
                    </div>

                    <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
                      <ShoppingCart size={18} />
                      Adicionar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default LandingPage;
