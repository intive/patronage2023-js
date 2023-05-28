"use client";

import styled from "styled-components";
import { Logo } from "ui";
import { LanguageSelector } from "./LanguageSelector";
import { MainMenu } from "./MainMenu";

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

export default function Nav() {
  return (
    <NavBar>
      <Logo white />
      <ActionWrapper>
        <LanguageSelector />
        <MainMenu />
      </ActionWrapper>
    </NavBar>
  );
}
