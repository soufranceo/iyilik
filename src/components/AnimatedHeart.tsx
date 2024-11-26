import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export function AnimatedHeart() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className="text-rose-500"
    >
      <Heart className="w-6 h-6" />
    </motion.div>
  );
}