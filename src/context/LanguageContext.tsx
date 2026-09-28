"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  lang: Language;
  dir: Direction;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("bayan_lang") as Language;
    if (saved === "en" || saved === "ar") {
      setLang(saved);
    }
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  const toggleLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    localStorage.setItem("bayan_lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLang }}>
      <div dir={dir} className={lang === "ar" ? "font-arabic" : "font-english"} style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}