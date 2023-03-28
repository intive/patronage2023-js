"use client";

import styled from "styled-components";
import { Background } from "ui";

export type LayoutProps = {
  children: React.ReactNode;
};

export const device = {
  mobile: `(max-width: 767px)`,
  desktop: `(min-width: 768px)`,
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
