import { Language, languageAtom } from "store";
import { useAtom } from "jotai";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import { useTranslate } from "lib/hooks";
import { Flag } from "ui";
import { SelectLabelHiddenInTrigger } from "ui/Select/Select.styles";
import { SelectStyled } from "./LanguageSelector.styled";

type LanguageSelectorProps = {
  variant: "flag" | "descriptive";
};

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
            <span>Tekst</span>
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
      sideOffset={5}
    />
  );
};
