import { createContext, useEffect, useState } from "react";

interface LanguageContextInterface {
  currentLang: string;
  setLang: (newLanguage: string) => void;
}

export const LanguageContext = createContext<LanguageContextInterface>(
  undefined!
);

export const LanguageProvider = ({ children }: any) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const localLang = localStorage.getItem("lang");
    localLang && setLang(localLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLang: lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
