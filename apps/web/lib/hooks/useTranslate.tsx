"use client";
import { dictionaryType } from "lib/dictionary";
import dictionary from "lib/dictionary";
import { LanguageContext } from "lib/contexts/LanguageContext";
import { useContext } from "react";

type NestedObjectType = {
  [key: string]: string;
};

export const useTranslate = <T extends keyof dictionaryType>(screenName: T) => {
  const { currentLang } = useContext(LanguageContext);

  const translate = (dictionaryNestedObject: NestedObjectType) => {
    return dictionaryNestedObject[currentLang];
  };

  return {
    t: translate,
    dict: dictionary[screenName],
  };
};
