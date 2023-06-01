import { Language, languageAtom } from "store";
import { useSetAtom, useAtomValue } from "jotai";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import styled from "styled-components";

import { Flag, Select } from "ui";
import { SelectLabelHiddenInTrigger } from "ui/Select";

const SelectStyled = styled(Select)`
  color: ${({ theme }) => theme.avatar.outline};
  background-color: unset;
  cursor: pointer;
  border: 0;
  padding: 0;
  line-height: 0;
  margin-bottom: 0;
  width: auto;
`;

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