import { Routes, Route } from 'react-router';
import LandingPage from './components/Pages/LandingPage';
import Catalogo from './components/Pages/Catalogo';
import ProdutosAdmin from './components/Pages/ProdutosAdmin';
import Cadastro from './components/Forms/Cadastro.tsx';
import Login from './components/Forms/Login.tsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/produtos" element={<Catalogo />} />
      <Route path="/admin/produtos" element={<ProdutosAdmin />} />
    </Routes>
      
    
  )
}

export default App
