"use client";
import { CardWrapperStyled, CardStyled } from "../HomePage";
import { LayoutProps } from "app/layout";
import { device } from "lib/media";
import styled from "styled-components";

const SingleCardStyled = styled(CardStyled)`
  @media ${device.desktop} {
    flex-grow: 1;
  }
`;
export default function SingleCardLayout({ children }: LayoutProps) {
  return (
    <CardWrapperStyled>
      <SingleCardStyled>{children}</SingleCardStyled>
    </CardWrapperStyled>
  );
}
