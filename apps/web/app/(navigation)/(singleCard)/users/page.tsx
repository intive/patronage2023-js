"use client";
import styled from "styled-components";
import UsersTableController from "./UsersTableController";
import { useTranslate } from "lib/hooks";

const PageWrapper = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  flex: 1;
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

  return (
    <PageWrapper>
      <TitleStyled>{t(title)}</TitleStyled>
      <UsersTableController />
    </PageWrapper>
  );
}
