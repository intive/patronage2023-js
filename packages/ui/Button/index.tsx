"use client";

import styled, { css } from "styled-components";

export const Button = ({
  variant = "primary",
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  small = false,
}: ButtonProps) => {
  return (
    <ButtonStyled
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
      small={small}
    >
      {children}
    </ButtonStyled>
  );
};

type ButtonProps = {
  variant?: "primary" | "secondary" | "simple";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick: Function;
  small?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

const ButtonStyled = styled.button<ButtonProps>`
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: 2px solid #1e4c40;
  border-radius: 8px;
  color: white;
  background-color: #1e4c40;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  padding: 16px 24px;
  font-size: 1em;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    border: 2px solid #459175;
    background-color: #459175;
  }
  &:disabled {
    border: 2px solid lightgray;
    background-color: lightgray;
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
      background-color: transparent;
      border: 2px solid #1e4c40;
      color: #1e4c40;
      &:hover {
        background-color: transparent;
        border: 2px solid #459175;
        color: #459175;
      }
      &:disabled {
        color: lightgray;
        background-color: transparent;
        border: 2px solid lightgray;
      }
    `}

  ${({ variant }) =>
    variant === "simple" &&
    css`
      border: 2px solid transparent;
      background-color: transparent;
      color: #52a785;
      &:hover {
        border: 2px solid transparent;
        background-color: transparent;
        text-decoration: underline;
      }
      &:disabled {
        border: 2px solid transparent;
        background-color: transparent;
        color: lightgrey;
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





