"use client";

import { ReactNode } from "react";
import { styled } from "ui/theme";

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
  background-color: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.card.border};
  box-shadow: 0 2px 6px rgba(32, 41, 50, 0.1);
  border-radius: 16px;
  overflow: hidden;
`;
