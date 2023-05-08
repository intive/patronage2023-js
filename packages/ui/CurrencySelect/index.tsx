"use client";

import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Icon } from "../Icon";
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  StyledLabel,
  StyledCurrencyLabel,
  StyledTag,
} from "./CurrencySelect.styled";

export type SelectTriggerProps = {
  hasSupportingLabel?: boolean;
};

export type CurrencySelectComponentProps = {
  supportingLabel?: React.ReactNode;
  onValueChange?: (value: string) => void;
  value: string;
  id?: string;
  label?: string;
} & Select.SelectTriggerProps &
  React.HTMLProps<HTMLElement>;

  const currency = [
    {
      tag: "EUR",
      label: "Euro",
      id: "2",
    },
    {
      tag: "USD",
      label: "United States Dollar",
      id: "1",
    },
  ];

export const CurrencySelect = ({
  onValueChange,
  value,
  id,
  label,
}: CurrencySelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectRoot
      name="currency"
      value={value}
      onValueChange={onValueChange}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}>
      <SelectTrigger id={id}>
        <StyledLabel htmlFor="currency">{label}</StyledLabel>
        <Select.Value placeholder="USD"></Select.Value>
        <SelectIcon>
          <Icon
            icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
            iconSize={27}
          />
        </SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent position="popper">
          <Select.Viewport>
            {currency.map((currency) => (
              <SelectItem value={currency.tag} key={currency.tag}>
                <Select.ItemText>
                  <StyledTag>{currency.tag}</StyledTag>
                  <StyledCurrencyLabel>{currency.label}</StyledCurrencyLabel>
                </Select.ItemText>
              </SelectItem>
            ))}
          </Select.Viewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  );
};
