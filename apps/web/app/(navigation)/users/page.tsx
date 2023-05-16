"use client";
import styled from "styled-components";
import MultiCardLayout from "../MultiCardLayout";

const TitleStyled = styled.h1`
  align-self: flex-start;
  width: 100%;
  font-family: "Signika", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  color: ${({ theme }) => theme.main};
`;

export default function UsersPage() {
  const mainCardContent = <TitleStyled>Users</TitleStyled>;
  const data = "Some user info";
  const shown = true;
  //conditionally render aside if needed e.g. pass user info to it etc.
  return (
    <MultiCardLayout
      main={mainCardContent}
      aside={shown ? <>{data}</> : <></>}
    />
  );
}
