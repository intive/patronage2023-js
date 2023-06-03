import { atom } from "jotai";
import { CategoryType } from "ui";

export type Language = "en" | "pl" | "fr";

export const categoryFilterAtom = atom<string[]>([]);
export const languageAtom = atom<Language>("en");
export const mobileMenuAtom = atom<boolean>(false);
export const budgetCategories = atom<CategoryType[]>([]);
