"use client";

import { device } from "lib/media-queries";
import styled from "styled-components";
import { Background, Card } from "ui";

export const BackgroundFlex = styled(Background)`
  display: flex;

  ${device.tablet} {
    background-attachment: fixed;
    background-position: right -370px center;
  }

  ${device.desktop} {
    background-position: right -60px center;
  }
`;

export const ContentStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${device.tablet} {
    flex-direction: row;
    justify-content: flex-end;
    gap: 3rem;
  }

  ${device.tv} {
    justify-content: center;
    gap: 10rem;
  }
`;

export const SectionStyled = styled.div`
  color: white;
  padding: 52px 16px 0px 16px;

  ${device.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 0;
    margin-left: 32px;

  }

  ${device.desktop} {
    margin-left: 64px;
  }

  ${device.tv} {
    flex-grow: 0;
  }
`;

export const TypoStyled = styled.div`
  max-width: 415px;
`

export const FormWrapperStyled = styled.div`
  overflow-x: auto;

  ${device.tablet} {
    padding-right: 32px;
  }
  ${device.desktop} {
    padding-right: 64px;
  }
`;

export const H1Styled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin-top: 16px;

  ${device.tablet} {
    margin-top: 32px;
    font-size: 2.5rem;
    line-height: 2.5rem;
  }
`;

export const ParagraphStyled = styled.p`
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 24px;

  ${device.tablet} {
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: 1rem;
  }
`;

export const CustomCard = styled(Card)`
  padding: 1.5rem;

  ${device.tablet} {
    padding: 2.5rem;
  }

  ${device.desktop} {
    padding: 5rem;
  }
`;
