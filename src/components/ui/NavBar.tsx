import {
  LogOut,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import type { Usuario } from "../../services/auth";

type NavbarProps = {
  usuario?: Usuario | null;
  onLogout?: () => void | Promise<void>;
};

function formatarDataCadastro(dataCadastro?: string) {
  if (!dataCadastro) {
    return "Nao informado";
  }

  const data = new Date(dataCadastro);

  if (Number.isNaN(data.getTime())) {
    return dataCadastro;
  }

  return new Intl.DateTimeFormat("pt-BR").format(data);
}

function Navbar({ usuario = null, onLogout }: NavbarProps) {
  const [menuUsuarioAberto, setMenuUsuarioAberto] = useState(false);
  const inicialUsuario = usuario?.nome.charAt(0).toUpperCase();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-red-600 p-2 text-white">
            <ShoppingBag size={20} />
          </div>

          <span className="text-lg font-bold text-slate-900">
            Minha<span className="text-red-600">Loja</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-red-600 pb-1 font-semibold text-slate-950"
                : "pb-1 font-semibold text-slate-500 transition hover:text-slate-950"
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/produtos"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-red-600 pb-1 font-semibold text-slate-950"
                : "pb-1 font-semibold text-slate-500 transition hover:text-slate-950"
            }
          >
            Produtos
          </NavLink>

          <NavLink
            to="/admin/produtos"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-red-600 pb-1 font-semibold text-slate-950"
                : "pb-1 font-semibold text-slate-500 transition hover:text-slate-950"
            }
          >
            Categorias
          </NavLink>
        </nav>

        <div className="flex items-center gap-4 text-slate-950">
          <button className="rounded-full p-2 transition hover:bg-slate-100">
            <Search size={20} />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuUsuarioAberto(!menuUsuarioAberto)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
              aria-label={usuario ? "Abrir menu da conta" : "Abrir menu do usuario"}
            >
              {inicialUsuario ? (
                <span className="text-sm font-bold text-red-600">{inicialUsuario}</span>
              ) : (
                <User size={20} />
              )}
            </button>

            {menuUsuarioAberto && (
              <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                {usuario ? (
                  <>
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                        Minha conta
                      </p>

                      <div className="mt-3 space-y-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Nome
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-950">{usuario.nome}</p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Email
                          </p>
                          <p className="mt-1 break-words text-sm font-semibold text-slate-950">
                            {usuario.email}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Cliente desde
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-950">
                            {formatarDataCadastro(usuario.criado_em)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setMenuUsuarioAberto(false);
                        void onLogout?.();
                      }}
                      className="mt-2 flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                    >
                      <LogOut size={16} />
                      Sair
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMenuUsuarioAberto(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                    >
                      Entrar
                    </Link>

                    <Link
                      to="/cadastro"
                      onClick={() => setMenuUsuarioAberto(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                    >
                      Criar conta
                    </Link>
                  </>
                )}

              </div>
            )}
          </div>

          <button className="rounded-full p-2 transition hover:bg-slate-100">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
