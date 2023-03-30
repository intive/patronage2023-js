import styled from "styled-components";
import {
  SideNavigationBarItemProps,
  SideNavigationBarItem,
} from "../SideNavigationBarItem";

type SideNavigationBarProps = {
  items: SideNavigationBarItemProps[];
  pathname: string;
};

export const SideNavigationBar = ({
  items,
  pathname,
}: SideNavigationBarProps) => {
  return (
    <SideNavigationBarStyled items={items} pathname={pathname}>
      {items.map(({ href, icon, textValue }, index) => (
        <SideNavigationBarItem
          key={`SideNavigationBarItem-${index}`}
          href={href}
          icon={icon}
          textValue={textValue}
          activeFlag={pathname === href}
        />
      ))}
    </SideNavigationBarStyled>
  );
};

const SideNavigationBarStyled = styled.ul<SideNavigationBarProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 0;
  list-style: none;
`;
