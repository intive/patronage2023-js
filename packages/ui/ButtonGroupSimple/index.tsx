"use client";

import { ReactNode } from "react";
import styled from "styled-components";
import { device } from "web/lib/media-queries";

type InputProps = {
  component: ReactNode;
  id: string;
  checked: boolean,
};

type GroupProps = {
  options: InputProps[];
  selectedOption: string;
  onOptionSelect: (id: string) => void;
} & React.HTMLProps<HTMLDivElement>;

const ButtonRadioGroupStyled = styled.div`
  display: flex;
  gap: 7px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  height: 100%;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 4px 2px;
    position: relative;
    text-align: center;
    border-bottom: 2px solid transparent;
    color: #7E7E7E;

    ${device.tablet} {
      padding: 8px 12px;
    }
  }

  label:has(input:checked),
  label:has(input:focus) {
    border-bottom: 2px solid ${({ theme }) => theme.main};
    z-index: 1;
    color: ${({ theme }) => theme.main};
    font-weight: 600;
  }

  //hide input without losing accessibility
  input {
    height: 0;
    width: 0;
    opacity: 0;
    position: absolute;
  }

  //label on hover
  label:hover {
    border-bottom: 2px solid ${({ theme }) => theme.main};
    z-index: 1;
  }
`;

export const ButtonGroupSimple = ({
  options,
  selectedOption,
  onOptionSelect,
}: GroupProps) => (
  <ButtonRadioGroupStyled>
    {options.map(({ component, id }) => (
      <label key={id}>
        <input
          type="radio"
          value={id}
          checked={selectedOption === id}
          onChange={() => onOptionSelect(id)}
        />
        {component}
      </label>
    ))}
  </ButtonRadioGroupStyled>
);
