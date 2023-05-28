"use client";
import {
  CardWrapperStyled,
  CardStyled as MainCard,
  AsideCard,
} from "components/HomePage.styled";

import { ReactElement } from "react";

type MultiCardLayoutProps = {
  main: ReactElement;
  aside?: ReactElement;
};

export default function MultiCardLayout({ main, aside }: MultiCardLayoutProps) {
  return (
    <CardWrapperStyled>
      <MainCard>{main}</MainCard>
      <AsideCard>{aside}</AsideCard>
    </CardWrapperStyled>
  );
}
