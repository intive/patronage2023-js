"use client";

import { useState } from "react";
import styled from "styled-components";
import { Icon } from "ui";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { device } from "web/lib/media-queries";

export type ButtonWithDropdownProps = {
  label: string;
  items: ButtonWithDropdownItem[];
  disabled?: boolean;
};

export type ButtonWithDropdownItem = {
  id: string;
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
  padding: 5px 3px 5px 12px;
  ${device.tablet} {
    padding: 9px 12px 9px 22px;
    font-size: 1em;
    gap: 4px;
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.button.primary.hover};
    background-color: ${({ theme }) => theme.button.primary.hover};
  }

  &:disabled {
    border: 2px solid ${({ theme }) => theme.button.primary.disabled};
    background-color: ${({ theme }) => theme.button.primary.disabled};
    cursor: not-allowed;
  }
`;

const DropdownMenuContentStyled = styled(DropdownMenu.Content)`
  box-shadow: 0 2px 8px rgba(32, 37, 50, 0.08), 0 2px 4px rgba(32, 37, 50, 0.03);
  border-radius: 16px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.card.border};
  z-index: 2;
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
    border-color: ${({ theme }) => theme.input.focus};
    background-color: ${({ theme }) =>
      theme.transactionDropdownMenu.activeBackground};
    outline: none;
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme.transactionDropdownMenu.activeBackground};
    border: 1px solid transparent;
  }
`;

export const ButtonWithDropdown = ({
  label,
  items,
  disabled,
}: ButtonWithDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <StyledButton disabled={disabled}>
          {label}
          <Icon
            color="white"
            icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
            iconSize={30}
          />
        </StyledButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenuContentStyled align="start">
          {items.map((item) => (
            <DropdownMenuItemStyled key={item.id} onClick={item.callback}>
              {item.label}
            </DropdownMenuItemStyled>
          ))}
        </DropdownMenuContentStyled>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
