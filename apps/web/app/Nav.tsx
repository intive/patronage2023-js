"use client";

import Link from "next/link";
import styled from "styled-components";
import { Icon, Logo } from "ui";

const NavBar = styled.nav`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  background-color: #1e4c40;
  margin-bottom: 20px;
  padding: 10px 20px 10px 40px;
  justify-content: space-between;
`;

const ActionWrapper = styled.div`
  display: flex;
  min-width: 150px;
  justify-content: space-between;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 1.5em;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Nav() {
  return (
    <NavBar>
      <Logo white />
      <ActionWrapper>
        <Icon icon={"notifications"} color={"white"}/>
        <LinkStyled href="/users">Users</LinkStyled>
      </ActionWrapper>
    </NavBar>
  );
}
