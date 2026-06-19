import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Store } from "lucide-react";
import { loginVendedor, salvarTokenVendedor } from "../../services/vendedorAuth";

function LoginVendedor() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviarLogin(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await loginVendedor({ email, senha });
      salvarTokenVendedor(resposta.token);
      navigate("/admin/produtos");
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao entrar como vendedor");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-300 px-4">
      <form
        onSubmit={enviarLogin}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-8 shadow"
      >
        <Link to="/login" className="flex text-sm font-semibold text-red-600 hover:text-red-700">
          <ArrowLeft size={20} /> Voltar para login do cliente
        </Link>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-red-50 p-3 text-red-600">
            <Store size={22} />
          </div>

          <div>
            <p className="text-sm font-semibold text-red-600">Area do vendedor</p>
            <h1 className="text-2xl font-bold text-slate-900">Entrar na loja</h1>
          </div>
        </div>

        <input
          type="email"
          placeholder="Email comercial"
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
          className="rounded bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {carregando ? "Entrando..." : "Entrar como vendedor"}
        </button>

        <Link to="/vendedor/cadastro">
          <p>
            Ainda nao vende aqui? <span className="cursor-pointer text-blue-700">Cadastrar loja</span>
          </p>
        </Link>
      </form>
    </main>
  );
}

export default LoginVendedor;
