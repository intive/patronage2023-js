"use client";

import styled, { css } from "styled-components";

type ButtonProps = {
  variant?: "primary" | "secondary" | "simple";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick: Function;
  small?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

export const ButtonStyled = styled.button<ButtonProps>`
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: 2px solid ${({ theme }) => theme.button.primary.main};
  border-radius: 8px;
  color: white;
  background-color: ${({ theme }) => theme.button.primary.main};
  font-family: "Inter", sans-serif;
  font-weight: 600;
  padding: 16px 24px;
  font-size: 1em;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    border: 2px solid ${({ theme }) => theme.button.primary.hover};
    background-color: ${({ theme }) => theme.button.primary.hover};
  }
  &:disabled {
    border: 2px solid ${({ theme }) => theme.button.primary.disabled};
    background-color: ${({ theme }) => theme.button.primary.disabled};
    cursor: not-allowed;
  }

  // temporary fix to button with arrow_dropdown_down
  & :last-child {
    margin-right: -10px;
    margin-top: -8px;
    margin-bottom: -8px;
  }

  ${({ variant }) =>
    variant === "secondary" &&
    css`
      background-color: ${({ theme }) => theme.button.secondary.background};
      border: 2px solid ${({ theme }) => theme.button.secondary.main};
      color: ${({ theme }) => theme.button.secondary.main};
      &:hover {
        background-color: ${({ theme }) => theme.button.secondary.background};
        border: 2px solid ${({ theme }) => theme.button.secondary.hover};
        color: ${({ theme }) => theme.button.secondary.hover};
      }
      &:disabled {
        color: lightgray;
        background-color: ${({ theme }) => theme.button.secondary.background};
        border: 2px solid ${({ theme }) => theme.button.secondary.disabled};
      }
    `}

  ${({ variant }) =>
    variant === "simple" &&
    css`
      border: 2px solid ${({ theme }) => theme.button.simple.background};
      background-color: ${({ theme }) => theme.button.simple.background};
      color: ${({ theme }) => theme.button.simple.main};
      &:hover {
        border: 2px solid ${({ theme }) => theme.button.simple.background};
        background-color: ${({ theme }) => theme.button.simple.background};
        text-decoration: underline;
      }
      &:disabled {
        border: 2px solid ${({ theme }) => theme.button.simple.background};
        background-color: ${({ theme }) => theme.button.simple.background};
        color: ${({ theme }) => theme.button.simple.disabled};
        text-decoration: none;
      }
    `}

  ${({ small }) =>
    small &&
    css`
      padding: 13px 24px;
    `}
  

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

export const Button = ({
  variant = "primary",
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  small = false,
  className,
}: ButtonProps) => {
  return (
    <ButtonStyled
      className={className}
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
      small={small}>
      {children}
    </ButtonStyled>
  );
};
