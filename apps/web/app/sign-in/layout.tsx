"use client";

import styled from "styled-components";
import { Background, Card, Logo } from "ui";

export type LayoutProps = {
  children: React.ReactNode;
};

const device = {
  mobile: `(max-width: 767px)`,
  desktop: `(min-width: 768px)`,
};

export default function SignInLayout({ children }: LayoutProps) {
  return (
    <ViewStyled>
      <PageContainerStyled>
        <Background>
          <ContentStyled>
            <SectionStyled>
              <Logo logoWidth={90} white />
              <StyledH1>Get started with your free account today</StyledH1>
              <StyledP>No credit card required</StyledP>
            </SectionStyled>
            <FormWrapperStyled>
              <Card minHeight="100%">{children}</Card>
            </FormWrapperStyled>
          </ContentStyled>
        </Background>
      </PageContainerStyled>
    </ViewStyled>
  );
}

const ViewStyled = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1e4c40;
`;

const PageContainerStyled = styled.div`
  width: 100%;

  @media ${device.desktop} {
    margin: 0 auto;
    max-width: 1200px;
  }
`;

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media ${device.desktop} {
    flex-direction: row;
    width: 100%;
  }
`;

const SectionStyled = styled.div`
  color: white;
  width: 100%;
  padding: 52px 16px 0px 16px;

  @media ${device.desktop} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    padding: 64px;
  }
`;

const FormWrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;

  @media ${device.desktop} {
    height: 100vh;
    padding: 12vh 64px;
  }
`;

const StyledH1 = styled.h1`
  display: block;
  font-family: "Signika", sans-serif;
  font-size: 1.5em;
  line-height: 1.5em;
  margin-top: 16px;

  @media ${device.desktop} {
    margin-top: 32px;
    font-size: 40px;
    line-height: 40px;
  }
`;

const StyledP = styled.p`
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 24px;

  @media ${device.desktop} {
    margin-top: 16px;
  }
`;
