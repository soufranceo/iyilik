import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function WelcomeHero() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-16 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
      >
        {t('hero.title')}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
      >
        {t('hero.subtitle')}
      </motion.p>
    </motion.div>
  );
}