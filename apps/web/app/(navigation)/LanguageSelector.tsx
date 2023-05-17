import { languages } from "lib/contexts";
import * as Select from "@radix-ui/react-select";

import { Flag } from "ui";
import { ContentStyled, SelectTriggerStyled } from "./LanguageSelectorStyled";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { languageAtom } from "app/store";

export const LanguageSelector = () => {
  const [language, setLanguage] = useAtom(languageAtom);

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    lang && setLanguage((localStorage.getItem("lang") as languages) || "en");
  }, [language]);

  const items = [
    { lang: "pl", flagSrc: "/flags/pl.svg", languageName: "Polish" },
    { lang: "en", flagSrc: "/flags/en.svg", languageName: "English" },
    { lang: "fr", flagSrc: "/flags/fr.svg", languageName: "French" },
  ];

  return (
    <Select.Root
      value={(language as languages) || "en"}
      onValueChange={(lang) => {
        setLanguage(lang as languages);
      }}>
      <SelectTriggerStyled>
        <Select.Value>{<Flag src={`/flags/${language}.svg`} />}</Select.Value>
      </SelectTriggerStyled>

      <Select.Portal>
        <ContentStyled position="popper" align="start" sideOffset={5}>
          <Select.Viewport>
            {items.map((item) => (
              <Select.Item value={item.lang} key={item.lang}>
                <Flag src={item.flagSrc} />
                <Select.ItemText>{item.languageName}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </ContentStyled>
      </Select.Portal>
    </Select.Root>
  );
};
