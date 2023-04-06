"use client";
import { CardWrapperStyled, CardStyled } from "../HomePageComponents";
import { LayoutProps } from "app/layout";

export default function SingleCardLayout({ children }: LayoutProps) {
  return (
    <CardWrapperStyled>
      <CardStyled>{children}</CardStyled>
    </CardWrapperStyled>
  );
}
