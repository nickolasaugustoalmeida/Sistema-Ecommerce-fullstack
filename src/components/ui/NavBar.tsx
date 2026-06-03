import {
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, NavLink } from "react-router";

function Navbar() {
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

          <button className="rounded-full p-2 transition hover:bg-slate-100">
            <User size={20} />
          </button>

          <button className="rounded-full p-2 transition hover:bg-slate-100">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
