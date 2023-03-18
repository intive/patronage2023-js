"use client";

import styled, { css } from "styled-components";

export const Button = ({
  variant = "primary",
  height = 56,
  fullWidth,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyled
      variant={variant}
      onClick={onClick}
      height={height}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      <SpanStyled>{children}</SpanStyled>
    </ButtonStyled>
  );
};

type ButtonProps = {
  variant?: "primary" | "secondary" | "simple";
  height?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: Function;
} & React.HTMLProps<HTMLButtonElement>;

const ButtonStyled = styled.button<ButtonProps>`
  box-sizing: border-box;
  display: inline;
  border: 0;
  border-radius: 8px;
  color: white;
  background-color: #1e4c40;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  height: ${(props) => props.height}px;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 1em;
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

const SpanStyled = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  & :last-child {
    margin-right: -10px;
  }
`;
