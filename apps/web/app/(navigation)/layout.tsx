"use client";

import { useSession } from "next-auth/react";
import styled from "styled-components";
import Nav from "../(navigation)/Nav";
import SideNav from "./SideNavigationBar";
import { LayoutProps } from "../layout";
import { ToastHoast } from "ui";
import { hamburgerAtom } from "store";
import { useAtom } from "jotai";
import { device } from "lib/media-queries";

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

const ContentUser = styled.div`
  flex-grow: 1;
  width: 100%;
  padding-left: 25px;
  ${device.tablet} {
    padding-left: 94px;
  }
`;

const ContentNoUser = styled.div`
  flex-grow: 1;
  width: 100%;
  padding-left: 25px;
`;

const SideNavMobile = styled.div`
  ${device.tablet} {
    display: none;
  }
`;

const SideNavDesktop = styled.div`
  @media(max-width: 767px) {
    display: none;
  }
`;

export default function NavigationLayout({ children }: LayoutProps) {
  const [isOpen] = useAtom(hamburgerAtom); 
  const { data } = useSession();

  return (
    <Wrapper>
      <Nav />
      <ToastHoast />
      <Main>
        <SideNavMobile>
          {(isOpen && data) && <SideNav />}
        </SideNavMobile>
        <SideNavDesktop>
          {data && <SideNav />}
        </SideNavDesktop>
        {data ? <ContentUser>{children}</ContentUser> : <ContentNoUser>{children}</ContentNoUser>}
      </Main>
    </Wrapper>
  );
}
