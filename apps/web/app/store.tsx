import { atom } from "jotai";

export enum languages {
  en = "en",
  pl = "pl",
  fr = "fr",
}

export const languageAtom = atom<languages>("en" as languages);
