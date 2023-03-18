import * as React from "react";
import styled, { css } from "styled-components";

import { Icon } from "../Icon";

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
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const getButton = () => {
    if (hasError) {
      return (
        <StyledIcon>
          <Icon icon="error" filled color="#b3261e" iconSize={20} />
        </StyledIcon>
      );
    }
    if (type === "password") {
      return typeOverride ? (
        <StyledIcon
          onClick={() => {
            setTypeOverride("");
            inputRef.current?.focus();
          }}
        >
          <Icon
            icon="visibility_off"
            color="#49454f"
            iconSize={23}
          />
        </StyledIcon>
      ) : (
        <StyledIcon
          onClick={() => {
            setTypeOverride("text");
            inputRef.current?.focus();
          }}
        >
          <Icon
            icon="visibility"
            color="#49454f"
            iconSize={23}
          />
        </StyledIcon>
      );
    }
    if (value) {
      return (
        <StyledIcon
          onClick={() => {
            if (onChange) {
              onChange("");
            }
            inputRef.current?.focus();
          }}
          style={{ transform: "rotate(45deg)" }}
        >
          <Icon
            icon={"add_circle"}
            color={"#49454f"}
            iconSize={20}
          />
        </StyledIcon>
      );
    }
    return null;
  };

  return (
    <Wrapper>
      <StyledInput
        ref={inputRef}
        placeholder=" "
        hasError={hasError}
        id={id || randomId}
        type={typeOverride || type}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(event.target.value);
          }
        }}
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
  // case when input has value
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

const StyledIcon = styled.button`
  position: absolute;
  right: -14px;
  top: 10px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  line-height: 0;
`;

const StyledSupportingLabel = styled.div<StyledSupportingLabelProps>`
  color: ${({ hasError }) => (hasError ? "#B3261E" : "#49454F")};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0px 10px;
`;
