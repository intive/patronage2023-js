import * as React from "react";
import styled, { css } from "styled-components";

export const Input = ({
  label,
  hasError = false,
  id,
  supportingLabel,
}: InputProps) => {
  const randomId = React.useId();
  return (
    <Wrapper>
      <StyledInput placeholder=" " hasError={hasError} id={id || randomId} />
      <StyledLabel hasError={hasError} htmlFor={id || randomId}>
        {label}
      </StyledLabel>
      <StyledSupportingLabel hasError={hasError}>
        {supportingLabel}
      </StyledSupportingLabel>
    </Wrapper>
  );
};

type StyledInputProps = {
  hasError: boolean;
} & React.HTMLProps<HTMLInputElement>;

type StyledLabelProps = {
  hasError: boolean;
} & React.HTMLProps<HTMLLabelElement>;

type StyledSupportingLabelProps = {
  hasError: boolean;
} & React.HTMLProps<HTMLLabelElement>;

export type InputProps = {
  label: string;
  supportingLabel?: React.ReactNode;
} & StyledInputProps;

const Wrapper = styled.div`
  position: relative;
`;

const StyledLabel = styled.label<StyledLabelProps>`
  font-family: Arial, sans-serif;
  position: absolute;
  color: ${({ hasError }) => (hasError ? "#B3261E" : "#515151")};
  font-weight: 400;
  font-size: 16px;
  left: 10px;
  top: 10px;
  transition: all 200ms linear;
`;

const StyledInput = styled.input<StyledInputProps>`
  border: solid 2px #e1e1e1;
  border-radius: 8px;
  padding: 10px;
  caret-color: #515151;
  transition: border-color 200ms ease-out;

  :focus {
    outline: none;
    border-color: #64ba95;
  }

  :focus,
  :not(:placeholder-shown) {
    + label {
      transform: translateY(-16px);
      font-size: 12px;
      font-weight: 600;
      background-color: white;
      padding-left: 4px;
      padding-right: 4px;
    }
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: #b3261e !important;
      caret-color: #b3261e;
    `}
`;

const StyledSupportingLabel = styled.div<StyledSupportingLabelProps>`
  font-family: Arial, sans-serif;
  color: ${({ hasError }) => (hasError ? "#B3261E" : "#49454F")};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0px 10px;
`;
