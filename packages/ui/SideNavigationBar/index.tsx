import styled, { css } from "styled-components";
import {
  SideNavigationBarItemProps,
  SideNavigationBarItem,
} from "../SideNavigationBarItem";

export const SideNavigationBar = ({ items }: SideNavigationBarProps) => {
  return (
    <SideNavigationBarStyled items={items}>
      {items.map(({ href, icon, textValue }, index) => {
        return (
          <SideNavigationBarItem
            key={index}
            href={href}
            icon={icon}
            textValue={textValue}
          />
        );
      })}
    </SideNavigationBarStyled>
  );
};

type SideNavigationBarProps = {
  items: SideNavigationBarItemProps[];
};

const SideNavigationBarStyled = styled.ul<SideNavigationBarProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0;
  list-style: none;
`;
