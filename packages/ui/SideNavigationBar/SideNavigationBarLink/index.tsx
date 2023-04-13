import styled, { css, ThemeContext } from "styled-components";
import { ReactNode } from "react";
import Link from "next/link";
import { useContext } from "react";

export const SideNavigationBarLink = ({
  href,
  icon,
  textValue,
  activeFlag,
  onClick,
}: SideNavigationBarLinkProps) => {
  const theme = useContext(ThemeContext);
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

type SideNavigationBarLinkProps = {
  href: string;
  icon: ReactNode;
  textValue: string;
  activeFlag: boolean;
  onClick: () => void;
} & React.HTMLProps<HTMLAnchorElement>;

type SpanProps = {
  fontSize: number;
} & React.HTMLProps<HTMLSpanElement>;

type SideNavigationBarLinkState = {
  activeFlag?: boolean;
};

const ListItemStyled = styled.li`
  list-style: none;
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
  gap: 10px;

  position: relative;
  height: auto;
  width: 60px;

  padding: 17px 34px 17px 34px;
  color: ${({ activeFlag }) =>
    activeFlag
      ? ({ theme }) => theme.sideNavigationBarItem.main
      : ({ theme }) => theme.sideNavigationBarItem.inactive};
`;

const SpanStyled = styled.span<SpanProps>`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  text-align: center;
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `};
`;

const DivStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.sideNavigationBarItem.background};
  height: 100%;
  width: 4px;
  border-radius: 0 8px 8px 0;
`;
