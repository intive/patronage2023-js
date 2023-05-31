"use client";

import { useState } from "react";
import styled from "styled-components";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuItemStyled,
  DropdownMenuContentStyled as MenuContentStyled,
} from "../ButtonWithDropdown";

export type ExportDropdownProps = {
  items: ExportDropdownItem[];
  triggerButton: React.ReactNode;
  isButtonDisabled: boolean;
};

export type ExportDropdownItem = {
  id: string;
  node: React.ReactNode;
};

const DropdownMenuContentStyled = styled(MenuContentStyled)`
  width: 100%;
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
