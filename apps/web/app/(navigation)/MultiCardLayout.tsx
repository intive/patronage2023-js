"use client";
import { CardWrapperStyled, CardStyled } from "./HomePageComponents";
import { device } from "lib/media";
import styled from "styled-components";
import { ReactElement } from "react";

type MultiCardLayoutProps = {
  main: ReactElement;
  aside: ReactElement;
};

const MainCard = styled(CardStyled)``;
const AsideCard = styled(CardStyled)`
  display: none;
  @media ${device.desktop} {
    display:flex;
    align-self: flex-start;
    width: 320px;
    min-width: 250px;
    min-height: 220px;
    margin-left: 20px;
  }
`;

//did not yet applied dictionary, Checkbox component here is dummy
export default function MultiCardLayout({ main, aside }: MultiCardLayoutProps) {
  return (
    <CardWrapperStyled>
      <MainCard>{main}</MainCard>
      <AsideCard>{aside}</AsideCard>
    </CardWrapperStyled>
  );
}
