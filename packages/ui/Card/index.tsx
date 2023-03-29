"use client";

import { ReactNode } from "react";
import styled from "styled-components";

export type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return <CardStyled className={className}>{children}</CardStyled>;
};

export const CardStyled = styled.div<CardProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 2px 6px rgba(32, 41, 50, 0.1);
  border-radius: 16px;
  overflow: hidden;
`;
