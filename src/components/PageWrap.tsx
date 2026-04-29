import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { LanguageProvider } from "@/i18n/LanguageContext";

export function PageWrap({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <CustomCursor />
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
