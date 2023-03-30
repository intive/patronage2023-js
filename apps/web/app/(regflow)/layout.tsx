"use client";

import { device } from "lib/css-variables";
import styled from "styled-components";
import { Background, Card, Logo } from "ui";

import { usePathname } from "next/navigation";

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
    <Background>
      <PageContainerStyled>
        <ContentStyled>
          <SectionStyled>
            <Logo logoWidth={138} white />
            <H1Styled>{getLeftColumnText("h1")}</H1Styled>
            <ParagraphStyled>{getLeftColumnText("p")}</ParagraphStyled>
          </SectionStyled>
          <FormWrapperStyled>
            <CustomCard>{children}</CustomCard>
          </FormWrapperStyled>
        </ContentStyled>
      </PageContainerStyled>
    </Background>
  );
}

const PageContainerStyled = styled.div`
  height: 100%;
  @media ${device.desktop} {
    margin: 0 auto;
    max-width: 1080px;
  }
`;

const ContentStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media ${device.desktop} {
    flex-direction: row;
    margin: 0 auto;
  }
`;

const SectionStyled = styled.div`
  color: white;

  padding: 52px 16px 0px 16px;

  @media ${device.desktop} {
    display: flex;
    width: 50%;
    flex-direction: column;
    justify-content: center;
    padding-left: 6%;
    padding-right: 3%;
  }
`;

const FormWrapperStyled = styled.div`
  overflow-x: auto;
  height: 100%;
  padding: 8px;

  @media ${device.desktop} {
    width: 50%;
    min-height: 100%;
    padding: 12% 2%;
  }
`;

const H1Styled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 1.5em;
  line-height: 1.5em;
  margin-top: 16px;

  @media ${device.desktop} {
    margin-top: 32px;
    font-size: 2.5em;
    line-height: 1em;
  }
`;

const ParagraphStyled = styled.p`
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 24px;

  @media ${device.desktop} {
    line-height: 24px;
    margin-top: 1em;
  }
`;

const CustomCard = styled(Card)`
  padding: 1em;
  min-height: 100%;
`;
