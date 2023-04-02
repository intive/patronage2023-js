import styled, { css, ThemeContext } from "styled-components";
import Link from "next/link";
import { IconProps } from "../../Icon";
import { Icon } from "../../Icon";
import { useContext } from "react";

export const SideNavigationBarLink = ({
  href,
  icon,
  textValue,
  activeFlag,
}: SideNavigationBarLinkProps) => {
  const theme = useContext(ThemeContext);
  return (
    <ListItemStyled>
      <LinkStyled href={href}>
        <Wrapper>
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
        </Wrapper>
      </LinkStyled>
    </ListItemStyled>
  );
};

type SideNavigationBarLinkProps = {
  href: string;
  textValue: string;
  activeFlag: boolean;
} & React.HTMLProps<HTMLAnchorElement> &
  IconProps;

type SpanProps = {
  fontSize: number;
} & React.HTMLProps<HTMLSpanElement>;

type SideNavigationBarLinkState = {
  activeFlag?: boolean;
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

const Wrapper = styled.div<SideNavigationBarLinkState>`
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
