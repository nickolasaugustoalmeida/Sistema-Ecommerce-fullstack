import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

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

function ProdutosAdmin() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [mensagem, setMensagem] = useState("Gerenciamento de produtos");

  async function carregarProdutos() {
    const resposta = await fetch(`${API_URL}/produtos`);
    const dados = await resposta.json();
    setProdutos(dados);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function cadastrarProduto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const dados = Object.fromEntries(new FormData(form));

    const resposta = await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (resposta.ok) {
      setMensagem("Produto cadastrado com sucesso.");
      form.reset();
      carregarProdutos();
    } else {
      setMensagem("Erro ao cadastrar produto.");
    }
  }

  async function removerProduto(id: number) {
    const resposta = await fetch(`${API_URL}/produtos/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      setMensagem("Produto removido com sucesso.");
      carregarProdutos();
    } else {
      setMensagem("Erro ao remover produto.");
    }
  }

  return (
    <section id="crud-produtos" className="bg-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            CRUD
          </p>
          <h2 className="text-3xl font-bold text-slate-900">
            Gerenciar produtos
          </h2>
          <p className="mt-2 text-slate-600">
            Adicione, e remova produtos
          </p>
        </div>

        <div className="mb-6 rounded bg-slate-100 p-4 text-sm text-slate-700">
          {mensagem}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={cadastrarProduto} className="flex flex-col gap-3 rounded bg-slate-50 p-6 shadow">
            <h3 className="text-xl font-bold text-slate-900">
              Adicionar produto
            </h3>

            <input name="nome" required placeholder="Nome" className="rounded border p-3" />
            <input name="categoria" placeholder="Categoria" className="rounded border p-3" />
            <input name="preco" required type="number" step="0.01" placeholder="Preco" className="rounded border p-3" />
            <input name="estoque" type="number" placeholder="Estoque" className="rounded border p-3" />
            <input name="imagem_url" placeholder="URL da imagem" className="rounded border p-3" />
            <textarea name="descricao" placeholder="Descricao" className="min-h-24 rounded border p-3" />

            <button className="rounded bg-black px-4 py-3 text-white transition hover:bg-slate-700">
              Cadastrar produto
            </button>
          </form>

          <div className="rounded bg-slate-50 p-6 shadow">
            <h3 className="mb-4 text-xl font-bold text-slate-900">
              Produtos cadastrados
            </h3>

            <div className="flex flex-col gap-3">
              {produtos.map((produto) => (
                <div key={produto.id} className="flex items-center justify-between rounded bg-white p-4 shadow-sm">
                  <div>
                    <p className="font-bold text-slate-900">
                      {produto.nome}
                    </p>
                    <p className="text-sm text-slate-600">
                      R$ {produto.preco} | Estoque: {produto.estoque}
                    </p>
                  </div>

                  <button
                    onClick={() => removerProduto(produto.id)}
                    className="rounded bg-red-600 p-2 text-white transition hover:bg-red-700"
                    aria-label="Remover produto"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              {produtos.length === 0 && (
                <p className="text-slate-600">
                  Nenhum produto cadastrado.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProdutosAdmin;
