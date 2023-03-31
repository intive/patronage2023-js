import styled, { css, ThemeContext } from "styled-components";
import { Icon } from "ui";
import { IconProps } from "../Icon";
import Link from "next/link";
import { useContext } from "react";

export type SideNavigationBarItemProps = {
  activeFlag?: boolean;
  href: string;
  textValue: string;
} & React.HTMLProps<HTMLDivElement> &
  IconProps;

type SpanProps = {
  fontSize: number;
} & React.HTMLProps<HTMLSpanElement>;

interface SideNavigationBarItemState {
  activeFlag?: boolean;
}

export const SideNavigationBarItem = ({
  href,
  icon,
  textValue,
  activeFlag,
}: SideNavigationBarItemProps) => {
  const theme = useContext(ThemeContext);
  return (
    <ListItemStyled>
      <LinkStyled href={href}>
        <SideNavigationBarItemStyled activeFlag={activeFlag}>
          <Icon
            icon={icon}
            iconSize={30}
            color={
              activeFlag
                ? theme.sideNavigationBarItem.main
                : theme.sideNavigationBarItem.inactive
            }
          />
          <SpanStyled fontSize={10}>{textValue}</SpanStyled>
          {activeFlag && <DivStyled />}
        </SideNavigationBarItemStyled>
      </LinkStyled>
    </ListItemStyled>
  );
};

const ListItemStyled = styled.li`
  list-style: none;
  padding: 0;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const SideNavigationBarItemStyled = styled.div<SideNavigationBarItemState>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;

  position: relative;
  height: auto;
  width: 60px;

  padding: 7px 14px 7px 14px;
  color: ${({ activeFlag }) =>
    activeFlag
      ? ({ theme }) => theme.sideNavigationBarItem.main
      : ({ theme }) => theme.sideNavigationBarItem.inactive};
`;

const SpanStyled = styled.span<SpanProps>`
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
