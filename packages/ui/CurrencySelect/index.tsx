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
  StyledCurrencyLabel,
  StyledTag,
} from "./CurrencySelect.styled";

export type StyledErrorProps = {
  hasError?: boolean;
};

export type SelectTriggerProps = {
  hasError?: boolean;
  hasSupportingLabel?: boolean;
};

export type CurrencySelectComponentProps = {
  hasError?: boolean;
  supportingLabel?: React.ReactNode;
  onValueChange?: (value: string) => void;
  value: string;
  id?: string;
  label?: string;
} & StyledErrorProps &
  Select.SelectTriggerProps &
  React.HTMLProps<HTMLElement>;

const currency = [
  {
    tag: "PLN",
    label: "Polish Zloty",
  },
  {
    tag: "GBP",
    label: "British Pound",
  },
  {
    tag: "EUR",
    label: "Euro",
  },
  {
    tag: "USD",
    label: "United States Dollar",
  },
];

export const CurrencySelect = ({
  hasError = false,
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
      <SelectTrigger id={id} hasError={hasError} hasSupportingLabel={hasError}>
        <label htmlFor="currency">{label}</label>
        <Select.Value></Select.Value>
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
