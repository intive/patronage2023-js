"use client";

import styled from "styled-components";
import { LayoutProps } from "app/layout";

const DivStyled = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

export default function SettingsLayout({ children }: LayoutProps) {
  return <DivStyled>{children}</DivStyled>;
}
