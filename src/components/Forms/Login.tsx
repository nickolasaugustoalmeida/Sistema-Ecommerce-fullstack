import { Link } from "react-router"
import {ArrowLeft} from "lucide-react"
function Login(){
    return(

         <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <form className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-8 shadow">
          <Link to="/" className="text-sm font-semibold text-red-600 hover:text-red-700 flex">
           <ArrowLeft size={20}/> Voltar
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">
          Entrar
        </h1>


        <input
          type="email"
          placeholder="Email"
          className="rounded border border-slate-300 p-3 outline-none focus:border-red-500"
        />

        <input
          type="password"
          placeholder="Senha"
          className="rounded border border-slate-300 p-3 outline-none focus:border-red-500"
        />

        <button className="rounded bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700">
          Entrar
        </button>
        <p>Não possui uma conta? <span className="text-blue-700 cursor-pointer">Clique aqui</span></p>
      </form>
    </main>

    )
} export default Login