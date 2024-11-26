import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function HeartBeat() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1]
      }}
      className="relative"
    >
      <Heart className="w-6 h-6 text-rose-500 filter drop-shadow-lg" />
      <motion.div
        className="absolute inset-0 bg-rose-500 rounded-full opacity-25"
        animate={{
          scale: [1, 2],
          opacity: [0.25, 0]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
}