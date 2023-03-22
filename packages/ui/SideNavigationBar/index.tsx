import styled from "styled-components";
import {
  SideNavigationBarItemProps,
  SideNavigationBarItem,
} from "../SideNavigationBarItem";

export const SideNavigationBar = ({
  items,
  pathname,
}: SideNavigationBarProps) => {
  return (
    <SideNavigationBarStyled items={items} pathname={pathname}>
      {items.map(({ href, icon, textValue }, index) => {
        const active = pathname === href;
        return (
          <SideNavigationBarItem
            key={index}
            href={href}
            icon={icon}
            textValue={textValue}
            activeFlag={active}
          />
        );
      })}
    </SideNavigationBarStyled>
  );
};

type SideNavigationBarProps = {
  items: SideNavigationBarItemProps[];
  pathname: string;
};

const SideNavigationBarStyled = styled.ul<SideNavigationBarProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0;
  list-style: none;
`;
