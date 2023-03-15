"use client";

import * as React from "react";
import styled, { css } from "styled-components";

export const Button = ({
  secondary = false,
  simple = false,
  fullWidth,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyled
      secondary={secondary}
      simple={simple}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {children}
    </ButtonStyled>
  );
};

export type ButtonProps = {
  secondary?: boolean;
  simple?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: Function;
} & React.HTMLProps<HTMLButtonElement>;

export const ButtonStyled = styled.button<ButtonProps>`
  display: inline-block;
  margin: 24px;
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

  ${({ secondary }) =>
    secondary &&
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

  ${({ simple }) =>
    simple &&
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
