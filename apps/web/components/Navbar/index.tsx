"use client";

import { useContext } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { useSession } from "next-auth/react";
import styled, { ThemeContext } from "styled-components";
import { useAtom } from "jotai";
import { useTranslate } from "lib/hooks";
import { device } from "lib/media-queries";
import { LanguageSelector } from "./LanguageSelector";

import { Logo } from "ui";
import { mobileMenuAtom } from "store";
import { MainMenu } from "app/(navigation)/MainMenu";

const NavBar = styled.nav`
  box-sizing: border-box;
  display: flex;
  background-color: ${({ theme }) => theme.nav.main};
  margin: 0;
  padding: 15px 15px;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  position: fixed;
  width: 100%;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

const BurgerWrapper = styled.div`
  ${device.tablet} {
    display: none;
  }
`;

export default function Nav() {
  const { data } = useSession();
  const [isSideOpen, setSideOpen] = useAtom(mobileMenuAtom);
  const theme = useContext(ThemeContext);
  const { t, dict } = useTranslate("NavigationLayout");
  const { burgerMenuLabel } = dict;

  const toggleMenu = () => {
    setSideOpen((prev) => !prev);
  };

  return (
    <NavBar>
      {data && (
        <BurgerWrapper>
          <Hamburger
            label={t(burgerMenuLabel)}
            color={theme.nav.burgerMenu}
            rounded
            toggled={isSideOpen}
            toggle={toggleMenu}
          />
        </BurgerWrapper>
      )}
      <Logo white />
      <ActionWrapper>
        <LanguageSelector variant={"flag"} />
        <MainMenu />
      </ActionWrapper>
    </NavBar>
  );
}
