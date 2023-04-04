import { createContext, Dispatch, SetStateAction, useState } from "react";

enum languages {
  en = "en",
  pl = "pl",
}

interface LanguageContextInterface {
  currentLang: languages;
  setLang: Dispatch<SetStateAction<languages>>;
}

export const LanguageContext = createContext<LanguageContextInterface>(
  undefined!
);

export const LanguageProvider = ({ children }: any) => {
  const localLang = localStorage.getItem("lang");
  const [lang, setLang] = useState(
    localLang && Object.values<string>(languages).includes(localLang)
      ? (localLang as languages)
      : languages.en
  );

  return (
    <LanguageContext.Provider value={{ currentLang: lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
