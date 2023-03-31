"use client";
import { CardWrapperStyled, CardStyled } from "../HomePage";
import { LayoutProps } from "app/layout";

export default function MultiCardLayout({ children }: LayoutProps) {
  return (
    <CardWrapperStyled>
      <CardStyled>{children}</CardStyled>
      <CardStyled>Placeholder</CardStyled>
    </CardWrapperStyled>
  );
}
