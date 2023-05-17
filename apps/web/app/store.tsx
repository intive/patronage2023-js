import { atom } from "jotai";

export enum languages {
  en = "en",
  pl = "pl",
  fr = "fr",
}

const initLanguage = () => {
  const localLang = localStorage.getItem("lang");
  const defaultLanguage =
    localLang && Object.values<string>(languages).includes(localLang)
      ? (localLang as languages)
      : languages.en;

  return defaultLanguage;
};

export const languageAtom = atom<languages>(initLanguage());
