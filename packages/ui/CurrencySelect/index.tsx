"use client";

import * as React from "react";
import * as Select from "@radix-ui/react-select";
import styled, { css } from "styled-components";
import { Icon } from "../Icon";

{/* <Icon icon="arrow_drop_down" iconSize={24} /> */}

export type CurrencySelectComponentProps = {
  tag: string;
  label: string;
  id: string | number;
  value: string;
} & React.HTMLProps<HTMLElement>;

export const CurrencySelect = ({ 
}: CurrencySelectComponentProps) => {
  return (
    <Select.Root>
      <SelectTrigger>
      {/* <StyledLabel>Currency</StyledLabel> */}
        <SelectValue placeholder="Currency"/>
        <SelectIcon><Icon icon="arrow_drop_down" iconSize={23} /></SelectIcon>
      </SelectTrigger>
      
      <SelectPortal>
        <SelectContent position="popper" >
          <SelectViewport className="SelectViewport">
            {currency.map((currency) => (
              <SelectItem value={currency.id}>
                <SelectItemText><StyledTag>{currency.tag}</StyledTag> {currency.label}</SelectItemText>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select.Root>
  );
};

const SelectTrigger = styled(Select.Trigger)`
  background-color: ${({theme}) => theme.card.background};
  border: solid 2px ${({ theme }) => theme.input.borderError};
  border-radius: 8px;
  font-size: 1em;
  min-width: 13em;
  height: 56px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding-top: 1em;
  padding-left: 16px;
  padding-right: 10px;

  :focus {
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }
`;

const SelectValue = styled(Select.Value)`

`;


// const StyledLabel = styled.label`
//   position: absolute;
//   display: flex;
//   font-size: 12px;
//   font-weight: 600;
//   background-color: ${({ theme }) => theme.input.labelBackground};
//   color: ${({ theme }) => theme.input.neutral};
//   padding-left: 4px;
//   padding-right: 4px;
//   margin-left: 12px;
//   top: -7px;
// `;

const SelectIcon = styled(Select.Icon)`
  color: #626262;
  margin-top: -2px;
  /* margin-right: 15px; */
`;

const SelectPortal = styled(Select.Portal)`
  margin-top: 2px;
`;

const SelectContent = styled(Select.Content)`
  border-radius: 1em;
  overflow: hidden;
  background-color: white;
  border: solid 1px ${({ theme }) => theme.input.borderError};
  cursor: pointer;
`;

const SelectViewport = styled(Select.Viewport)`
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08), 0px 2px 4px rgba(32, 37, 50, 0.03);
  min-width: 13em;
`;

const SelectItem = styled(Select.Item)`
  height: 56px;
  outline-color: ${({ theme }) => theme.input.focus};
  padding: 16px;
  gap: 8px;
  
  &:focus {
    color: #397B65;
    background-color: #F1FBF6;
    :first-child {
      border-radius: 1em 1em 0 0;
    }
    :last-child {
      border-radius: 0 0 1em 1em;
    }
  }

  /* &:hover {
    color: #397B65;
  } */
`;

const StyledTag = styled.span`
  color: #515151;
`;

const SelectItemText = styled(Select.ItemText)`
  color: #222222;
`;

const currency = [
  {
    tag: "PLN",
    label: "Polish Zloty",
    name: "PLN Polish Zloty",
    id: "1",
  },
  {
    tag: "GBP",
    label: "British Pound",
    name: "GBP British Pound",
    id: "2",
  },
  {
    tag: "EUR",
    label: "Euro",
    name: "EUR Euro",
    id: "3",
  },
  {
    tag: "USD",
    label: "United States Dollar",
    name: "USD United States Dollar",
    id: "4",
  },
];
