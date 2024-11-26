import { useParams } from "react-router-dom";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { formatName } from "@/lib/utils";
import { ShareButtons } from "@/components/ShareButtons";

export function DeedDetail() {
  const { slug } = useParams();
  const { deeds, addVote, removeVote, votes } = useStore();
  const deed = deeds.find((d) => d.slug === slug);

  if (!deed) {
    return (
      <>
        <SEOHead 
          title="İyi İş Bulunamadı - Günlük İyi İşler"
          description="Aradığınız iyi iş bulunamadı."
        />
        <div className="container mx-auto px-4 py-8">İyi iş bulunamadı.</div>
      </>
    );
  }

  const displayName = deed.isAnonymous ? 'Anonim' : formatName(deed.author);
  const shareUrl = `${window.location.origin}/deed/${deed.slug}`;
  const userVote = votes.find((v) => v.deedId === deed.id);

  const handleVote = (type: 'like' | 'dislike') => {
    if (userVote?.type === type) {
      removeVote(deed.id);
    } else {
      addVote({ deedId: deed.id, type });
    }
  };

  return (
    <>
      <SEOHead 
        title={`${deed.title} - Günlük İyi İşler`}
        description={deed.description}
        image={deed.image}
        type="article"
        publishedTime={deed.date}
        author={displayName}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={deed.image} 
              alt={deed.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{deed.title}</h1>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {deed.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{deed.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Paylaşan</h3>
                  <p className="text-lg">{displayName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Konum</h3>
                  <p className="text-lg">{deed.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tarih</h3>
                  <p className="text-lg">{new Date(deed.date).toLocaleDateString('tr-TR')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Saat</h3>
                  <p className="text-lg">{deed.time}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-4">
                  <Button 
                    variant={userVote?.type === 'like' ? 'default' : 'outline'} 
                    size="lg" 
                    className="gap-2"
                    onClick={() => handleVote('like')}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{deed.likes}</span>
                  </Button>
                  <Button 
                    variant={userVote?.type === 'dislike' ? 'default' : 'outline'} 
                    size="lg" 
                    className="gap-2"
                    onClick={() => handleVote('dislike')}
                  >
                    <ThumbsDown className="w-5 h-5" />
                    <span>{deed.dislikes}</span>
                  </Button>
                </div>
                
                <ShareButtons
                  title={deed.title}
                  description={deed.description}
                  image={deed.image}
                  url={shareUrl}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}