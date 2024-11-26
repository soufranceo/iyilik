import { Outlet, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { NewDeedDialog } from "./NewDeedDialog";
import { BackgroundEffects } from "./BackgroundEffects";
import { RecentDeeds } from "./RecentDeeds";
import { WelcomeHero } from "./WelcomeHero";
import { HeartBeat } from "./HeartBeat";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Layout() {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50 relative flex flex-col"
      >
        <BackgroundEffects />
        
        <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <HeartBeat />
              <motion.h1 
                className="text-xl font-bold bg-gradient-to-r from-rose-500 to-blue-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t('site.title')}
              </motion.h1>
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <NewDeedDialog />
            </div>
          </div>
        </header>

        <WelcomeHero />
        <RecentDeeds />
        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="bg-white/80 backdrop-blur-sm border-t py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            <p>© 2024-2030 Mehmet Akgül. {t('footer.rights')}</p>
            <p className="mt-1">
              <Link to="/iletisim1" className="text-blue-600 hover:underline">
                {t('nav.contact')}
              </Link>
            </p>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}