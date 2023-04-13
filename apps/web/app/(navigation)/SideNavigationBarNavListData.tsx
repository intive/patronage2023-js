"use client";

import styled from "styled-components";

import { Icon, Avatar } from "ui";
import { SpanStyled } from "ui/NavList";

const AvatarStyled = styled(Avatar)`
  width: 28px;
  height: 28px;
`;

const IconStyled = styled(Icon)`
  background: white;
  padding: 4px;
  border-radius: 8px;
`;

export const BudgetsSubMenuNavListContents = [
  {
    ComponentToRender: (
      <>
        <IconStyled icon="payments" iconSize={24} />
        <SpanStyled>Bills</SpanStyled>
      </>
    ),
    href: "/budgets/bills",
    id: 1,
  },
  {
    ComponentToRender: (
      <>
        <IconStyled icon="subscriptions" iconSize={24} />
        <SpanStyled>Subscriptions</SpanStyled>
      </>
    ),
    href: "/budgets/subscriptions",
    id: 2,
  },
  {
    ComponentToRender: (
      <>
        <IconStyled icon="savings" iconSize={24} />
        <SpanStyled>Savings</SpanStyled>
      </>
    ),
    href: "/budgets/savings",
    id: 3,
  },
];

export const TeamSubMenuNavListContents = [
  {
    ComponentToRender: (
      <>
        <AvatarStyled src="/avatars/1.svg/" username="Leonard Hofstadter" />
        <SpanStyled>Leonard Hofstadter</SpanStyled>
      </>
    ),
    href: "/team/1",
    id: 1,
  },
  {
    ComponentToRender: (
      <>
        <AvatarStyled src="/avatars/2.svg/" username="Howard Wolowitz" />
        <SpanStyled>Howard Wolowitz</SpanStyled>
      </>
    ),
    href: "/team/2",
    id: 2,
  },
  {
    ComponentToRender: (
      <>
        <AvatarStyled src="/avatars/3.svg/" username="Rajesh Koothrappali" />
        <SpanStyled>Rajesh Koothrappali</SpanStyled>
      </>
    ),
    href: "/team/3",
    id: 3,
  },
];

export const SettingsSubMenuNavListContents = [
  {
    ComponentToRender: <span>Edit profile</span>,
    href: "/settings/edit-profile",
    id: 1,
  },
  {
    ComponentToRender: <span>Change password</span>,
    href: "/settings/change-password",
    id: 2,
  },
  {
    ComponentToRender: <span>Language</span>,
    href: "/settings/change-language",
    id: 3,
  },
];
