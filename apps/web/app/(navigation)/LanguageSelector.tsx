import { languages } from "lib/contexts";
import * as Select from "@radix-ui/react-select";

import { Flag } from "ui";
import {
  SelectContentStyled,
  SelectPortalStyled,
  SelectTriggerStyled,
} from "./LanguageSelectorStyled";
import { useEffect } from "react";
import { languageAtom } from "app/store";
import { useSetAtom, useAtomValue } from "jotai";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";

export const LanguageSelector = () => {
  const { hasScrollbar } = useHasScrollBar();
  const setLanguage = useSetAtom(languageAtom);
  const language = useAtomValue(languageAtom);

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    lang && setLanguage((localStorage.getItem("lang") as languages) || "en");
  }, [setLanguage, language]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang as languages);
    localStorage.setItem("lang", lang);
  };

  const items = [
    { lang: "pl", flagSrc: "/flags/pl.svg", languageName: "Polish" },
    { lang: "en", flagSrc: "/flags/en.svg", languageName: "English" },
    { lang: "fr", flagSrc: "/flags/fr.svg", languageName: "French" },
  ];

  return (
    <Select.Root
      value={(language as languages) || "en"}
      onValueChange={(lang) => {
        changeLanguage(lang as languages);
      }}>
      <SelectTriggerStyled>
        <Select.Value>{<Flag src={`/flags/${language}.svg`} />}</Select.Value>
      </SelectTriggerStyled>

      <SelectPortalStyled className={hasScrollbar ? "radix-scroll" : ""}>
        <SelectContentStyled align="start" sideOffset={5}>
          <Select.Viewport>
            {items.map((item) => (
              <Select.Item value={item.lang} key={item.lang}>
                <Flag src={item.flagSrc} />
                <Select.ItemText>{item.languageName}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </SelectContentStyled>
      </SelectPortalStyled>
    </Select.Root>
  );
};
