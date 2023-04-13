"use client";

import { useTranslate } from "lib/hooks";
import { TypoStyled } from "../../HomePageComponents";

export default function WelcomePageTranslated() {
  const { dict, t } = useTranslate("WelcomePage");
  return <TypoStyled>{t(dict.welcomeText)}</TypoStyled>;
}
