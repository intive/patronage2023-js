"use client";
import {
  CardWrapperStyled,
  CardStyled as MainCard,
} from "./HomePageComponents";
import { device } from "lib/media-queries";
import styled from "styled-components";
import { ReactElement } from "react";

type MultiCardLayoutProps = {
  main: ReactElement;
  aside?: ReactElement;
};

const AsideCard = styled(MainCard)`
  display: none;
  ${device.desktop} {
    &:empty {
      visibility: hidden;
    }
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: max-content;
    min-width: 250px;
    min-height: 220px;
    margin-left: 20px;
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
