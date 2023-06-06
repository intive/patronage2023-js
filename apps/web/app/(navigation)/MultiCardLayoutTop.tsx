"use client";

import {
  CardWrapperStyled,
  CardStyledTop as MainCard,
  AsideCard,
} from "components/HomePage.styled";

import { ReactElement } from "react";

type MultiCardLayoutProps = {
  main: ReactElement;
  aside?: ReactElement;
};

export default function MultiCardLayoutTop({
  main,
  aside,
}: MultiCardLayoutProps) {
  return (
    <CardWrapperStyled>
      <MainCard>{main}</MainCard>
      <AsideCard>{aside}</AsideCard>
    </CardWrapperStyled>
  );
}
