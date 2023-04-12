"use client";
import {
  CardWrapperStyled,
  CardStyled as MainCard,
} from "./HomePageComponents";
import { device } from "lib/media";
import styled from "styled-components";
import { ReactElement } from "react";

type MultiCardLayoutProps = {
  main: ReactElement;
  aside: ReactElement;
};

const AsideCard = styled(MainCard)`
  display: none;
  @media ${device.desktop} {
    display: flex;
    align-self: flex-start;
    width: 320px;
    min-width: 250px;
    min-height: 220px;
    margin-left: 20px;
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
