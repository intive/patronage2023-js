"use client";

import { useSession } from "next-auth/react";
import { Turn as Hamburger } from "hamburger-react";
import styled from "styled-components";
import { device } from "lib/media-queries";
import { LanguageSelector } from "./LanguageSelector";
import { Logo, Avatar } from "ui";
import { mobileMenuAtom } from "store";
import { useAtom } from "jotai";
import { useState } from "react";

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
  justify-content: flex-end;
  gap: 1rem;
`;

const AvatarStyled = styled(Avatar)`
  height: 2.1em;
  width: 2.1em;
`;

const BurgerWrapper = styled.div`
  ${device.tablet} {
    display: none;
  }
`;

export default function Nav() {
  const { data } = useSession();
  const [isSideOpen, setSideOpen] = useAtom(mobileMenuAtom);

  const toggleMenu = () => {
    setSideOpen((prev) => !prev);
  };

  return (
    <NavBar>
      {data && (
        <BurgerWrapper>
          <Hamburger
            label="Show menu"
            color="#FFF"
            rounded
            toggled={isSideOpen}
            toggle={toggleMenu}
          />
        </BurgerWrapper>
      )}
      <Logo white />
      <ActionWrapper>
        <LanguageSelector />
        {data && <AvatarStyled src={data.user.image} outlined />}
      </ActionWrapper>
    </NavBar>
  );
}
