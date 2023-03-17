"use client";

import * as React from "react";
import styled, { css } from "styled-components";

export const Button = ({
  disabled = false,
  secondary = false,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyled disabled={disabled} secondary={secondary} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

export type ButtonProps = {
  disabled?: boolean;
  secondary?: boolean;
  onClick?: Function;
} & React.HTMLProps<HTMLButtonElement>;

export const ButtonStyled = styled.button<ButtonProps>`
  min-width: 100px;
  text-align: center;
  font-size: 1.2rem;
  color: #fff;
  background-color: #000;
  border-radius: 4px;
  border: none;
  padding: 5px 10px;
  margin: 10px 20px;
  cursor: pointer;
  transition: opacity 250ms;
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.6)};
  }
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: transparent;
      outline: 1px solid #000;
      color: #000;
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.75;
      cursor: not-allowed;
    `}
`;





