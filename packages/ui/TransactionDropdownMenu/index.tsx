"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icon } from "ui";
import styled from "styled-components";
import { ReactElement } from "react";

//type for every item in DropdownMenu
type DropdownMenuSingleItem = {
  ComponentToRender?: ReactElement;
  id: string;
};

type TransactionDropdownMenuProps = {
  items: Array<DropdownMenuSingleItem>;
  side: "top" | "right" | "bottom" | "left";
  ariaLabel?: string;
};

const DropdownMenuTriggerStyled = styled(DropdownMenu.Trigger)`
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  padding: 8px;
  height: 28px;
  width: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus {
    outline: 2px solid
      ${({ theme }) => theme.transactionDropdownMenu.outlineFocus};
  }
`;

const IconStyled = styled(Icon)`
  color: ${({ theme }) => theme.transactionDropdownMenu.iconColor};
`;

const DropdownMenuContentStyled = styled(DropdownMenu.Content)`
  margin: 8px;
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
    0px 2px 4px rgba(32, 37, 50, 0.03);
  border-radius: 16px;
  background-color: white;
  overflow: hidden;
`;

export const DropdownMenuItemStyled = styled(DropdownMenu.Item)`
  padding: 6px 11px;
  font-size: 14px;
  border: 1px solid transparent;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  &:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  &:focus {
    border-color: ${({ theme }) => theme.transactionDropdownMenu.outlineFocus};
    background-color: ${({ theme }) =>
      theme.transactionDropdownMenu.activeBackground};
    outline: 0;
  }
  &:hover {
    background-color: ${({ theme }) =>
      theme.transactionDropdownMenu.activeBackground};
    outline: 0;
    border: 1px solid transparent;
  }
`;

export const TransactionDropdownMenu = ({
  items,
  side,
  ariaLabel,
}: TransactionDropdownMenuProps) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenuTriggerStyled asChild>
        <button aria-label={ariaLabel}>
          <IconStyled icon="more_vert" />
        </button>
      </DropdownMenuTriggerStyled>
      <DropdownMenu.Portal>
        <DropdownMenuContentStyled side={side}>
          {items.map((item) => {
            return (
              <DropdownMenuItemStyled key={item.id}>
                {item.ComponentToRender}
              </DropdownMenuItemStyled>
            );
          })}
        </DropdownMenuContentStyled>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
