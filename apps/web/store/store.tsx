import { atom } from "jotai";

export type Language = "en" | "pl" | "fr";

export const categoryFilterAtom = atom<string[]>([]);
export const languageAtom = atom<Language>("en");
export const hamburgerAtom = atom<Boolean>(false);
