"use client";

import { useState } from "react";
import styled from "styled-components";
import { Icon } from "ui";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useTranslate } from "../../../apps/web/lib/hooks";

export type CreateIncomeExpenseButtonProps = {
  openNewIncome: () => void;
  openNewExpense: () => void;
};

const StyledButton = styled.button`
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: 2px solid ${({ theme }) => theme.button.primary.main};
  border-radius: 8px;
  color: white;
  background-color: ${({ theme }) => theme.button.primary.main};
  font-weight: 600;
  padding: 12px 14px 12px 24px;
  font-size: 1em;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border: 2px solid ${({ theme }) => theme.button.primary.hover};
    background-color: ${({ theme }) => theme.button.primary.hover};
  }
`;

const DropdownMenuContentStyled = styled(DropdownMenu.Content)`
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.15);
  border-radius: 16px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.card.border};
`;

export const DropdownMenuItemStyled = styled(DropdownMenu.Item)`
  width: 288px;
  padding: 16px;
  font-size: 16px;
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

export const CreateIncomeExpenseButton = ({ openNewIncome, openNewExpense }: CreateIncomeExpenseButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, dict } = useTranslate("BudgetsPage");
  const { createButton } = dict;

  return (
    <>
      <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger asChild>
          <StyledButton>
            {t(createButton.label)}
            <Icon
              color="white"
              icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
              iconSize={30}
            />
          </StyledButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenuContentStyled align="start">
            <DropdownMenuItemStyled
              onClick={openNewIncome}>
              {t(createButton.newIncome)}
            </DropdownMenuItemStyled>
            <DropdownMenuItemStyled
              onClick={openNewExpense}>
              {t(createButton.newExpense)}
            </DropdownMenuItemStyled>
          </DropdownMenuContentStyled>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};
