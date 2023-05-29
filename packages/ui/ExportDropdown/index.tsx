"use client";

import { useState } from "react";
import styled from "styled-components";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { device } from "web/lib/media-queries";

export type ExportDropdownProps = {
  items: ExportDropdownItem[];
  triggerButton: React.ReactNode;
  isButtonDisabled: boolean;
};

export type ExportDropdownItem = {
  id: string;
  node: React.ReactNode;
};

const DropdownMenuContentStyled = styled(DropdownMenu.Content)`
  box-shadow: 0 2px 8px rgba(32, 37, 50, 0.08), 0 2px 4px rgba(32, 37, 50, 0.03);
  border-radius: 16px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.card.border};
  z-index: 2;
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

export const ExportDropdown = ({
  items,
  triggerButton,
  isButtonDisabled,
}: ExportDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger disabled={isButtonDisabled} asChild>
        {triggerButton}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenuContentStyled align="start">
          {items.map(({ id, node }) => (
            <DropdownMenuItemStyled key={id}>{node}</DropdownMenuItemStyled>
          ))}
        </DropdownMenuContentStyled>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
