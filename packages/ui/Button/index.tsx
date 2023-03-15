"use client";

import * as React from "react";
import styled, { css } from "styled-components";

export const Button = ({
  variant = "primary",
  fullWidth,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyled
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {children}
    </ButtonStyled>
  );
};

export type ButtonProps = {
  variant: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: Function;
} & React.HTMLProps<HTMLButtonElement>;

export const ButtonStyled = styled.button<ButtonProps>`
  display: inline-block;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 8px;
  color: white;
  background-color: #1e4c40;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  height: 56px;
  padding: 16px 24px;
  font-size: 1em;
  line-height: 24px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #459175;
  }
  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
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
      border: 0;
      background-color: transparent;
      color: #52a785;
      &:hover {
        background-color: transparent;
        text-decoration: underline;
      }
      &:disabled {
        background-color: transparent;
        color: lightgrey;
        text-decoration: none;
      }
    `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;
