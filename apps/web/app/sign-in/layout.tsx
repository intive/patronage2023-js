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
            <TextWrapperStyled>
              <StyledInnerLeftContentWrapper>
                <Logo logoWidth={90} white />
                <StyledH1>Get started with your free account today</StyledH1>
                <p>No credit card</p>
              </StyledInnerLeftContentWrapper>
            </TextWrapperStyled>
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

  @media ${device.desktop} {
    flex-direction: row;
    width: 100%;
    height: 100vh;
  }
`;

const TextWrapperStyled = styled.div`
  color: "white";
  width: 100%;
  height: 30vh;
  padding: 52px 16px 16px 16px;
  display: flex;

  @media ${device.desktop} {
    height: 100vh;
  }
`;

const FormWrapperStyled = styled.div`
  height: 70vh;
  width: 100%;
  padding: 8px;
  justify-content: center;
  align-items: stretch;

  @media ${device.desktop} {
    height: 100vh;
    padding: 12vh 64px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const StyledInnerLeftContentWrapper = styled.div`
  color: white;
`;

const StyledH1 = styled.span`
  font-size: 1.5em;
`;
