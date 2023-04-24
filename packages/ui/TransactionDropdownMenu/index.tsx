"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icon } from "ui";
import styled from "styled-components";
import { PropsWithChildren } from "react";
import { useTranslate } from "../../../apps/web/lib/hooks/useTranslate";

type TransactionDropdownMenuProps = {
  side: "top" | "right" | "bottom" | "left";
} & PropsWithChildren;

const DropdownMenuTriggerStyled = styled(DropdownMenu.Trigger)`
  background-color: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;

  &:focus {
    outline: ${({ theme }) => theme.transactionDropdownMenu.outlineFocus};
  }
`;

const IconStyled = styled(Icon)`
  color: ${({ theme }) => theme.transactionDropdownMenu.iconColor};
`;

const DropdownMenuContentStyled = styled(DropdownMenu.Content)`
  margin: 8px;
  border: 1px solid ${({ theme }) => theme.transactionDropdownMenu.contentBorder};
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
    0px 2px 4px rgba(32, 37, 50, 0.03);
  border-radius: 16px;
  background-color: white;
  overflow: hidden;
`;

//item is created here, because DropdownMenu.Item is necessary anyway for dropdown proper functionality
export const DropdownMenuItemStyled = styled(DropdownMenu.Item)`
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;

  &:focus {
    outline: ${({ theme }) => theme.transactionDropdownMenu.outlineFocus};
  }
  &:hover {
    background: ${({ theme }) => theme.transactionDropdownMenu.backgroundHover};
  }
`;

export const TransactionDropdownMenu = ({
  side,
  children,
}: TransactionDropdownMenuProps) => {
  // const { t, dict } = useTranslate("BudgetsPage");
  return (
    <DropdownMenu.Root>
      <DropdownMenuTriggerStyled asChild>
        <button aria-label={"aria"}>
          <IconStyled icon="more_vert" />
        </button>
      </DropdownMenuTriggerStyled>
      <DropdownMenu.Portal>
        <DropdownMenuContentStyled side={side}>
          {children}
        </DropdownMenuContentStyled>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
