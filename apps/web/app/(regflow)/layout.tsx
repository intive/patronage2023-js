"use client";

import { Logo } from "ui";

import { usePathname } from "next/navigation";
import {
  BackgroundFlex,
  ContentStyled,
  CustomCard,
  FormWrapperStyled,
  H1Styled,
  ParagraphStyled,
  SectionStyled,
  TypoStyled,
} from "./layout.styles";

export type LayoutProps = {
  children: React.ReactNode;
};

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
    h1: "Log in with your email",
    p: "Use your email to log in to your team workspace",
  },
  signUp: {
    h1: "Get started with your free account today",
    p: "No credit card required",
  },
};

export default function RegFlowLayout({ children }: LayoutProps) {
  const pathName = usePathname();

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
      <ContentStyled>
        <SectionStyled>
          <TypoStyled>
            <Logo logoWidth={138} white />
            <H1Styled>{getLeftColumnText("h1")}</H1Styled>
            <ParagraphStyled>{getLeftColumnText("p")}</ParagraphStyled>
          </TypoStyled>
        </SectionStyled>
        <FormWrapperStyled>
          <CustomCard>{children}</CustomCard>
        </FormWrapperStyled>
      </ContentStyled>
    </BackgroundFlex>
  );
}
