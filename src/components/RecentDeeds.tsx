import { useStore } from "@/lib/store";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function RecentDeeds() {
  const { t } = useTranslation();
  const deeds = useStore((state) => state.deeds);
  const recentDeeds = deeds.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="w-full bg-white/50 backdrop-blur-sm border-y relative"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-1 rounded-full z-10 shadow-sm">
          <span className="text-sm font-medium text-gray-600">
            {t('deed.recentTitle')}
          </span>
        </div>
        <div className="overflow-hidden pl-32">
          <div className="flex gap-8 animate-scroll">
            {recentDeeds.map((deed) => (
              <Link
                key={deed.id}
                to={`/deed/${deed.slug}`}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {deed.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}