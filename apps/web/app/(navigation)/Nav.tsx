"use client";

import styled from "styled-components";
import { Logo, Avatar } from "ui";
import { LanguageSelector } from "./LanguageSelector";

const NavBar = styled.nav`
  box-sizing: border-box;
  display: flex;
  background-color: ${({ theme }) => theme.nav.main};
  margin: 0;
  padding: 15px 15px;
  justify-content: space-between;
  z-index: 10;
  position: fixed;
  width: 100%;
`;

const ActionWrapper = styled.div`
  display: flex;
  min-width: 150px;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const AvatarStyled = styled(Avatar)`
  height: 2.1em;
  width: 2.1em;
`;

export default function Nav() {
  return (
    <NavBar>
      <Logo white />
      <ActionWrapper>
        <LanguageSelector />
        <AvatarStyled src="/avatar.svg" outlined />
      </ActionWrapper>
    </NavBar>
  );
}
