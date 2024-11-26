import { Facebook, Link2, Twitter, Share2, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  variant?: 'default' | 'minimal';
  className?: string;
}

export function ShareButtons({ 
  title, 
  description, 
  image, 
  url,
  variant = 'default',
  className 
}: ShareButtonsProps) {
  const { toast } = useToast();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Bağlantı kopyalandı!",
        description: "Paylaşım bağlantısı panoya kopyalandı.",
      });
    } catch (err) {
      toast({
        title: "Hata!",
        description: "Bağlantı kopyalanırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast({
            title: "Hata!",
            description: "Paylaşım yapılırken bir hata oluştu.",
            variant: "destructive",
          });
        }
      }
    }
  };

  const getWhatsAppUrl = () => {
    const text = `${title}\n\n${description}\n\n${url}`;
    return isMobile
      ? `whatsapp://send?text=${encodeURIComponent(text)}`
      : `https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  if (variant === 'minimal') {
    return (
      <div className={cn("flex gap-1", className)}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
            'facebook-share',
            'width=600,height=400'
          )}
        >
          <Facebook className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => window.open(
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            'twitter-share',
            'width=600,height=400'
          )}
        >
          <Twitter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => window.open(getWhatsAppUrl())}
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
        {navigator.share ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopyLink}
          >
            <Link2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
          'facebook-share',
          'width=600,height=400'
        )}
        className="gap-2"
      >
        <Facebook className="w-4 h-4" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}%0A%0A${encodedDescription}`,
          'twitter-share',
          'width=600,height=400'
        )}
        className="gap-2"
      >
        <Twitter className="w-4 h-4" />
        <span className="hidden sm:inline">Twitter</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(getWhatsAppUrl())}
        className="gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </Button>

      {navigator.share ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Paylaş</span>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="gap-2"
        >
          <Link2 className="w-4 h-4" />
          <span className="hidden sm:inline">Kopyala</span>
        </Button>
      )}
    </div>
  );
}