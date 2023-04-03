"use client";

import { device } from "lib/media-queries";
import styled from "styled-components";
import { Background, Card } from "ui";

export const BackgroundFlex = styled(Background)`
  display: flex;
`;

export const ContentStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${device.desktop} {
    flex-direction: row;
    justify-content: center;
  }

  ${device.large} {
    gap: 6rem;
  }
`;

export const SectionStyled = styled.div`
  color: white;
  padding: 52px 16px 0px 16px;

  ${device.desktop} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 32px;
  }
`;

export const FormWrapperStyled = styled.div`
  overflow-x: auto;

  ${device.desktop} {
    padding: 16px;
  }
`;

export const H1Styled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin-top: 16px;

  ${device.desktop} {
    margin-top: 32px;
    font-size: 2.5rem;
    line-height: 2.5rem;
  }
`;

export const ParagraphStyled = styled.p`
  font-family: "Inter", sans-serif;
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 24px;

  ${device.desktop} {
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: 1rem;
  }
`;

export const CustomCard = styled(Card)`
  font-family: "Inter", sans-serif;
  padding: 1.5rem;

  ${device.desktop} {
    padding: 3rem;
  }
`;
