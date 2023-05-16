"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export enum languages {
  en = "en",
  pl = "pl",
  fr = "fr",
}

interface LanguageContextInterface {
  currentLang: languages | "";
  setLang: Dispatch<SetStateAction<languages | "">>;
}

export const LanguageContext = createContext<LanguageContextInterface>({
  currentLang: "",
  setLang: () => {},
});

export const LanguageProvider = ({ children }: any) => {
  const [lang, setLang] = useState<languages | "">("");

  useEffect(() => {
    const localLang = localStorage.getItem("lang");
    setLang(
      localLang && Object.values<string>(languages).includes(localLang)
        ? (localLang as languages)
        : languages.en
    );
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLang: lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
