"use client";

import { useState, useRef } from "react";
import styled, { css } from "styled-components";

import { Icon } from "../Icon";

type StyledErrorProps = {
  hasError?: boolean;
};

type StyledInputProps = {
  hasSupportingLabel?: boolean;
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
  const [typeOverride, setTypeOverride] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getButton = () => {
    if (type === "password") {
      return (
        <StyledIcon
          onClick={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
            setTypeOverride(typeOverride ? "" : "text");
          }}>
          <Icon
            icon={typeOverride ? "visibility_off" : "visibility"}
            color={hasError ? "#b3261e" : "#397B65"}
            iconSize={23}
          />
        </StyledIcon>
      );
    }
    if (hasError) {
      return (
        <StyledIcon disabled>
          <Icon icon="error" filled color="#b3261e" iconSize={20} />
        </StyledIcon>
      );
    }
    if (value && onInputCleared) {
      return (
        <StyledIcon
          onClick={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
            onInputCleared();
          }}>
          <Icon icon="cancel" color="#397B65" iconSize={20} />
        </StyledIcon>
      );
    }
    return null;
  };

  const errorId =
    hasError && supportingLabel ? `${id || name}-error-message` : undefined;

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
        hasSupportingLabel={Boolean(supportingLabel)}
        aria-invalid={hasError ? "true" : undefined}
        aria-errormessage={errorId}
      />
      <StyledLabel hasError={hasError} htmlFor={id || name}>
        {label}
      </StyledLabel>
      {getButton()}
      {supportingLabel && (
        <StyledSupportingLabel hasError={hasError} id={errorId}>
          {supportingLabel}
        </StyledSupportingLabel>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<StyledErrorProps & StyledInputProps>`
  box-sizing: border-box;
  border: solid 2px #e1e1e1;
  border-radius: 8px;
  padding: 14px 0 14px 14px;
  font-size: 16px;
  line-height: 150%;
  caret-color: #515151;
  transition: border-color 200ms ease-out;
  width: 100%;
  margin-bottom: ${({ hasSupportingLabel }) =>
    hasSupportingLabel ? "0" : "18px"};

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
  transition-delay: 0.25s;
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
  color: ${({ hasError }) => (hasError ? "#B3261E" : "#49454F")};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0px 10px;
`;
