"use client";

import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import styled, { css, ThemeContext } from "styled-components";
import { Icon } from "../Icon";

type StyledErrorProps = {
  hasError?: boolean;
  hasSupportingLabel?: boolean;
};

// type StyledInputProps = {
//   hasSupportingLabel?: boolean;
// };

export type CurrencySelectComponentProps = {
  // tag: string;
  // label: string;
  // id: string | number;
  // value: string;
  hasError?: boolean;
  supportingLabel?: React.ReactNode;
  
} & StyledErrorProps & React.HTMLProps<HTMLElement>;

export const CurrencySelect = ({
  hasError = false,
  supportingLabel,
}: CurrencySelectComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select.Root onOpenChange={() => { setIsOpen(!isOpen);}}>
      <SelectTrigger hasError={hasError} hasSupportingLabel={Boolean(supportingLabel)}>
        <SelectValue placeholder="Currency"></SelectValue>
        <SelectIcon>
          <Icon icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"} iconSize={23} />
        </SelectIcon>
      </SelectTrigger>
      {supportingLabel && (
        <StyledSupportingLabel hasError={hasError}>
          Choose Currency
        </StyledSupportingLabel>
      )}
      <SelectPortal>
        <SelectContent position="popper">
          <SelectViewport>
            {currency.map((currency) => (
              <SelectItem value={currency.id} key={currency.id}>
                <SelectItemText>
                  <StyledTag>{currency.tag}</StyledTag>{" "}<StyledCurrencyLabel>{currency.label}</StyledCurrencyLabel>
                </SelectItemText>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select.Root>
  );
};



const SelectTrigger = styled(Select.Trigger)`
  color: #515151;
  background-color: ${({ theme }) => theme.card.background};
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

const SelectValue = styled(Select.Value)`
  
`;


const SelectIcon = styled(Select.Icon)`
  color: #626262;
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
  background-color: white;
  border: solid 1px ${({ theme }) => theme.input.borderError};
  cursor: pointer;
  
`;



const SelectViewport = styled(Select.Viewport)`
  box-shadow: 0px 2px 4px 0px #20253208;

`;

const SelectItem = styled(Select.Item)`
  height: 56px;
  outline-color: ${({ theme }) => theme.input.focus};
  padding: 16px;
  gap: 8px;

  &:focus {
    color: #397b65;
    background-color: #f1fbf6;
    &:first-child {
      border-radius: 1em 1em 0 0;
    }
    &:last-child {
      border-radius: 0 0 1em 1em;
    }
  }


`;

const StyledTag = styled.span`
  color: #515151; 
  margin-right: 8px;
  ${SelectItem}:focus & {
    color: #397b65;
  }
`;

const SelectItemText = styled(Select.ItemText)`
  color: #222222;
`;

const StyledCurrencyLabel = styled.span`
  ${SelectTrigger} & {
    display: none;
  }
`;

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