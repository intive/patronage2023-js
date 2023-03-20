"use client";
import styled, { css } from "styled-components";

type LinkComponentProps = {
  href?: any;
  label?: string;
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
  /* position: absolute; */
  width: 57px;
  height: 24px;
  left: 0px;
  top: 0px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  color: #397B65;
  text-decoration: underline;
`;

export const LinkComponentButtonStyled = styled.button<LinkComponentProps>`
  /* position: absolute; */
  left: 0px;
  top: 0px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  /* identical to box height, or 150% */
  color: #397B65;
  width: 54px;
  height: 20px; 
  line-height: 20px;
  flex: 1;
  flex-grow: 0;
  cursor: pointer;
  border: none;
  background-color: transparent;
  /* identical to box height, or 143% */
`;
