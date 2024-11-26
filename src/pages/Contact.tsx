import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Contact() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.5 }}
            className="text-white text-center p-8 max-w-2xl"
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
            >
               İletişim Sayfası
            </motion.h1>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-4 text-gray-300"
            >
              <p className="text-lg">
                bizimle olduğunuz için mutluyuz! İyi işlerinizi bizimle paylaşmaya devam edin❣️
              </p>
              <div className="mt-8 p-6 bg-gray-900 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-purple-400">
                  Bize Ulaşın
                </h2>
                <p className="mb-2">📧 gizli@iyiisler.com</p>
                <p>📱 +90 555 555 5555</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}