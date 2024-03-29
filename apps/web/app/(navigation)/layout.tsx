"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAtom } from "jotai";
import styled from "styled-components";
import Nav from "components/Navbar";
import SideNav from "components/SideNavigationBar";
import { LayoutProps } from "../layout";
import { ToastHoast } from "ui";
import { mobileMenuAtom } from "store";
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

const ContentNoUser = styled.div`
  flex-grow: 1;
  width: 100%;
  padding-left: 25px;
`;

const ContentUser = styled(ContentNoUser)`
  ${device.tablet} {
    padding-left: 94px;
  }
`;

const SideNavMobile = styled.div`
  ${device.tablet} {
    display: none;
  }
`;

const SideNavDesktop = styled.div`
  display: none;
  ${device.tablet} {
    display: block;
  }
`;

export default function NavigationLayout({ children }: LayoutProps) {
  const [isSideOpen, setSideOpen] = useAtom(mobileMenuAtom);
  const { data } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(event.target as Node)) {
        return;
      }
      setSideOpen(false);
    };

    const mainElement = document.querySelector("main") as HTMLElement;

    mainElement.addEventListener("mousedown", handleClickOutside);
    return () => {
      mainElement.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideOpen, setSideOpen]);

  useEffect(() => {
    setSideOpen(false);
  }, [path, setSideOpen]);

  return (
    <Wrapper>
      <Nav />
      <ToastHoast />
      <Main>
        <SideNavMobile ref={menuRef}>
          {isSideOpen && data && <SideNav />}
        </SideNavMobile>
        <SideNavDesktop>{data && <SideNav />}</SideNavDesktop>
        {data ? (
          <ContentUser>{children}</ContentUser>
        ) : (
          <ContentNoUser>{children}</ContentNoUser>
        )}
      </Main>
    </Wrapper>
  );
}
