import {
  CardWrapperStyled,
  CardStyled,
  LinkStyled,
} from "../(navigation)/main-page-components";
import { TypoStyled } from "./home/page";
import type { Metadata } from "next";
import { useTranslate } from "lib/hooks";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function CreateAccountPage() {
  const { t, dict } = useTranslate("CreateAccountPage");

  return (
    <CardWrapperStyled>
      <CardStyled>
        <TypoStyled>{t(dict.welcomeText)}</TypoStyled>
        <LinkStyled href="/sign-in">{t(dict.createAccountLink)}</LinkStyled>
      </CardStyled>
    </CardWrapperStyled>
  );
}
