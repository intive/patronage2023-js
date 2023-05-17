import { languages } from "lib/contexts";
import * as Select from "@radix-ui/react-select";

import { Flag } from "ui";
import { ContentStyled, SelectTriggerStyled } from "./LanguageSelectorStyled";
import { useState, useEffect } from "react";

export const LanguageChanger = () => {
  const [language, setLanguage] = useState<string | null>("");

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    setLanguage(lang && localStorage.getItem("lang"));
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    window.localStorage.setItem("lang", lang);
    // window.location.reload();
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
