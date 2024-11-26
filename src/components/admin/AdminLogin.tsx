import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { adminSchema, validatePassword, setAuthenticated } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      adminSchema.parse({ password });
      
      // Simulate network delay for security
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (validatePassword(password)) {
        setAuthenticated(true);
        toast({
          title: "Başarılı",
          description: "Yönetici paneline hoş geldiniz!",
        });
        onLogin();
      } else {
        setError('Geçersiz parola');
        toast({
          title: "Hata",
          description: "Giriş başarısız. Lütfen parolanızı kontrol edin.",
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Geçersiz parola formatı';
      setError(errorMessage);
      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleLogin} className="space-y-4">
          <h1 className="text-2xl font-bold">Admin Girişi</h1>
          <div className="space-y-2">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parola"
              disabled={isLoading}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full transition-all duration-200 hover:bg-blue-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Giriş yapılıyor...
              </>
            ) : (
              'Giriş'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}