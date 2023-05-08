"use client";

import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import {
  SelectContentStyled,
  SelectIconStyled,
  SelectItemStyled,
  SelectPortalStyled,
  SelectTriggerStyled,
} from "./RowsPerPageSelect.styled";
import { Icon } from "ui";

type RowsPerPageSelectProps = {
  onValueChange?: (value: string) => void;
  value: string;
  id?: string;
  label?: string;
  name?: string;
  pageSizeOptions: number[];
} & Select.SelectTriggerProps &
  React.HTMLProps<HTMLElement>;

export const RowsPerPageSelect = ({
  onValueChange,
  value,
  id,
  label,
  name,
  pageSizeOptions,
}: RowsPerPageSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select.Root
      name={name}
      value={value}
      onValueChange={onValueChange}
      onOpenChange={() => setIsOpen((prevState) => !prevState)}>
      <SelectTriggerStyled id={id} aria-label={label}>
        <Select.Value>{value}</Select.Value>
        <SelectIconStyled>
          <Icon
            icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
            iconSize={27}
          />
        </SelectIconStyled>
      </SelectTriggerStyled>

      <SelectPortalStyled>
        <SelectContentStyled position="popper">
          <Select.Viewport>
            {pageSizeOptions.map((rowsNumber) => (
              <SelectItemStyled
                value={rowsNumber.toString()}
                key={`rows-per-page-key-${rowsNumber}`}>
                <Select.ItemText>{rowsNumber}</Select.ItemText>
              </SelectItemStyled>
            ))}
          </Select.Viewport>
        </SelectContentStyled>
      </SelectPortalStyled>
    </Select.Root>
  );
};
