import { atom } from "jotai";

export type Language = "en" | "pl" | "fr";

export const languageAtom = atom<Language>("en");
