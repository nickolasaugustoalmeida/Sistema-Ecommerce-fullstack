import Navbar from "../ui/NavBar";
import { PackageSearch, Search, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:3001";

type Produto = {
  id: number;
  nome: string;
  descricao: string;
  preco: number | string;
  estoque: number;
  categoria: string;
  imagem_url: string;
};

function formatarPreco(preco: number | string) {
  return Number(preco).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function Catalogo() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch(`${API_URL}/produtos`);
        const dados = await resposta.json();

        setProdutos(dados);
      } catch {
        setErro("Nao conseguimos carregar a vitrine agora. Tente novamente em instantes.");
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, []);

  /*
    produtosFiltrados cria uma lista baseada no texto digitado na busca.
    Isso ainda e filtro no frontend, usando os dados que ja vieram do banco.
  */
  const produtosFiltrados = useMemo(() => {
    const textoBusca = busca.toLowerCase().trim();

    if (!textoBusca) {
      return produtos;
    }

    return produtos.filter((produto) => {
      const nome = produto.nome.toLowerCase();
      const categoria = (produto.categoria || "").toLowerCase();

      return nome.includes(textoBusca) || categoria.includes(textoBusca);
    });
  }, [busca, produtos]);

  return (
<><Navbar />
    

    <main id="produtos" className="min-h-screen bg-slate-50 px-6 py-16">
      
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-red-600">
              Vitrine
            </p>

            <h1 className="text-4xl font-bold text-slate-950">
              Escolha seus proximos favoritos
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Uma selecao de produtos para deixar sua rotina mais pratica,
              bonita e bem equipada.
            </p>
          </div>

          <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:max-w-sm">
            <Search size={18} className="text-slate-500" />

            <input
              type="text"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar por produto ou categoria"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </section>

        {carregando && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <PackageSearch className="mx-auto mb-3 text-slate-400" size={34} />

            <p className="font-semibold text-slate-900">
              Preparando sua vitrine...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              So um instante enquanto separamos as melhores opcoes.
            </p>
          </div>
        )}

        {erro && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
            {erro}
          </div>
        )}

        {!carregando && !erro && produtos.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <PackageSearch className="mx-auto mb-3 text-slate-400" size={34} />

            <p className="font-semibold text-slate-900">
              A vitrine esta sendo preparada.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Em breve voce encontrara novidades selecionadas por aqui.
            </p>
          </div>
        )}

        {!carregando && !erro && produtos.length > 0 && produtosFiltrados.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <PackageSearch className="mx-auto mb-3 text-slate-400" size={34} />

            <p className="font-semibold text-slate-900">
              Nenhum resultado para sua busca.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Tente procurar por outro produto, estilo ou categoria.
            </p>
          </div>
        )}

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {produtosFiltrados.map((produto) => (
            <article
              key={produto.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-56 bg-slate-100">
                {produto.imagem_url ? (
                  <img
                    src={produto.imagem_url}
                    alt={produto.nome}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-500">
                    <span className="text-5xl font-bold">
                      {produto.nome[0]}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {produto.categoria || "Selecionado"}
                </p>

                <h2 className="mt-3 text-lg font-bold text-slate-950">
                  {produto.nome}
                </h2>

                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">
                  {produto.descricao || "Produto escolhido para completar sua experiencia de compra."}
                </p>

                <div className="mt-5">
                  <strong className="text-xl text-slate-950">
                    {formatarPreco(produto.preco)}
                  </strong>

                  <p className="mt-1 text-sm text-slate-500">
                    {produto.estoque > 0
                      ? `${produto.estoque} unidades disponiveis`
                      : "Consulte disponibilidade"}
                  </p>
                </div>

                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
                  <ShoppingCart size={18} />
                  Adicionar ao carrinho
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
    </>
  );
}

export default Catalogo;
