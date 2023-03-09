"use client";

import Link from "next/link";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  width: 100%;
  background-color: #bbb;
  margin-bottom: 20px;
  padding: 10px 0;
  justify-content: flex-end;
`;

const ActionWrapper = styled.div`
  display: flex;
  min-width: 150px;
  padding: 0 20px;
  justify-content: space-between;
`;

export default function Nav() {
  return (
    <NavBar>
      <ActionWrapper>
        <Link href="/">Home</Link> <Link href="/users">Users</Link>
      </ActionWrapper>
    </NavBar>
  );
}
