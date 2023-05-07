"use client";

import { useState } from "react";
import styled from "styled-components";
import { Icon } from "ui";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { device } from "../../../apps/web/lib/media-queries";

export type ButtonWithDropdownProps = {
  label: string;
  items: ButtonWithDropdownItem[];
};

export type ButtonWithDropdownItem = {
  label: string;
  callback: () => void;
};

const StyledButton = styled.button`
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  
  border: 2px solid ${({ theme }) => theme.button.primary.main};
  border-radius: 8px;
  color: white;
  background-color: ${({ theme }) => theme.button.primary.main};
  font-weight: 600;
  font-size: 0.9em;
  transition: all 0.2s;
  cursor: pointer;
  padding: 5px 2px 5px 8px;
  ${device.tablet}{
    padding: 9px 12px 9px 22px;
    font-size: 1em;
    gap: 4px;
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.button.primary.hover};
    background-color: ${({ theme }) => theme.button.primary.hover};
  }
`;

const DropdownMenuContentStyled = styled(DropdownMenu.Content)`
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
    0px 2px 4px rgba(32, 37, 50, 0.03);
  border-radius: 16px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.card.border};
  ${device.tablet} {
    width: 288px;
  }
`;

const DropdownMenuItemStyled = styled(DropdownMenu.Item)`
  padding: 10px;
  font-size: 14px;
  border: 1px solid transparent;
  cursor: pointer;

  ${device.tablet} {
    padding: 16px;
    font-size: 16px;
  }

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

export const ButtonWithDropdown = ({ label, items }: ButtonWithDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger asChild>
          <StyledButton>
            { label }
            <Icon
              color="white"
              icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
              iconSize={30}
            />
          </StyledButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenuContentStyled align="start">
            { items.map( item => <DropdownMenuItemStyled key={item.label} onClick={item.callback}>{item.label}</DropdownMenuItemStyled> )}
          </DropdownMenuContentStyled>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};
