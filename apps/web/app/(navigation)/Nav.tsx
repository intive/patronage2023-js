"use client";

import styled from "styled-components";
import { Icon, Logo, Avatar } from "ui";

const NavBar = styled.nav`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  background-color: #1e4c40;
  margin:0;
  padding: 15px 20px 15px 40px;
  justify-content: space-between;
  z-index:1;
`;

const ActionWrapper = styled.div`
  display: flex;
  min-width: 150px;
  justify-content: space-around;
  align-items: center;
`;

const AvatarStyled = styled(Avatar)`
  height:2.1em;
  width:2.1em;
`
export default function Nav() {
  return (
    <NavBar>
      <Logo white />
      <ActionWrapper>
<<<<<<< HEAD:apps/web/app/Nav.tsx
        <LinkStyled href="/">Home</LinkStyled>{" "}
        <LinkStyled href="/users">Users</LinkStyled>
        <LinkStyled href="/log-in">LogIn</LinkStyled>
=======
        <Icon icon="notifications" color="white" />
        <AvatarStyled src="/avatar.svg" outlined />
>>>>>>> e23198fbd32e98d7ddc53a38d1f11060d96f7e5d:apps/web/app/(navigation)/Nav.tsx
      </ActionWrapper>
    </NavBar>
  );
}
