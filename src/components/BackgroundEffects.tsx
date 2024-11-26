import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  scale: number;
}

export function BackgroundEffects() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now();
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const scale = 0.5 + Math.random() * 0.5;

      setHearts(prev => [...prev, { id, x, y, scale }]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 4000);
    };

    const interval = setInterval(createHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map(({ id, x, y, scale }) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0, y: y + 100 }}
          animate={{ 
            opacity: [0, 0.1, 0],
            scale: [0, scale, 0],
            y: [y + 100, y - 100]
          }}
          transition={{ duration: 4 }}
          style={{
            position: 'absolute',
            left: x,
          }}
          className="text-rose-200"
        >
          <Heart className="w-6 h-6" />
        </motion.div>
      ))}
    </div>
  );
}