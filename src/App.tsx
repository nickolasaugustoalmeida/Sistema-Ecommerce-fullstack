import { Routes, Route } from 'react-router';
import LandingPage from './components/Pages/LandingPage';
import Catalogo from './components/Pages/Catalogo';
import ProdutosAdmin from './components/Pages/ProdutosAdmin';
function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/produtos" element={<Catalogo />} />
      <Route path="/admin/produtos" element={<ProdutosAdmin />} />
    </Routes>
      
    
  )
}

export default App
