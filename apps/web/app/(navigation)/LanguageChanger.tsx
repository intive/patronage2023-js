import { languages } from "lib/contexts";
import * as Select from "@radix-ui/react-select";

import { Flag } from "ui";
import { ContentStyled } from "./LanguageChangerStyled";
import { useState } from "react";

export const LanguageChanger = () => {
  const [language, setLanguage] = useState(localStorage.getItem("lang"));

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    window.location.reload();
  };

  const items = [
    {
      flagSrc: "/flags/pl.svg",
      languageName: "Polish",
    },
    {
      flagSrc: "/flags/en.svg",
      languageName: "English",
    },
    {
      flagSrc: "/flags/fr.svg",
      languageName: "French",
    },
  ];

  return (
    <Select.Root
      value={(language as languages) || "en"}
      onValueChange={(lang) => {
        changeLanguage(lang as languages);
      }}>
      <Select.Trigger>
        <Select.Value>{<Flag src={`/flags/${language}.svg`} />}</Select.Value>
      </Select.Trigger>

      <Select.Portal>
        <ContentStyled position="popper" sideOffset={5}>
          <Select.Viewport>
            <Select.Item value={"fr"} onClick={() => changeLanguage("fr")}>
              <Flag src="/flags/fr.svg" />
              <Select.ItemText>French</Select.ItemText>
            </Select.Item>
            <Select.Item value={"pl"} onClick={() => changeLanguage("pl")}>
              Polish
              <Select.ItemText> fdgdg</Select.ItemText>
            </Select.Item>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </ContentStyled>
      </Select.Portal>
    </Select.Root>
    // <Select.Root value={language}>
    //   <Select.Trigger asChild>
    //     <Select.Value placeholder="test" />
    //   </Select.Trigger>

    //   <Select.Portal>
    //     <Select.Content position="popper">
    //       <Select.Viewport>
    //         <Select.Group>
    //           {items.map((item) => (
    //             <Select.Item
    //               onClick={item.onClick}
    //               key={item.languageName}
    //               value={item.languageName}>
    //               <Flag src={item.flagSrc} />
    //               <Select.ItemText>{item.languageName}</Select.ItemText>
    //             </Select.Item>
    //           ))}
    //         </Select.Group>
    //       </Select.Viewport>
    //     </Select.Content>
    //   </Select.Portal>
    // </Select.Root>
  );
};
