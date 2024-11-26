import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeedsList } from './DeedsList';
import { ActivityList } from './ActivityList';
import { setAuthenticated, clearAuthentication } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('deeds');

  const handleLogout = useCallback(() => {
    clearAuthentication();
    setAuthenticated(false);
    toast({
      title: "Çıkış Yapıldı",
      description: "Güvenli bir şekilde çıkış yaptınız.",
    });
    navigate('/');
  }, [navigate, toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Yönetici Paneli
        </h1>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
        >
          Çıkış Yap
        </Button>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="deeds">İyi İşler</TabsTrigger>
          <TabsTrigger value="analytics">Kullanıcı Aktiviteleri</TabsTrigger>
        </TabsList>

        <TabsContent value="deeds" className="space-y-4">
          <DeedsList />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <ActivityList />
        </TabsContent>
      </Tabs>
    </div>
  );
}