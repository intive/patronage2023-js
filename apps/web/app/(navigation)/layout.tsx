"use client";

import styled from "styled-components";
import Nav from "../(navigation)/Nav";
import SideNav from "./SideNavigationBar";
import { LayoutProps } from "../layout";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;
const Main = styled.main`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  background-color: #e5e5e5;
`;
const Content = styled.div`
  flex-grow: 1;
`;
export default function NavigationLayout({ children }: LayoutProps) {
  return (
    <Wrapper>
      <Nav />
      <Main>
        <SideNav />
        <Content>{children}</Content>
      </Main>
    </Wrapper>
  );
}
