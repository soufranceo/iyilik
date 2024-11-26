import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { DeedCard } from "@/components/DeedCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { SEOHead } from "@/components/SEOHead";
import { searchContent } from "@/lib/utils";

export function Home() {
  const deeds = useStore((state) => state.deeds);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDeeds = deeds.filter((deed) => {
    const matchesCategory = selectedCategory === 'all' || deed.category === selectedCategory;
    
    if (!searchQuery) return matchesCategory;

    const searchFields = [
      deed.title,
      deed.description,
      deed.author,
      deed.location,
      deed.category
    ];

    const matchesSearch = searchFields.some(field => 
      searchContent(searchQuery, field || '')
    );

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEOHead />
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              placeholder="İsim, konum veya içerik ara..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              Tümü
            </Button>
            <Button
              variant={selectedCategory === 'toplum' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('toplum')}
            >
              Toplum
            </Button>
            <Button
              variant={selectedCategory === 'hayvanlar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('hayvanlar')}
            >
              Hayvanlar
            </Button>
            <Button
              variant={selectedCategory === 'cevre' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('cevre')}
            >
              Çevre
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeeds.map((deed, index) => (
            <motion.div
              key={deed.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <DeedCard {...deed} />
            </motion.div>
          ))}
          {filteredDeeds.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-8 text-neutral-500"
            >
              Arama sonucunda hiçbir iyi iş bulunamadı.
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}