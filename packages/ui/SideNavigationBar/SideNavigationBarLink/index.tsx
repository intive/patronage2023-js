import styled, { css } from "styled-components";
import { ReactNode } from "react";
import Link from "next/link";

type SideNavigationBarLinkProps = {
  href: string;
  icon: ReactNode;
  textValue: string;
  activeFlag: boolean;
  onClick: () => void;
} & React.HTMLProps<HTMLAnchorElement>;

type SideNavigationBarLinkState = {
  activeFlag?: boolean;
};

type SpanProps = {
  fontSize: number;
} & React.HTMLProps<HTMLSpanElement>;

const ListItemStyled = styled.li`
  list-style: none;
  width: 100%;
`;

const LinkStyled = styled(Link)`
  &:link,
  &:visited,
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }
`;

const Wrapper = styled.div<SideNavigationBarLinkState>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  position: relative;
  height: auto;
  padding: 17px 2px 17px 2px;
  color: ${({ activeFlag }) =>
    activeFlag
      ? ({ theme }) => theme.sideNavigationBar.sideNavigationBarItem.main
      : ({ theme }) => theme.sideNavigationBar.sideNavigationBarItem.inactive};
`;

const SpanStyled = styled.span<SpanProps>`
  font-weight: 600;
  text-align: center;
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `};

  padding: 0 20px 0 20px;
`;

const DivStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) =>
    theme.sideNavigationBar.sideNavigationBarItem.background};
  height: 100%;
  width: 4px;
  border-radius: 0 8px 8px 0;
`;

export const SideNavigationBarLink = ({
  href,
  icon,
  textValue,
  activeFlag,
  onClick,
}: SideNavigationBarLinkProps) => {
  return (
    <ListItemStyled>
      <LinkStyled href={href} onClick={onClick}>
        <Wrapper activeFlag={activeFlag}>
          {icon}
          <SpanStyled fontSize={10}>{textValue}</SpanStyled>
          {activeFlag && <DivStyled />}
        </Wrapper>
      </LinkStyled>
    </ListItemStyled>
  );
};
