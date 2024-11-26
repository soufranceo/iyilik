import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export function PawPrints() {
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);

  useEffect(() => {
    const createPawPrint = () => {
      const id = Date.now();
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const rotation = Math.random() * 360;

      setPawPrints(prev => [...prev, { id, x, y, rotation }]);

      // Remove paw print after animation
      setTimeout(() => {
        setPawPrints(prev => prev.filter(p => p.id !== id));
      }, 5000);
    };

    const interval = setInterval(createPawPrint, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {pawPrints.map(({ id, x, y, rotation }) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            rotate: rotation,
          }}
          className="w-6 h-6"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-neutral-300">
            <path d="M12 2C7.58 2 4 5.58 4 10c0 2.76 1.12 5.26 2.93 7.07L12 22l5.07-4.93C18.88 15.26 20 12.76 20 10c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}