import { atom } from "jotai";
import { CategoryType } from "ui";

export type Language = "en" | "pl" | "fr";

export const categoryFilterAtom = atom<string[]>([]);
export const languageAtom = atom<Language>("en");
export const mobileMenuAtom = atom<boolean>(false);
export const budgetCategories = atom<CategoryType[]>([]);
export const currencyAtom = atom<string>("USD");
export const categoryModalAtom = atom<boolean>(false);
