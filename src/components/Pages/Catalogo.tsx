import { Search, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  /*
    useEffect roda quando a pagina abre.
    Aqui o catalogo pede os produtos para o backend.
  */
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch(`${API_URL}/produtos`);
        const dados = await resposta.json();

        setProdutos(dados);
      } catch {
        setErro("Nao foi possivel carregar os produtos do banco.");
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, []);

  return (
    <main id="produtos" className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            Catalogo
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Produtos 
          </h1>

          <p className="mt-2 text-slate-600">
            Veja aqui o nosso estoque
          </p>
        </section>

        <section className="mb-8 flex items-center gap-2 rounded bg-white px-4 py-3 shadow md:max-w-md">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar produto"
            className="w-full outline-none"
          />
        </section>

        {carregando && (
          <p className="rounded bg-white p-4 text-slate-600 shadow">
            Carregando produtos...
          </p>
        )}

        {erro && (
          <p className="rounded bg-red-50 p-4 text-red-700 shadow">
            {erro}
          </p>
        )}

        {!carregando && !erro && produtos.length === 0 && (
          <p className="rounded bg-white p-4 text-slate-600 shadow">
            Nenhum produto cadastrado ainda. Use a area de Gerenciamento de produtos para adicionar um produto.
          </p>
        )}

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {produtos.map((produto) => (
            <article key={produto.id} className="rounded bg-white p-4 shadow">
              <div className="mb-4 flex h-36 items-center justify-center rounded bg-slate-200 text-slate-700">
                {produto.imagem_url ? (
                  <img
                    src={produto.imagem_url}
                    alt={produto.nome}
                    className="h-full w-full rounded object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold">
                    {produto.nome[0]}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-500">
                {produto.categoria || "Sem categoria"}
              </p>

              <h2 className="mt-1 font-bold text-slate-900">
                {produto.nome}
              </h2>

              <p className="mt-2 min-h-10 text-sm text-slate-600">
                {produto.descricao || "Produto sem descricao."}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Estoque: {produto.estoque}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <strong className="text-lg text-slate-900">
                  {formatarPreco(produto.preco)}
                </strong>

                <button className="flex items-center gap-2 rounded bg-black px-3 py-2 text-sm text-white transition hover:bg-slate-700">
                  <ShoppingCart size={16} />
                  Comprar
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Catalogo;
