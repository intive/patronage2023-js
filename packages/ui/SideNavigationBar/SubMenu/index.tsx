import styled from "styled-components";
import { IconProps } from "../../Icon";
import { BudgetsSubMenu } from "./BudgetsSubMenu";
import { TeamSubMenu } from "./TeamSubMenu";
import { SettingsSubMenu } from "./SettingsSubMenu";

export type SubMenuDataItemsProps = {
  icon: IconProps;
  label: string;
  href: string;
};

export type SubMenuDataProps = {
  title: string;
  sort: {
    method: Function;
    icon: IconProps;
  };
  searchInput: {
    icon: IconProps;
    placeholder: string;
  };
  items: SubMenuDataItemsProps[];
};

type SubMenuProps = {
  subMenuDataObject: SubMenuDataProps;
} & React.HTMLProps<HTMLDivElement>;

const SubMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 40px 16px 24px 16px;
  box-shadow: 10px 10px;

  border-left: 1px solid lightgray;
`;

export const SubMenu = ({ subMenuDataObject: subMenuData }: SubMenuProps) => {
  return (
    <SubMenuStyled>
      {subMenuData.title === "Budgets" ? (
        <BudgetsSubMenu
          title={subMenuData.title}
          sort={subMenuData.sort}
          searchInput={subMenuData.searchInput}
          items={subMenuData.items}
        />
      ) : subMenuData.title === "Team" ? (
        <TeamSubMenu
          title={subMenuData.title}
          sort={subMenuData.sort}
          searchInput={subMenuData.searchInput}
          items={subMenuData.items}
        />
      ) : subMenuData.title === "Settings" ? (
        <SettingsSubMenu title={subMenuData.title} items={subMenuData.items} />
      ) : (
        ""
      )}
    </SubMenuStyled>
  );
};
