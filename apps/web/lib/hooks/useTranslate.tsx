"use client";
import { dictionaryType } from "lib/dictionary";
import dictionary from "lib/dictionary";
import { languageAtom } from "app/store";
import { useAtomValue } from "jotai";

type NestedObjectType = {
  [key: string]: string;
};

export const useTranslate = <T extends keyof dictionaryType>(screenName: T) => {
  const currentLang = useAtomValue(languageAtom);

  const translate = (dictionaryNestedObject: NestedObjectType) => {
    return dictionaryNestedObject[currentLang];
  };

  return {
    t: translate,
    dict: dictionary[screenName],
  };
};
