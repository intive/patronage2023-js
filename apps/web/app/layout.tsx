"use client"
/* eslint-disable @next/next/no-head-element */
import { StyledComponentsRegistry } from "../lib/registry";
import { Inter } from "next/font/google";
import Nav from "./Nav";
import styled from "styled-components";
import SideNav from "./SideNav";

export type LayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  min-height:100%;
`

const Content = styled.div`
  flex-grow: 1;
`

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
        <Nav/>
        <Main>
          <SideNav/>
         <Content>{children}</Content>
        </Main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
