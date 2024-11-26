import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Deed } from "@/lib/types";
import { useStore } from "@/lib/store";
import { formatName } from "@/lib/utils";
import { ShareButtons } from "./ShareButtons";

interface DeedCardProps extends Deed {}

export function DeedCard({ id, title, author, date, category, likes, dislikes, image, slug, isAnonymous, description }: DeedCardProps) {
  const { addVote, removeVote, votes } = useStore();
  const displayName = isAnonymous ? 'Anonim' : formatName(author);
  const shareUrl = `${window.location.origin}/deed/${slug}`;
  const userVote = votes.find((v) => v.deedId === id);

  const handleVote = (type: 'like' | 'dislike') => {
    if (userVote?.type === type) {
      removeVote(id);
    } else {
      addVote({ deedId: id, type });
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/deed/${slug}`}>
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-neutral-600">
              {category}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>{displayName}</span>
            <span>{new Date(date).toLocaleDateString('tr-TR')}</span>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex gap-2">
          <Button 
            variant={userVote?.type === 'like' ? 'default' : 'ghost'} 
            size="sm" 
            className="gap-2"
            onClick={() => handleVote('like')}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{likes}</span>
          </Button>
          <Button 
            variant={userVote?.type === 'dislike' ? 'default' : 'ghost'} 
            size="sm" 
            className="gap-2"
            onClick={() => handleVote('dislike')}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>{dislikes}</span>
          </Button>
        </div>
        <ShareButtons
          title={title}
          description={description}
          image={image}
          url={shareUrl}
          variant="minimal"
        />
      </CardFooter>
    </Card>
  );
}