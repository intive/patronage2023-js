"use client";

import { ReactNode } from "react";
import styled from "styled-components";

export type CardProps = {
  children: ReactNode;
  padding?: string;
  margin?: string;
  minWidth?: string;
  minHeight?: string;
};

export const Card = ({
  children,
  padding = "auto",
  margin = "0",
  minWidth = "fit-content",
  minHeight = "fit-content",
}: CardProps) => {
  return (
    <CardStyled
      padding={padding}
      margin={margin}
      minWidth={minWidth}
      minHeight={minHeight}>
      {children}
    </CardStyled>
  );
};

export const CardStyled = styled.div<CardProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  min-width: ${({ minWidth }) => minWidth};
  min-height: ${({ minHeight }) => minHeight};
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 2px 6px rgba(32, 41, 50, 0.1);
  border-radius: 16px;
  overflow: hidden;
`;
