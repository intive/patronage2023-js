import * as Select from "@radix-ui/react-select";

import { Flag } from "ui";
import {
  SelectContentStyled,
  SelectItemStyled,
  SelectTriggerStyled,
} from "./LanguageSelectorStyled";
import { languageAtom, languages } from "app/store";
import { useSetAtom, useAtomValue } from "jotai";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";

export const LanguageSelector = () => {
  const { hasScrollbar } = useHasScrollBar();
  const setLanguage = useSetAtom(languageAtom);
  const language = useAtomValue(languageAtom);

  const changeLanguage = (lang: string) => {
    setLanguage(lang as languages);
    localStorage.setItem("lang", lang);
  };

  const items = [
    {
      lang: "pl",
      flagSrc: "/flags/pl.svg",
      languageName: "Polski",
      alt: "Flag of Poland",
    },
    {
      lang: "en",
      flagSrc: "/flags/en.svg",
      languageName: "English",
      alt: "Flag of UK",
    },
    {
      lang: "fr",
      flagSrc: "/flags/fr.svg",
      languageName: "Français",
      alt: "Flag of France",
    },
  ];

  return (
    <Select.Root
      value={language || "en"}
      onValueChange={(lang) => {
        changeLanguage(lang);
      }}>
      <SelectTriggerStyled>
        <Select.Value>
          {
            <Flag
              src={`/flags/${language}.svg`}
              alt={`Flag - ${language.toUpperCase()}`}
            />
          }
        </Select.Value>
      </SelectTriggerStyled>

      <Select.Portal className={hasScrollbar ? "radix-scroll" : ""}>
        <SelectContentStyled position="popper" align="center" sideOffset={5}>
          <Select.Viewport>
            {items.map((item) => (
              <SelectItemStyled value={item.lang} key={item.lang}>
                <Flag src={item.flagSrc} alt={item.alt} />
                <Select.ItemText>{item.languageName}</Select.ItemText>
              </SelectItemStyled>
            ))}
          </Select.Viewport>
        </SelectContentStyled>
      </Select.Portal>
    </Select.Root>
  );
};
