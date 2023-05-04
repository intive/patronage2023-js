"use client";

import styled from "styled-components";

import { Icon } from "ui";
import { SpanStyled } from "ui/NavList";

const IconStyled = styled(Icon)`
  background: white;
  padding: 4px;
  border-radius: 8px;
`;

export const BudgetsSubMenuNavListContents = [
  {
    ComponentToRender: (
      <>
        <IconStyled icon="home" iconSize={24} />
        <SpanStyled>Main Budget</SpanStyled>
      </>
    ),
    href: "/budgets/71ee9a04-6b27-423a-9caa-7d6a92335dae",
    id: 1,
  },
  {
    ComponentToRender: (
      <>
        <IconStyled icon="subscriptions" iconSize={24} />
        <SpanStyled>Subscriptions</SpanStyled>
      </>
    ),
    href: "/budgets/3694a39d-7ecd-4e08-b56a-5dc857c09237",
    id: 2,
  },
  {
    ComponentToRender: (
      <>
        <IconStyled icon="directions_car" iconSize={24} />
        <SpanStyled>Trip to London</SpanStyled>
      </>
    ),
    href: "/budgets/36cc0777-2874-4d0c-a389-91280e45e836",
    id: 3,
  },
  {
    ComponentToRender: (
      <>
        <IconStyled icon="payments" iconSize={24} />
        <SpanStyled>Praca</SpanStyled>
      </>
    ),
    href: "/budgets/b9d8ef2d-90df-4ee6-b34f-edfb3b90f2de",
    id: 4,
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
