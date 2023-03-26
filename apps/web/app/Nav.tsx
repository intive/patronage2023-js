"use client";

import styled from "styled-components";
import { Icon, Logo } from "ui";
import avatar from "../../../packages/ui/helper-imgs/3d_avatar_21.png"
import Image from "next/image";

const NavBar = styled.nav`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  background-color: #1e4c40;
  margin:0;
  padding: 15px 20px 15px 40px;
  justify-content: space-between;
`;

const ActionWrapper = styled.div`
  display: flex;
  min-width: 150px;
  justify-content: space-around;
  align-items: center;
`;

const IconWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`
//Image will be replaced by Avatar
export default function Nav() {
  return (
    <NavBar>
      <Logo white />
      <ActionWrapper>
        <IconWrapper><Icon icon={"notifications"} color={"white"}/></IconWrapper>
        <Image src={avatar} width={30} height={30} alt="avatar"></Image>
      </ActionWrapper>
    </NavBar>
  );
}
