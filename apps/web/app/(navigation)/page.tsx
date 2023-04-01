import {
  CardWrapperStyled,
  CardStyled,
  LinkStyled,
} from "../(navigation)/main-page-components";
import { TypoStyled } from "./home/page";
import type { Metadata } from "next";
import dictionary from "lib/dictionary";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function CreateAccountPage() {
  const t = dictionary.CreateAccountPage;
  return (
    <CardWrapperStyled>
      <CardStyled>
        <TypoStyled>{t.welcomeText.en}</TypoStyled>
        <LinkStyled href="/sign-in">{t.createAccountLink.en}</LinkStyled>
      </CardStyled>
    </CardWrapperStyled>
  );
}
