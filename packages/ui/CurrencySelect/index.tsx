"use client";

import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import styled, { css } from "styled-components";
import { Icon } from "../Icon";

type StyledErrorProps = {
  hasError?: boolean;
  hasSupportingLabel?: boolean;
};

export type CurrencySelectComponentProps = {
  hasError?: boolean;
  supportingLabel?: React.ReactNode;
  onValueChange?: (value: string) => void;
} & StyledErrorProps &
  React.HTMLProps<HTMLElement>;

const currency = [
  {
    tag: "PLN",
    label: "Polish Zloty",
    id: "1",
  },
  {
    tag: "GBP",
    label: "British Pound",
    id: "2",
  },
  {
    tag: "EUR",
    label: "Euro",
    id: "3",
  },
  {
    tag: "USD",
    label: "United States Dollar",
    id: "4",
  },
];

const SelectTrigger = styled(Select.Trigger)`
  color: ${({ theme }) => theme.input.neutral};
  background-color: ${({ theme }) => theme.currencySelect.background};
  border: solid 2px ${({ theme }) => theme.input.borderError};
  border-radius: 8px;
  font-size: 1em;
  width: 100%;
  height: 56px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 10px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${({ theme }) => theme.input.error};
    `}
`;

const SelectIcon = styled(Select.Icon)`
  color: ${({ theme }) => theme.currencySelect.icon};
  margin-top: -2px;
`;

const StyledSupportingLabel = styled.div<StyledErrorProps>`
  color: ${({ hasError }) =>
    hasError
      ? ({ theme }) => theme.input.error
      : ({ theme }) => theme.input.neutral};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0 10px;
`;

const SelectPortal = styled(Select.Portal)`
  margin-top: 2px;
  z-index: 100;
`;

const SelectContent = styled(Select.Content)`
  border-radius: 1em;
  overflow: hidden;
  background-color: ${({ theme }) => theme.currencySelect.background};
  border: solid 1px ${({ theme }) => theme.input.borderError};
  cursor: pointer;
`;

const SelectItem = styled(Select.Item)`
  height: 56px;
  outline-color: ${({ theme }) => theme.input.focus};
  padding: 16px;
  gap: 8px;

  &:focus {
    color: ${({ theme }) => theme.input.main};
    background-color: ${({ theme }) => theme.currencySelect.focusBackground};
    &:first-child {
      border-radius: 1em 1em 0 0;
    }
    &:last-child {
      border-radius: 0 0 1em 1em;
    }
  }
`;

const StyledTag = styled.span`
  color: ${({ theme }) => theme.currencySelect.tag};
  margin-right: 8px;
  ${SelectItem}:focus & {
    color: ${({ theme }) => theme.currencySelect.tagFocus};
  }
`;

const StyledCurrencyLabel = styled.span`
  ${SelectTrigger} & {
    display: none;
  }
`;

export const CurrencySelect = ({
  hasError = false,
  supportingLabel,
}: CurrencySelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <Select.Root
      onValueChange={() => {
        setSelected(selected);
      }}
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
            iconSize={23}
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
              <SelectItem value={currency.id}>
                <Select.ItemText>
                  <StyledTag>{currency.tag}</StyledTag>{" "}
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
