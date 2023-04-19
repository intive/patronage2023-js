"use client";

import * as Select from "@radix-ui/react-select";
import styled from "styled-components";
import { Icon } from "../Icon";

export type CurrencySelectComponentProps = {
  // tag: string;
  // label: string;
  // id: string | number;
  // value: string;
} & React.HTMLProps<HTMLElement>;

export const CurrencySelect = ({}: CurrencySelectComponentProps) => {
  return (
    <Select.Root>
      <SelectTrigger>
        <Select.Value placeholder="Currency"></Select.Value>
        <SelectIcon>
          <Icon icon="arrow_drop_down" iconSize={23} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent position="popper">
          <SelectViewport>
            {currency.map((currency) => (
              <SelectItem value={currency.id}>
                <SelectItemText>
                  <StyledTag>{currency.tag}</StyledTag> <StyledCurrencyLabel>{currency.label}</StyledCurrencyLabel>
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
`;



const SelectIcon = styled(Select.Icon)`
  color: #626262;
  margin-top: -2px;
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
