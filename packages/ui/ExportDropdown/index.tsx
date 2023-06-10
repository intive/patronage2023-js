"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuItemStyled,
  DropdownMenuContentStyled,
} from "../ButtonWithDropdown";
import { Tooltip } from "ui";

export type ExportDropdownProps = {
  items: ExportDropdownItem[];
  triggerButton: React.ReactNode;
  isButtonDisabled: boolean;
  tooltipLabel: string;
};

export type ExportDropdownItem = {
  id: string;
  node: React.ReactNode;
};

export const ExportDropdown = ({
  items,
  triggerButton,
  isButtonDisabled,
  tooltipLabel,
}: ExportDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip text={tooltipLabel} position="bottom">
        <DropdownMenu.Trigger disabled={isButtonDisabled} asChild>
          {triggerButton}
        </DropdownMenu.Trigger>
      </Tooltip>
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
