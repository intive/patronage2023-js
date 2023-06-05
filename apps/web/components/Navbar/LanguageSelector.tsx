import { Language, languageAtom } from "store";
import { useAtom } from "jotai";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import { useTranslate } from "lib/hooks";
import { Flag, Select } from "ui";
import { SelectLabelHiddenInTrigger } from "ui/Select/Select.styles";
import styled from "styled-components";

type LanguageSelectorProps = {
  variant: "flag" | "descriptive";
};

const SelectStyled = styled(Select)`
  background-color: unset;
  border: 0;
  padding: 0;
  line-height: 0;
  margin-bottom: 0;
  width: auto;

  &:focus,
  &[data-state="open"] {
    outline: revert;
  }
`;

export const LanguageSelector = ({ variant }: LanguageSelectorProps) => {
  const { hasScrollbar } = useHasScrollBar();
  const [language, setLanguage] = useAtom(languageAtom);
  const { t, dict } = useTranslate("NavigationLayout");

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const items = [
    {
      lang: "pl",
      flagSrc: "/flags/pl.svg",
      languageName: "Polski",
      alt: t(dict.languageFlagAlts.polishFlag),
    },
    {
      lang: "en",
      flagSrc: "/flags/en.svg",
      languageName: "English",
      alt: t(dict.languageFlagAlts.britishFlag),
    },
    {
      lang: "fr",
      flagSrc: "/flags/fr.svg",
      languageName: "Français",
      alt: t(dict.languageFlagAlts.frenchFlag),
    },
  ];

  return (
    <SelectStyled
      items={items.map(({ lang, flagSrc, languageName, alt }) => ({
        value: lang,
        label: (
          <>
            <Flag src={flagSrc} alt={alt} />
            {variant === "descriptive" && (
              <>
                <span>{languageName}</span>
              </>
            )}
            {variant === "flag" && (
              <SelectLabelHiddenInTrigger>
                {languageName}
              </SelectLabelHiddenInTrigger>
            )}
          </>
        ),
      }))}
      value={language || "en"}
      onValueChange={(language) => {
        changeLanguage(language as Language);
      }}
      label=""
      hasIcon={variant === "descriptive"}
      hasScrollbar={hasScrollbar}
      sideOffset={5}
    />
  );
};
