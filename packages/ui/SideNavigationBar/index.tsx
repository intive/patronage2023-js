import styled from "styled-components";
import { useState } from "react";

import { SideNavigationBarButton } from "./SideNavigationBarButton";
import { SideNavigationBarLink } from "./SideNavigationBarLink";
import { SubMenu } from "./SubMenu";

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

const initiateSubMenusState = (items: SideNavigationBarItemProps[]) => {
  const stateObject: any = {};
  items.forEach((item, index) => {
    if (item.subMenu) return (stateObject[`${index}`] = false);
  });

  return stateObject;
};

const getSubMenusStateAfterClick = (temporaryStateObj: any, index: number) => {
  Object.keys(temporaryStateObj).forEach((key) => {
    if (key !== `${index}`) temporaryStateObj[key] = false;
  });
  temporaryStateObj[`${index}`] = !temporaryStateObj[`${index}`];

  return temporaryStateObj;
};

const Divider = styled.div`
  width: 1px;
  height: inherit;
  background-color: lightgray;
  content: " ";
`;

export const SideNavigationBar = ({
  items,
  pathname,
}: SideNavigationBarProps) => {
  const [isSubMenuShown, setIsSubMenuShown] = useState(false);
  const [subMenuData, setSubMenuData] = useState({});

  const [isSpecSubMenuShown, setIsSpecSubMenuShown] = useState(
    initiateSubMenusState(items)
  );

  const showSubMenu = (subMenuData: object, index: any): void => {
    // Creating a shallow copy of state object
    const temporaryStateObj: any = Object.assign({}, isSpecSubMenuShown);

    // Checking whether already active side nav bar item was clicked again, if so, it should be closed
    if (
      Object.entries(temporaryStateObj).find(([key, value]) => {
        return key === `${index}` && value === true;
      })
    ) {
      hideSubMenu();
      return setIsSpecSubMenuShown(
        getSubMenusStateAfterClick(temporaryStateObj, index)
      );
    }

    // Deactivate all side nav bar items apart from the one that has just been clicked
    setIsSpecSubMenuShown(getSubMenusStateAfterClick(temporaryStateObj, index));
    setSubMenuData({ ...subMenuData });
    setIsSubMenuShown(true);
  };

  const hideSubMenu = () => {
    setSubMenuData({});
    setIsSubMenuShown(false);
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
              activeFlag={isSpecSubMenuShown[`${index}`]}
            />
          ) : (
            <SideNavigationBarLink
              key={`SideNavigationBarLink-${index}`}
              href={href}
              icon={icon}
              textValue={textValue}
              activeFlag={href === pathname}
            />
          );
        })}
      </SideNavigationBarStyled>
      {isSubMenuShown && subMenuData && (
        <>
          <Divider></Divider>
          <SubMenu dataObject={subMenuData} />
        </>
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
  padding-top: 20px;
`;
