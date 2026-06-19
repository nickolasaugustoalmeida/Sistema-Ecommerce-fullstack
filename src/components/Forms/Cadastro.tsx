import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { cadastrarUsuario, salvarToken } from "../../services/auth";

function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviarCadastro(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await cadastrarUsuario({ nome, email, senha });
      salvarToken(resposta.token);
      navigate("/");
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao criar conta");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={enviarCadastro}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-8 shadow"
      >
        <Link to="/" className="flex text-sm font-semibold text-red-600 hover:text-red-700">
          <ArrowLeft size={20} /> Voltar
        </Link>

        <h1 className="text-2xl font-bold text-slate-900">Criar conta</h1>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          required
          className="rounded border border-slate-300 p-3 outline-none focus:border-red-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          required
          className="rounded border border-slate-300 p-3 outline-none focus:border-red-500"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(evento) => setSenha(evento.target.value)}
          minLength={6}
          required
          className="rounded border border-slate-300 p-3 outline-none focus:border-red-500"
        />

        {erro && (
          <p role="alert" className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={carregando}
          className="rounded bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
        >
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>

        <Link to="/login">
          <p>
            Ja possui uma conta? <span className="cursor-pointer text-blue-700">Clique aqui</span>
          </p>
        </Link>
      </form>
    </main>
  );
}

export default Cadastro;
