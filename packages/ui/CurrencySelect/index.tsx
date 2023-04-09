"use client";
import styled from "styled-components";
import { Icon } from "../Icon";

export type CurrencySelectComponentProps = {
  tag: string;
  label: string;
  id: string | number;
  value: string | number;
} & React.HTMLProps<HTMLElement>;

export const CurrencySelect = ({}: CurrencySelectComponentProps) => {
  return (
    <Wrapper>
      <StyledLabel>Currency</StyledLabel>
      <StyledSelect onChange={handleChange}>
        <option value="" disabled selected hidden>
          Select...
        </option>
        {currency.map((currency) => (
          <option value={currency.id}>
            {currency.name}
          </option>
        ))}
      </StyledSelect>
      <StyledIcon>
        <Icon icon="arrow_drop_down" iconSize={23} />
      </StyledIcon>
    </Wrapper>
  );
};

const handleChange = (event: any) => {
  const selectedOption = event.target.value;
  console.log(`Selected option with ID: ${selectedOption}`);
};

const Wrapper = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  /* box-sizing: border-box; */
  border: solid 2px ${({ theme }) => theme.input.borderError};
  border-radius: 8px;
  padding: 14px 0 14px 14px;
  font-size: 1em;
  /* line-height: 150%; */
  transition: border-color 200ms ease-out;
  width: 13em;
  appearance: none;
  /* -moz-appearance: none;
  -webkit-appearance: none;
  background-image: url();
  background-position: right center;
  padding-right: 1.5em; */
  cursor: pointer;
  text-overflow: ellipsis;

  :focus {
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }

  option {
    color: ${({ theme }) => theme.input.neutral};
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  display: flex;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.input.labelBackground};
  color: ${({ theme }) => theme.input.neutral};
  padding-left: 4px;
  padding-right: 4px;
  margin-left: 12px;
  top: -7px;
`;

const StyledIcon = styled.span`
  position: absolute;
  display: flex;
  pointer-events: none;
  margin-left: 180px;
  margin-top: -37px;
`;

const StyledOption = styled.span`
  color:red;
`;

const currency = [
  {
    tag: "PLN",
    label: "Polish Zloty",
    name: "PLN Polish Zloty",
    id: 1,
  },
  {
    tag: "GBP",
    label: "British Pound",
    name: "GBP British Pound",
    id: 2,
  },
  {
    tag: "EUR",
    label: "Euro",
    name: "EUR Euro",
    id: 3,
  },
  {
    tag: "USD",
    label: "United States Dollar",
    name: "USD United States Dollar",
    id: 4,
  },
];
