import { atom } from "jotai";

export type Language = "en" | "pl" | "fr";

export const categoryFilterAtom = atom<string[]>([]);
export const languageAtom = atom<Language>("en");
export const mobileMenuAtom = atom<boolean>(false);
export const usersDefaultCurrency = atom<string>("USD");
