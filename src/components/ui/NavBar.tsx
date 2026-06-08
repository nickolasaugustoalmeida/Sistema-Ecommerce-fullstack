import {
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

function Navbar() {
  const [menuUsuarioAberto, setMenuUsuarioAberto] = useState(false);

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
              className="rounded-full p-2 transition hover:bg-slate-100"
              aria-label="Abrir menu do usuario"
            >
              <User size={20} />
            </button>

            {menuUsuarioAberto && (
              <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
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

                <Link
                  to="/admin/produtos"
                  onClick={() => setMenuUsuarioAberto(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Area do vendedor
                </Link>
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
