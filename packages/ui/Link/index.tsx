"use client";

import styled from "styled-components";
import Link from "next/link";

type LinkComponentProps = {
  href?: any;
  children?: string;
} & React.HTMLProps<HTMLElement>;

export const LinkComponentAnchorStyled = styled(Link)<LinkComponentProps>`
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.link.main};
`;

export const LinkComponentButtonStyled = styled.button<LinkComponentProps>`
  font-style: normal;
  font-weight: 400;
  font-family: inherit;
  color: ${({ theme }) => theme.link.main};
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

export const LinkComponent = ({
  href,
  children,
  onClick,
  className,
}: LinkComponentProps) => {
  return onClick ? (
    <LinkComponentButtonStyled className={className} onClick={onClick}>
      {children}
    </LinkComponentButtonStyled>
  ) : (
    <LinkComponentAnchorStyled className={className} href={href}>
      {children}
    </LinkComponentAnchorStyled>
  );
};
