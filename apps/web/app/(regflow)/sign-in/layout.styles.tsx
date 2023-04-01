"use client";

import { device } from "lib/css-variables";
import styled from "styled-components";
import { Background, Card } from "ui";

export const BackgroundFlex = styled(Background)`
  display: flex;
`;

export const PageContainerStyled = styled.div`
  min-height: 100%;
  display: flex;
  width: 100%;
  @media ${device.desktop} {
    max-width: 1080px;
  }
`;

export const ContentStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.desktop} {
    flex-direction: row;
  }
`;

export const SectionStyled = styled.div`
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

export const FormWrapperStyled = styled.div`
  overflow-x: auto;
  padding: 8px;

  @media ${device.desktop} {
    width: 50%;
  }
`;

export const H1Styled = styled.h1`
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

export const ParagraphStyled = styled.p`
  font-family: "Inter", sans-serif;
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 24px;

  @media ${device.desktop} {
    line-height: 24px;
    margin-top: 1em;
  }
`;

export const CustomCard = styled(Card)`
  padding: 1em;
`;
