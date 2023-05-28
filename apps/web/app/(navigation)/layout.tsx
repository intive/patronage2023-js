"use client";

import styled from "styled-components";
import Nav from "components/Navbar";
import SideNav from "components/SideNavigationBar";
import { LayoutProps } from "../layout";
import { ToastHoast } from "ui";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.background.loggedIn};
  padding-top: 68px;
`;

const Content = styled.div`
  flex-grow: 1;
  width: 100%;
  padding-left: 94px;
`;

export default function NavigationLayout({ children }: LayoutProps) {
  return (
    <Wrapper>
      <Nav />
      <ToastHoast />
      <Main>
        <SideNav />
        <Content>{children}</Content>
      </Main>
    </Wrapper>
  );
}
