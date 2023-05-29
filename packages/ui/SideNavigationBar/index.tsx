import styled from "styled-components";
import { useState, ReactNode, useMemo } from "react";

import { SideNavigationBarButton } from "./SideNavigationBarButton";
import { SideNavigationBarLink } from "./SideNavigationBarLink";
import { SubMenu, SubMenuDataProps } from "./SubMenu";
import { device } from "web/lib/media-queries";

type SideNavigationBarItemProps = {
  href: string;
  icon: ReactNode;
  textValue: string;
  subMenu?: SubMenuDataProps;
  id: string;
};

type SideNavigationBarProps = {
  items: SideNavigationBarItemProps[];
  isNavListItemClicked: boolean;
  resetIsNavListItemClicked: () => void;
  refetchBudgetsFunction: () => void;
};

type SubMenuBoolean = {
  isSubMenuShown: boolean;
  isNavListItemClicked: boolean;
};

const Wrapper = styled.div`
  position: relative;
`;

const SideNavigationBarStyled = styled.ul<SubMenuBoolean>`
  width: 94px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 5;
  height: 100%;
  padding-top: 40px;
  list-style: none;
  background-color: ${({ isSubMenuShown, theme, isNavListItemClicked }) =>
      !isNavListItemClicked && !isSubMenuShown
        ? theme.sideNavigationBar.background.activeColor
        : theme.sideNavigationBar.background.inactiveColor};
  border-right: 1px solid
    ${({ theme }) => theme.sideNavigationBar.background.separator};

  ${device.tablet} {
    border-right: none;
  }
`;

export const SideNavigationBar = ({
  items,
  isNavListItemClicked,
  resetIsNavListItemClicked,
  refetchBudgetsFunction,
}: SideNavigationBarProps) => {
  const [subMenuId, setSubMenuId] = useState("");
  const [isSubMenuShown, setIsSubMenuShown] = useState(false);

  const item = useMemo(
    () => items.find((item) => item.id === subMenuId),
    [items, subMenuId]
  );
  const subMenuData = item ? item.subMenu : undefined;

  const hideSubMenu = () => {
    setSubMenuId("");
    setIsSubMenuShown(false);
    refetchBudgetsFunction();
  };

  const showSubMenu = (id: string) => {
    if (subMenuData && subMenuId === id && !isNavListItemClicked) {
      return hideSubMenu();
    }
    setSubMenuId(id);
    resetIsNavListItemClicked();
    setIsSubMenuShown(true);
  };

  const handleLinkClick = (id: string) => {
    hideSubMenu();
    setSubMenuId(id);
  };
  return (
    <Wrapper>
      <SideNavigationBarStyled
        isSubMenuShown={!subMenuData}
        isNavListItemClicked={isNavListItemClicked}>
        {items.map(({ href, icon, textValue, subMenu, id }) => {
          return subMenu ? (
            <SideNavigationBarButton
              key={id}
              onClick={() => {
                showSubMenu(id);
              }}
              icon={icon}
              textValue={textValue}
              activeFlag={subMenuId === id}
            />
          ) : (
            <SideNavigationBarLink
              key={id}
              href={href}
              icon={icon}
              textValue={textValue}
              activeFlag={subMenuId === id}
              onClick={() => handleLinkClick(id)}
            />
          );
        })}
      </SideNavigationBarStyled>
      {!isNavListItemClicked && isSubMenuShown && subMenuData ? (
        <SubMenu subMenuDataObject={subMenuData} />
      ) : null}
    </Wrapper>
  );
};
