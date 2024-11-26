import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { isAuthenticated } from '@/lib/auth';

export function Admin() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(() => isAuthenticated());

  useEffect(() => {
    if (!isAuth) {
      const currentAuth = isAuthenticated();
      if (currentAuth) {
        setIsAuth(true);
      }
    }
  }, [isAuth]);

  const handleLogin = () => {
    setIsAuth(true);
  };

  if (!isAuth) {
    return (
      <>
        <SEOHead
          title="Admin Girişi"
          description="Yönetici paneli giriş sayfası"
        />
        <AdminLogin onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Yönetici Paneli"
        description="İyi işleri ve kullanıcı aktivitelerini yönetin"
      />
      <AdminDashboard />
    </>
  );
}