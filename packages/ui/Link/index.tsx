"use client";
import styled from "styled-components";

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
  position: absolute;
  top: 0px;
  left: 0px;
  /* width: 57px; */
  /* height: 24px; */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #397B65;
  text-decoration: underline;
`;

export const LinkComponentButtonStyled = styled.button<LinkComponentProps>`
  position: absolute;
  top: 0px;
  left: 0px;
  /* width: 54px; */
  /* height: 20px;  */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #397B65;
  display: flex;
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;
