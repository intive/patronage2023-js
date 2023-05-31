import { Language, languageAtom } from "store";
import { useSetAtom, useAtomValue } from "jotai";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";

import { Flag } from "ui";
import {
  SelectStyled,
} from "./LanguageSelectorStyled";
import { SelectLabelHiddenInTrigger } from "ui/Select";

export const LanguageSelector = () => {
  const { hasScrollbar } = useHasScrollBar();
  const setLanguage = useSetAtom(languageAtom);
  const language = useAtomValue(languageAtom);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const items = [
    {
      lang: "pl",
      flagSrc: "/flags/pl.svg",
      languageName: "Polski",
      alt: "Flag of Poland", // DICTIONARY !!
    },
    {
      lang: "en",
      flagSrc: "/flags/en.svg",
      languageName: "English",
      alt: "Flag of UK", // DICTIONARY !!
    },
    {
      lang: "fr",
      flagSrc: "/flags/fr.svg",
      languageName: "Français",
      alt: "Flag of France", // DICTIONARY !!
    },
  ];

  return (
    <SelectStyled
      items={items.map(({ lang, flagSrc, languageName, alt }) => ({
        value: lang,
        label: (
          <>
            <Flag src={flagSrc} alt={alt} />
            <SelectLabelHiddenInTrigger>
              {languageName}
            </SelectLabelHiddenInTrigger>
          </>
        ),
      }))}
      value={language || "en"}
      onValueChange={(language) => {
        changeLanguage(language as Language);
      }}
      label=""
      hasIcon={false}
      hasScrollbar={hasScrollbar}
    />
  );
};
