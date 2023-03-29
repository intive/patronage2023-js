"use client";

import { device } from "lib/css-variables";
import styled from "styled-components";
import { Background } from "ui";

export type LayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <Background>
      <PageContainerStyled>{children}</PageContainerStyled>
    </Background>
  );
}

const PageContainerStyled = styled.div`
  height: 100%;
  @media ${device.desktop} {
    margin: 0 auto;
    max-width: 1080px;
  }
`;
