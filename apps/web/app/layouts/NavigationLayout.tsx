"use client"

import styled from "styled-components";
import Nav from "../Nav";
import SideNav from "../SideNavigationBar";
import { LayoutProps } from "../layout";

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  min-height:100%;
`
const Content = styled.div`
  flex-grow: 1;
`
export default function NavigationLayout({ children }: LayoutProps) {
  return (
    <>
        <Nav/>
        <Main>
            <SideNav/>
            <Content>{children}</Content>
        </Main>
    </>
  )
}
