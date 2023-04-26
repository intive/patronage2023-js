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
