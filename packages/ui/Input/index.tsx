"use client";

import { useState, useRef } from "react";
import styled, { css, useTheme } from "styled-components";

import { Icon } from "../Icon";

type StyledErrorProps = {
  hasError?: boolean;
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
  name,
  id,
  supportingLabel,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  onInputCleared,
}: InputProps) => {
  const theme = useTheme();
  const [typeOverride, setTypeOverride] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getButton = () => {
    if (type === "password") {
      return (
        <StyledIcon
          onClick={(e) => {
            e.preventDefault();
            setTypeOverride(typeOverride ? "" : "text");
            inputRef.current?.focus();
          }}>
          <Icon
            icon={typeOverride ? "visibility_off" : "visibility"}
            color={hasError ? theme.input.error : theme.input.main}
            iconSize={23}
          />
        </StyledIcon>
      );
    }
    if (hasError) {
      return (
        <StyledIcon disabled>
          <Icon icon="error" filled color={theme.input.error} iconSize={20} />
        </StyledIcon>
      );
    }
    if (value && onInputCleared) {
      return (
        <StyledIcon
          onClick={() => {
            onInputCleared();
            inputRef.current?.focus();
          }}>
          <Icon icon="cancel" color={theme.input.main} iconSize={20} />
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
        name={name}
        id={id || name}
        type={typeOverride || type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <StyledLabel hasError={hasError} htmlFor={id || name}>
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
  box-sizing: border-box;
  border: solid 2px ${({ theme }) => theme.input.borderError};
  border-radius: 8px;
  padding: 14px 0 14px 14px;
  font-size: 16px;
  line-height: 150%;
  caret-color: ${({ theme }) => theme.input.neutral};
  transition: border-color 200ms ease-out;
  width: 100%;

  :focus {
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }

  :focus,
  // case when input has value
  :not(:placeholder-shown) {
    + label {
      transform: translateY(-24px);
      font-size: 12px;
      font-weight: 600;
      background-color: ${({ theme }) => theme.input.labelBackground};
      padding-left: 4px;
      padding-right: 4px;
    }
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${({ theme }) => theme.input.error};
      caret-color: ${({ theme }) => theme.input.error};

      :focus {
        border-color: ${({ theme }) => theme.input.error};
      }
    `}
`;

const StyledLabel = styled.label<StyledErrorProps>`
  position: absolute;
  color: ${({ hasError }) =>
    hasError
      ? ({ theme }) => theme.input.error
      : ({ theme }) => theme.input.neutral};
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
  cursor: text;
`;

const StyledIcon = styled.button`
  position: absolute;
  right: 15px;
  top: 18px;
  border: none;
  background: none;
  cursor: ${({ disabled }) => (disabled ? "text" : "pointer")};
  padding: 0;
  line-height: 0;
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
