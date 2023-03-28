"use client";

import { device } from "lib/css-variables";
import styled from "styled-components";
import { Background } from "ui";

export type LayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <ViewStyled>
      <Background>
        <PageContainerStyled>{children}</PageContainerStyled>
      </Background>
    </ViewStyled>
  );
}

const ViewStyled = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1e4c40;
`;

const PageContainerStyled = styled.div`
  width: 100%;

  @media ${device.desktop} {
    margin: 0 auto;
    max-width: 1200px;
  }
`;
