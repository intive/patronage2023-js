import styled from "styled-components";
import { useState } from "react";

import { SideNavigationBarButton } from "./SideNavigationBarButton";
import { SideNavigationBarLink } from "./SideNavigationBarLink";
import { SubMenu } from "./SubMenu";
import { SubMenuDataProps } from "./SubMenu";

import { IconProps } from "../Icon";

type SideNavigationBarItemProps = {
  href: string;
  textValue: string;
  subMenu?: SubMenuDataProps;
} & IconProps;

type SideNavigationBarProps = {
  items: SideNavigationBarItemProps[];
};

type SubMenuBoolean = {
  isSubMenuShown: boolean;
};

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
    <>
      <SideNavigationBarStyled isSubMenuShown={isSubMenuShown}>
        {items.map(({ href, icon, textValue, subMenu }, index) => {
          return subMenu ? (
            <SideNavigationBarButton
              key={`SideNavigationBarButton-${index}`}
              onClick={() => showSubMenu(subMenu, index)}
              icon={icon}
              textValue={textValue}
              activeFlag={activeSideNavBarItemIndex === index}
            />
          ) : (
            <SideNavigationBarLink
              key={`SideNavigationBarLink-${index}`}
              href={href}
              icon={icon}
              textValue={textValue}
              activeFlag={activeSideNavBarItemIndex === index}
              onClick={() => handleLinkClick(index)}
            />
          );
        })}
      </SideNavigationBarStyled>
      {isSubMenuShown && subMenuData && (
        <SubMenu subMenuDataObject={subMenuData} />
      )}
    </>
  );
};

const SideNavigationBarStyled = styled.ul<SubMenuBoolean>`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 0;
  list-style: none;
  background-color: ${({ isSubMenuShown }) =>
    isSubMenuShown ? "white" : "#e5e5e5"};
  /* Is it a correct way to make a gap between Nav and SideNav? */
  padding-top: 40px;
`;
