import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { DeedDetail } from './pages/DeedDetail';
import { Admin } from './pages/Admin';
import { Contact } from './pages/Contact';
import { ADMIN_PATH } from './lib/types';
import { Toaster } from './components/ui/toaster';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/deed/:slug" element={<DeedDetail />} />
        </Route>
        <Route path={`/${atob(ADMIN_PATH)}`} element={<Admin />} />
        <Route path="/iletisim1" element={<Contact />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}