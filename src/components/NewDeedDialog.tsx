import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { useStore } from "@/lib/store";
import { IMAGE_SOURCES } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function NewDeedDialog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const addDeed = useStore((state) => state.addDeed);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newDeed = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      author: formData.get('author') as string,
      isAnonymous,
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
      location: formData.get('location') as string,
      category: formData.get('category') as string,
      image: formData.get('image') as string,
    };

    addDeed(newDeed);
    
    toast({
      title: "Başarılı!",
      description: "İyi işiniz başarıyla paylaşıldı.",
    });

    setOpen(false);
    (e.target as HTMLFormElement).reset();
    
    // Navigate to home page after a short delay
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Yeni Bir İyilik Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yeni Bir İyilik Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Başlık</Label>
            <Input id="title" name="title" required placeholder="İyi işinizi kısaca anlatın" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Detaylar</Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="Detayları buraya yazabilirsiniz..."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author">İsminiz</Label>
            <Input 
              id="author" 
              name="author" 
              required={!isAnonymous}
              disabled={isAnonymous}
              placeholder="İsminizi girin" 
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
              <Label htmlFor="anonymous">Anonim olarak paylaş</Label>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Konum</Label>
            <Input id="location" name="location" required placeholder="Şehir/İlçe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Kategori</Label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toplum">Toplum</SelectItem>
                <SelectItem value="hayvanlar">Hayvanlar</SelectItem>
                <SelectItem value="cevre">Çevre</SelectItem>
                <SelectItem value="egitim">Eğitim</SelectItem>
                <SelectItem value="diger">Diğer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Fotoğraf URL</Label>
            <Input id="image" name="image" type="url" placeholder="Fotoğraf bağlantısı (opsiyonel)" />
            <div className="text-sm text-muted-foreground">
              <span>Fotoğraf için önerilen kaynaklar:</span>
              <div className="mt-2 space-y-1">
                {IMAGE_SOURCES.map((source) => (
                  <div key={source.name}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {source.name}
                    </a>
                    {' - '}
                    <span className="text-muted-foreground">{source.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">Paylaş</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}