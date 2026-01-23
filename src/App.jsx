import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StokPage from './pages/StokPage';
import FasonPage from './pages/FasonPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<StokPage />} />
          <Route path="/fason" element={<FasonPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
