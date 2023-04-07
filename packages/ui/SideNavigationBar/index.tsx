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
  subMenu?: object;
} & IconProps;

type SideNavigationBarProps = {
  items: SideNavigationBarItemProps[];
  pathname: string;
};

type SubMenuBoolean = {
  isSubMenuShown: boolean;
};

type StateObject = {
  [key: string]: boolean;
};

const initiateSideNavBarItemsState = (items: SideNavigationBarItemProps[]) => {
  const stateObject: StateObject = {};
  items.forEach((item, index) => {
    return (stateObject[`${index}`] = false);
  });

  return stateObject;
};

const getSideNavBarItemsStateAfterClick = (
  temporaryStateObj: StateObject,
  index: number
) => {
  Object.keys(temporaryStateObj).forEach((key) => {
    if (key !== `${index}`) temporaryStateObj[key] = false;
  });
  temporaryStateObj[`${index}`] = !temporaryStateObj[`${index}`];

  return temporaryStateObj;
};

export const SideNavigationBar = ({
  items,
  pathname,
}: SideNavigationBarProps) => {
  const [isSubMenuShown, setIsSubMenuShown] = useState(false);
  const [subMenuData, setSubMenuData] = useState<{} | SubMenuDataProps>({});
  const [isSideNavBarItemClicked, setIsSideNavBarItemClicked] = useState(
    initiateSideNavBarItemsState(items)
  );

  const hideSubMenu = () => {
    setSubMenuData({});
    setIsSubMenuShown(false);
  };

  const showSubMenu = (subMenuData: object, index: number): void => {
    // Creating a shallow copy of state object
    const temporaryStateObj: any = Object.assign({}, isSideNavBarItemClicked);

    // Checking whether already active side nav bar item was clicked again, if so, it should be closed
    if (
      Object.entries(temporaryStateObj).find(([key, value]) => {
        return key === `${index}` && value === true;
      })
    ) {
      hideSubMenu();
      setIsSideNavBarItemClicked(initiateSideNavBarItemsState(items));
      return;
    }

    // Deactivate all side nav bar items apart from the one that has just been clicked
    setSubMenuData({ ...subMenuData });
    setIsSubMenuShown(true);
    setIsSideNavBarItemClicked(
      getSideNavBarItemsStateAfterClick(temporaryStateObj, index)
    );
  };

  const linkClickHandler = (index: any) => {
    hideSubMenu();

    const temporaryStateObj: any = Object.assign({}, isSideNavBarItemClicked);
    setIsSideNavBarItemClicked(
      getSideNavBarItemsStateAfterClick(temporaryStateObj, index)
    );
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
              activeFlag={isSideNavBarItemClicked[`${index}`]}
            />
          ) : (
            <SideNavigationBarLink
              key={`SideNavigationBarLink-${index}`}
              href={href}
              icon={icon}
              textValue={textValue}
              activeFlag={isSideNavBarItemClicked[`${index}`]}
              onClick={() => linkClickHandler(index)}
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
