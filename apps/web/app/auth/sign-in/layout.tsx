"use client";

import styled from "styled-components";
import { Card, Logo } from "ui";
import { LayoutProps } from "../layout";
import { device } from "lib/css-variables";

export default function SignInLayout({ children }: LayoutProps) {
  return (
    <ContentStyled>
      <SectionStyled>
        <Logo logoWidth={138} white />
        <H1Styled>Log in with your email</H1Styled>
        <ParagraphStyled>
          Use your email to log in to your team workspace
        </ParagraphStyled>
      </SectionStyled>
      <FormWrapperStyled>
        <Card minHeight="100%">{children}</Card>
      </FormWrapperStyled>
    </ContentStyled>
  );
}

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
