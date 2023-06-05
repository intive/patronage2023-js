"use client";

import { device } from "lib/media-queries";
import styled from "styled-components";
import { Background, Card } from "ui";

export const BackgroundFlex = styled(Background)`
  display: flex;
  justify-content: center;
  align-items: center;

  ${device.tablet} {
    background-attachment: fixed;
    background-position: right -300px center;
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
    justify-content: center;
    gap: 2rem;
  }

  ${device.desktop} {
    gap: 0;
  }

  ${device.tv} {
    max-width: 1440px;
  }
`;

export const SectionStyled = styled.div`
  color: white;
  padding-top: 52px;
  width: 100%;
  display: flex;
  justify-content: center;

  ${device.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 40%;
    padding: 0;
    margin-left: 3rem;
  }

  ${device.desktop} {
    margin-left: 4rem;
  }
`;

export const TypoStyled = styled.div`
  width: 343px;
  height: 155px;

  ${device.tablet} {
    width: auto;
    height: 255px;
  }

  ${device.desktop} {
    height: 220px;
    max-width: 580px;
  }
`;

export const FormWrapperStyled = styled.div`
  overflow-x: auto;

  ${device.tablet} {
    width: 60%;
    margin-right: 2rem;
    padding: 2rem 0;
  }

  ${device.desktop} {
    margin-right: 3rem;
    padding: 3rem;
  }
`;

export const H1Styled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin-top: 1rem;

  ${device.tablet} {
    margin-top: 2rem;
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
  position: relative;
  padding: 3rem;

  ${device.tablet} {
    padding: 3rem 1rem;
  }

  ${device.desktop} {
    padding: 5rem 2rem;
  }
`;

export const LanguageSelectorWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;

  ${device.desktop} {
  }
`;
