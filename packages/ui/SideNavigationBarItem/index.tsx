import styled, { css } from "styled-components";
import { Icon } from "ui";
import { IconProps } from "../Icon";
import Link from "next/link";

export const SideNavigationBarItem = ({
  href,
  icon,
  textValue,
  activeFlag,
}: SideNavigationBarItemProps) => {
  return (
    <ListItemStyled>
      <LinkStyled href={href}>
        <SideNavigationBarItemStyled
          activeFlag={activeFlag}
          href={href}
          textValue={textValue}
          icon={icon}
        >
          <Icon
            icon={icon}
            iconSize={30}
            color={activeFlag ? "#1e4c40" : "#7e7e7e"}
          />
          <SpanStyled fontSize={10}>{textValue}</SpanStyled>
          {activeFlag && <DivStyled />}
        </SideNavigationBarItemStyled>
      </LinkStyled>
    </ListItemStyled>
  );
};

export type SideNavigationBarItemProps = {
  activeFlag?: boolean;
  href: string;
  textValue: string;
} & React.HTMLProps<HTMLDivElement> &
  IconProps;

const SideNavigationBarItemStyled = styled.div<SideNavigationBarItemProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;

  position: relative;
  height: auto;
  width: 60px;

  padding: 7px 14px 7px 14px;
  color: #7e7e7e;
  ${({ activeFlag }) =>
    activeFlag &&
    css`
      color: #1e4c40;
    `}
`;

type SpanProps = {
  fontSize: number;
} & React.HTMLProps<HTMLSpanElement>;

const SpanStyled = styled.span<SpanProps>`
  text-align: center;
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `};
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

const ListItemStyled = styled.li`
  list-style: none;
  padding: 0;
`;

const DivStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #459175;
  height: 100%;
  width: 4px;
  border-radius: 0 8px 8px 0;
`;
