import type { Metadata } from "next";
import { TypoStyled, LinkStyled } from "../HomePage";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function MainPage() {
  return (
    <>
      <TypoStyled>Welcome to Inbudget</TypoStyled>
      <LinkStyled href="/sign-in">Create my free account!</LinkStyled>
    </>
  );
}
