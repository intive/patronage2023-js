"use client";

import { device } from "lib/css-variables";
import styled from "styled-components";
import { Background, Card, Logo } from "ui";
import { useTranslate } from "lib/hooks";

import { usePathname } from "next/navigation";

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
    </BackgroundFlex>
  );
}

const BackgroundFlex = styled(Background)`
  display: flex;
`;

const PageContainerStyled = styled.div`
  min-height: 100%;
  display: flex;
  width: 100%;
  @media ${device.desktop} {
    max-width: 1080px;
  }
`;

const ContentStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.desktop} {
    flex-direction: row;
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
  padding: 8px;

  @media ${device.desktop} {
    width: 50%;
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
`;
