"use client";

import styled from "styled-components";
import { Icon, Logo, Avatar, Flag } from "ui";

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
  justify-content: space-around;
  align-items: center;
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
        <Flag src="/flags/pl.svg" />
        <Flag src="/flags/fr.svg" />
        <Flag src="/flags/gb.svg" />
        <Icon icon="notifications" color="white" />
        <AvatarStyled src="/avatar.svg" outlined />
      </ActionWrapper>
    </NavBar>
  );
}
