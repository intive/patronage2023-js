import styled from "styled-components";
import { useState, ReactNode } from "react";

import { SideNavigationBarButton } from "./SideNavigationBarButton";
import { SideNavigationBarLink } from "./SideNavigationBarLink";
import { SubMenu, SubMenuDataProps } from "./SubMenu";

type SideNavigationBarItemProps = {
  href: string;
  icon: ReactNode;
  textValue: string;
  subMenu?: SubMenuDataProps;
  id: number;
};

type SideNavigationBarProps = {
  items: SideNavigationBarItemProps[];
};

type SubMenuBoolean = {
  isSubMenuShown: boolean;
};

const Wrapper = styled.div`
  position: relative;
`;

const SideNavigationBarStyled = styled.ul<SubMenuBoolean>`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  height: 100%;
  padding: 40px 0 0 0;
  list-style: none;
  background-color: ${({ isSubMenuShown, theme }) =>
    isSubMenuShown
      ? theme.sideNavigationBar.background.activeColor
      : theme.sideNavigationBar.background.inactiveColor};
`;

export const SideNavigationBar = ({ items }: SideNavigationBarProps) => {
  const [isSubMenuShown, setIsSubMenuShown] = useState(false);
  const [subMenuData, setSubMenuData] = useState<SubMenuDataProps>();
  const [activeSideNavBarItemIndex, setActiveSideNavBarItemIndex] =
    useState<number>();

  const hideSubMenu = () => {
    setActiveSideNavBarItemIndex(undefined);
    setSubMenuData(undefined);
    setIsSubMenuShown(false);
  };

  const showSubMenu = (subMenu: SubMenuDataProps, index: number) => {
    if (activeSideNavBarItemIndex === index) {
      return hideSubMenu();
    }
    setActiveSideNavBarItemIndex(index);
    setSubMenuData(subMenu);
    setIsSubMenuShown(true);
  };

  const handleLinkClick = (index: number) => {
    hideSubMenu();
    setActiveSideNavBarItemIndex(index);
  };

  return (
    <Wrapper>
      <SideNavigationBarStyled isSubMenuShown={isSubMenuShown}>
        {items.map(({ href, icon, textValue, subMenu, id }, index) => {
          return subMenu ? (
            <SideNavigationBarButton
              key={id}
              onClick={() => showSubMenu(subMenu, index)}
              icon={icon}
              textValue={textValue}
              activeFlag={activeSideNavBarItemIndex === index}
            />
          ) : (
            <SideNavigationBarLink
              key={id}
              href={href}
              icon={icon}
              textValue={textValue}
              activeFlag={activeSideNavBarItemIndex === index}
              onClick={() => handleLinkClick(index)}
            />
          );
        })}
      </SideNavigationBarStyled>
      {subMenuData && <SubMenu subMenuDataObject={subMenuData} />}
    </Wrapper>
  );
};
