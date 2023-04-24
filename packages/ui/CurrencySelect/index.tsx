"use client";

import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Icon } from "../Icon";
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  StyledCurrencyLabel,
  StyledSupportingLabel,
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
  supportingLabel,
  onValueChange,
}: CurrencySelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select.Root
      onValueChange={onValueChange}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}>
      <SelectTrigger
        hasError={hasError}
        hasSupportingLabel={Boolean(supportingLabel)}>
        <Select.Value placeholder="Currency"></Select.Value>
        <SelectIcon>
          <Icon
            icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"}
            iconSize={27}
          />
        </SelectIcon>
      </SelectTrigger>
      {supportingLabel && (
        <StyledSupportingLabel hasError={hasError}>
          Choose Currency
        </StyledSupportingLabel>
      )}
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
    </Select.Root>
  );
};
