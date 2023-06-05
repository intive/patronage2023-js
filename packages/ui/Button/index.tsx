"use client";

import styled, { css } from "styled-components";

export const Button = ({
  variant = "primary",
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  className,
  small = false,
}: ButtonProps) => {
  return (
    <ButtonStyled
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
      small={small}
      className={className}>
      {children}
    </ButtonStyled>
  );
};

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "simple";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
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

  ${({ variant }) =>
    variant === "danger" &&
    css`
      border: 2px solid ${({ theme }) => theme.button.danger.main};
      color: white;
      background-color: ${({ theme }) => theme.button.danger.main};
      &:hover {
        border: 2px solid ${({ theme }) => theme.button.danger.hover};
        background-color: ${({ theme }) => theme.button.danger.hover};
        opacity: 0.8;
      }
      &:disabled {
        border: 2px solid ${({ theme }) => theme.button.danger.disabled};
        background-color: ${({ theme }) => theme.button.danger.disabled};
        opacity: 0.8;
        cursor: not-allowed;
      }
    `}

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
        color: ${({ theme }) => theme.button.secondary.disabled};
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
