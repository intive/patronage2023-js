"use client";

import { Logo, ToastHoast } from "ui";
import { useTranslate } from "lib/hooks";

import { usePathname } from "next/navigation";
import {
  BackgroundFlex,
  ContentStyled,
  CustomCard,
  FormWrapperStyled,
  H1Styled,
  LanguageSelectorWrapper,
  ParagraphStyled,
  SectionStyled,
  TypoStyled,
} from "./layout.styles";
import { LanguageSelector } from "components/Navbar/LanguageSelector";

export type LayoutProps = {
  children: React.ReactNode;
};

export default function RegFlowLayout({ children }: LayoutProps) {
  const pathName = usePathname();
  const { t, dict } = useTranslate("RegFlowLayout");
  const { signIn, signUp } = dict;

  type leftColumnText = {
    signIn: {
      h1: string;
      p: string;
    };
    signUp: {
      h1: string;
      p: string;
    };
  };

  const leftColumnText = {
    signIn: {
      h1: t(signIn.h1),
      p: t(signIn.paragraph),
    },
    signUp: {
      h1: t(signUp.h1),
      p: t(signUp.paragraph),
    },
  };

  const getLeftColumnText = (element: string) => {
    if (pathName === "/sign-in")
      return leftColumnText.signIn[
        element as keyof typeof leftColumnText.signIn
      ];
    if (pathName === "/sign-up")
      return leftColumnText.signUp[
        element as keyof typeof leftColumnText.signIn
      ];
  };

  return (
    <BackgroundFlex>
      <ToastHoast />
      <ContentStyled>
        <SectionStyled>
          <TypoStyled>
            <Logo logoWidth={138} white />
            <H1Styled>{getLeftColumnText("h1")}</H1Styled>
            <ParagraphStyled>{getLeftColumnText("p")}</ParagraphStyled>
          </TypoStyled>
        </SectionStyled>
        <FormWrapperStyled>
          <CustomCard>
            <LanguageSelectorWrapper>
              <LanguageSelector variant={"descriptive"} />
            </LanguageSelectorWrapper>
            {children}
          </CustomCard>
        </FormWrapperStyled>
      </ContentStyled>
    </BackgroundFlex>
  );
}
