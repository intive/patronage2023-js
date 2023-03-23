"use client";

import { useState, useRef, useId } from "react";
import styled, { css } from "styled-components";

import { Icon } from "../Icon";

type StyledErrorProps = {
  hasError: boolean;
};

export type InputProps = {
  label: string;
  supportingLabel?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputCleared?: () => void;
} & StyledErrorProps &
  React.HTMLProps<HTMLInputElement>;

export const Input = ({
  label,
  hasError = false,
  id,
  supportingLabel,
  type,
  value,
  onChange,
  onInputCleared,
}: InputProps) => {
  const randomId = useId();
  const [typeOverride, setTypeOverride] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getButton = () => {
    if (hasError) {
      return (
        <StyledIcon>
          <Icon icon="error" filled color="#b3261e" iconSize={20} />
        </StyledIcon>
      );
    }
    if (type === "password") {
      return (
        <StyledIcon
          onClick={() => {
            setTypeOverride(typeOverride ? "" : "text");
            inputRef.current?.focus();
          }}
        >
          <Icon
            icon={typeOverride ? "visibility_off" : "visibility"}
            color="#397B65"
            iconSize={23}
          />
        </StyledIcon>
      );
    }
    if (value && onInputCleared) {
      return (
        <StyledIcon
          onClick={() => {
            onInputCleared();
            inputRef.current?.focus();
          }}
        >
          <Icon icon="cancel" color="#397B65" iconSize={20} />
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
        onChange={onChange}
      />
      <StyledLabel hasError={hasError} htmlFor={id || randomId}>
        {label}
      </StyledLabel>
      {getButton()}
      {supportingLabel && (
        <StyledSupportingLabel hasError={hasError}>
          {supportingLabel}
        </StyledSupportingLabel>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<StyledErrorProps>`
  border: solid 2px #e1e1e1;
  border-radius: 8px;
  padding: 14px 0 14px 14px;
  font-size: 16px;
  line-height: 150%;
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
      transform: translateY(-24px);
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
      border-color: #b3261e;
      caret-color: #b3261e;

      :focus {
        border-color: #b3261e;
      }
    `}
`;

const StyledLabel = styled.label<StyledErrorProps>`
  position: absolute;
  color: ${({ hasError }) => (hasError ? "#B3261E" : "#515151")};
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  left: 14px;
  top: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 32px);
  transition: all 200ms linear;
`;

const StyledIcon = styled.button`
  position: absolute;
  right: -4px;
  top: 18px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  line-height: 0;
`;

const StyledSupportingLabel = styled.div<StyledErrorProps>`
  color: ${({ hasError }) => (hasError ? "#B3261E" : "#49454F")};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0px 10px;
`;
