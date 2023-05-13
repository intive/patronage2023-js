"use client";
import {
  CardWrapperStyled,
  CardStyled as MainCard,
} from "./HomePageComponents";
import { device } from "lib/media-queries";
import styled from "styled-components";
import { ReactElement } from "react";
import { Card } from "ui";

type MultiCardLayoutProps = {
  main: ReactElement;
  aside: ReactElement;
};

const AsideCard = styled(Card)`
  display: none;
  ${device.desktop} {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: max-content;
    min-width: 288px;
    margin-left: 31px;
    padding: 32px;
  }
`;

export default function MultiCardLayout({ main, aside }: MultiCardLayoutProps) {
  return (
    <CardWrapperStyled>
      <MainCard>{main}</MainCard>
      <AsideCard>{aside}</AsideCard>
    </CardWrapperStyled>
  );
}
