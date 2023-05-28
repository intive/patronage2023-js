"use client";
import { CardWrapperStyled, CardStyled } from "components/HomePage.styled";
import { LayoutProps } from "app/layout";

export default function SingleCardLayout({ children }: LayoutProps) {
  return (
    <CardWrapperStyled>
      <CardStyled>{children}</CardStyled>
    </CardWrapperStyled>
  );
}
