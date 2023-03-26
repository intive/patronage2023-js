"use client";
import styled from "styled-components";

type LinkComponentProps = {
  href?: any;
  children?: string;
} & React.HTMLProps<HTMLElement>;

export const LinkComponent = ({ 
  href, 
  children,
  onClick,
}: LinkComponentProps) => {
  return onClick ? (<LinkComponentButtonStyled onClick={onClick}>
    {children}
  </LinkComponentButtonStyled>) : (<LinkComponentAnchorStyled href={href}>
    {children}
  </LinkComponentAnchorStyled>)
};

export const LinkComponentAnchorStyled = styled.a<LinkComponentProps>`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #397B65;
`;

export const LinkComponentButtonStyled = styled.button<LinkComponentProps>`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #397B65;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;
