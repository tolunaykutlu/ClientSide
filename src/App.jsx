import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StokPage from './pages/StokPage';
import FasonPage from './pages/FasonPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages - without Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Main app pages - with Layout */}
        <Route path="/stok" element={<Layout><StokPage /></Layout>} />
        <Route path="/fason" element={<Layout><FasonPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
