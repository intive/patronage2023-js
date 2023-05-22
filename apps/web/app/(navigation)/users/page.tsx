"use client";
import styled from "styled-components";
import MultiCardLayout from "../MultiCardLayout";
import UsersTableController from "./UsersTableController";
import { useTranslate } from "lib/hooks";


const PageWrapper = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
`;

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
  const { t, dict } = useTranslate("UsersPage");
  const { title } = dict;

  const mainCardContent = (
    <>
      <PageWrapper>
        <TitleStyled>{t(title)}</TitleStyled>
        <UsersTableController />
      </PageWrapper>
    </>
  );
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
