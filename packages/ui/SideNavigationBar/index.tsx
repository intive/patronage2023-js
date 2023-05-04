import styled from "styled-components";
import { useState, ReactNode, useEffect } from "react";

import { SideNavigationBarButton } from "./SideNavigationBarButton";
import { SideNavigationBarLink } from "./SideNavigationBarLink";
import { SubMenu, SubMenuDataProps } from "./SubMenu";

type SideNavigationBarItemProps = {
  href: string;
  icon: ReactNode;
  textValue: string;
  subMenu?: SubMenuDataProps;
  id: number;
  data?: any;
};

type SideNavigationBarProps = {
  items: SideNavigationBarItemProps[];
  isNavListItemClicked: boolean;
  resetIsNavListItemClicked: () => void;
};

type SubMenuBoolean = {
  isSubMenuShown: boolean;
  isNavListItemClicked: boolean;
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
  background-color: ${({ isSubMenuShown, theme, isNavListItemClicked }) =>
    !isNavListItemClicked && isSubMenuShown
      ? theme.sideNavigationBar.background.activeColor
      : theme.sideNavigationBar.background.inactiveColor};
`;

export const SideNavigationBar = ({
  items,
  isNavListItemClicked,
  resetIsNavListItemClicked,
}: SideNavigationBarProps) => {
  const { data } = items[0];
  const [isSubMenuShown, setIsSubMenuShown] = useState(false);
  const [subMenuData, setSubMenuData] = useState<SubMenuDataProps>();
  const [activeSideNavBarItemIndex, setActiveSideNavBarItemIndex] =
    useState<number>();

  useEffect(() => {
    if (subMenuData && activeSideNavBarItemIndex === 0)
      setSubMenuData(items[activeSideNavBarItemIndex].subMenu);
  }, [items]);

  const hideSubMenu = () => {
    setActiveSideNavBarItemIndex(undefined);
    setSubMenuData(undefined);
    setIsSubMenuShown(false);
  };

  const showSubMenu = (subMenu: SubMenuDataProps, index: number) => {
    if (!isNavListItemClicked && activeSideNavBarItemIndex === index) {
      return hideSubMenu();
    }
    resetIsNavListItemClicked();
    setActiveSideNavBarItemIndex(index);
    setSubMenuData(subMenu);
    setIsSubMenuShown(true);
  };

  const handleLinkClick = (index: number) => {
    hideSubMenu();
    setActiveSideNavBarItemIndex(index);
  };

  const onInputChangeUpdateSubMenuData = (title: string) => {
    // items.forEach((item) => {
    //   if (title === item.subMenu?.title) {
    //     setSubMenuData(item.subMenu);
    //   }
    // });
  };

  return (
    <Wrapper>
      <SideNavigationBarStyled
        isSubMenuShown={isSubMenuShown}
        isNavListItemClicked={isNavListItemClicked}>
        {items.map(({ href, icon, textValue, subMenu, id }, index) => {
          return subMenu ? (
            <SideNavigationBarButton
              key={id}
              onClick={() => {
                showSubMenu(subMenu, index);
              }}
              icon={icon}
              textValue={textValue}
              activeFlag={
                !isNavListItemClicked && activeSideNavBarItemIndex === index
              }
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
      {!isNavListItemClicked && subMenuData && (
        <SubMenu
          onInputChangeUpdateSubMenuData={onInputChangeUpdateSubMenuData}
          subMenuDataObject={subMenuData}>
          {data}
        </SubMenu>
      )}
    </Wrapper>
  );
};
