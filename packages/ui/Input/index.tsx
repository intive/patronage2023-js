import * as React from "react";
import styled, { css } from "styled-components";

export const Input = ({
  label,
  hasError = false,
  id,
  supportingLabel,
  type,
  value,
  onChange,
}: InputProps) => {
  const randomId = React.useId();
  const [typeOverride, setTypeOverride] = React.useState("");

  const getButton = () => {
    if (hasError) {
      return <StyledIcon hasError={hasError}>!</StyledIcon>;
    }
    if (type === "password") {
      return typeOverride ? (
        <StyledIcon hasError={hasError} onClick={() => setTypeOverride("")}>Ø</StyledIcon>
      ) : (
        <StyledIcon hasError={hasError} onClick={() => setTypeOverride("text")}>o</StyledIcon>
      );
    }
    if (value) {
      return <StyledIcon hasError={hasError} onClick={() => {
        if ( onChange ) {
           onChange('')
        }
      }}>x</StyledIcon>;
    }
    return null;
  };
  return (
    <Wrapper>
      <StyledInput
        placeholder=" "
        hasError={hasError}
        id={id || randomId}
        type={typeOverride || type}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(event.target.value)
            }
        } }
      />
      <StyledLabel hasError={hasError} htmlFor={id || randomId}>
        {label}
      </StyledLabel>
      {getButton()}
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

type StyledIconProps = {
  hasError: boolean;
} & React.HTMLProps<HTMLLabelElement>;

type StyledSupportingLabelProps = {
  hasError: boolean;
} & React.HTMLProps<HTMLDivElement>;

export type InputProps = {
  label: string;
  onChange?: (newValue: string) => void;
  supportingLabel?: React.ReactNode;
} & StyledInputProps;

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<StyledInputProps>`
  border: solid 2px #e1e1e1;
  border-radius: 8px;
  padding: 10px;
  caret-color: #515151;
  transition: border-color 200ms ease-out;
  width: 100%;

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

const StyledLabel = styled.label<StyledLabelProps>`
  font-family: Arial, sans-serif;
  position: absolute;
  color: ${({ hasError }) => (hasError ? "#B3261E" : "#515151")};
  font-weight: 400;
  font-size: 16px;
  left: 10px;
  top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 20px);
  transition: all 200ms linear;
`;

const StyledIcon = styled.button<StyledIconProps>`
  position: absolute;
  right: -14px;
  top: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #49454f;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  cursor: pointer;

  ${({ hasError }) =>
    hasError &&
    css`
      color: #b3261e;
      cursor: text;
    `}
`;

const StyledSupportingLabel = styled.div<StyledSupportingLabelProps>`
  font-family: Arial, sans-serif;
  color: ${({ hasError }) => (hasError ? "#B3261E" : "#49454F")};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0px 10px;
`;
