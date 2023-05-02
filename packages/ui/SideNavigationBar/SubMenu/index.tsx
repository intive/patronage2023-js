import styled from "styled-components";
import { ReactNode, useState } from "react";
import { SearchInput } from "../../Input/SearchInput";
import { Button } from "../../Button";
import { Icon, IconType } from "../../Icon";
import { NavList } from "../..";
import { SpanStyled } from "../../NavList";

const iconNames = [
  "home",
  "add",
  "cancel",
  "bar_chart",
  "settings",
  "account_circle",
  "check_box",
  "edit",
  "history",
  "visibility",
  "check_indeterminate_small",
  "trending_up",
  "search",
  "filter_list",
  "sort",
  "delete",
  "close",
  "check_box_outline_blank",
  "person_add",
  "notifications",
  "visibility_off",
  "event",
  "trending_down",
  "arrow_drop_down",
  "arrow_back",
  "arrow_forward",
  "chevron_left",
  "chevron_right",
  "radio_button_checked",
  "error",
  "schedule",
  "check",
  "area_chart",
  "shopping_cart",
  "drafts",
  "more_vert",
  "wallet",
  "menu",
  "drag_handle",
  "radio_button_unchecked",
  "help",
  "arrow_drop_up",
  "check_small",
  "query_stats",
  "savings",
  "directions_car",
  "payments",
  "subscriptions",
  "done",
  "priority_high",
];

const IconStyled = styled(Icon)`
  background: white;
  padding: 4px;
  border-radius: 8px;
`;

export type SubMenuDataProps = {
  title: string;
  sort?: {
    clickHandler: () => void;
    icon: ReactNode;
  };
  searchInput?: {
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onInputCleared?: () => void;
    value?: string;
  };
  navigationList?: ReactNode;
  button?: {
    clickHandler: () => void;
    label: string;
  };
};

type BudgetType = {
  name: string;
  icon: IconType;
  id: {
    value: string | number;
  };
};

type SubMenuProps = {
  subMenuDataObject: SubMenuDataProps;
  data?: any;
} & React.HTMLProps<HTMLDivElement>;

const SubMenuStyled = styled.div`
  position: absolute;
  top: 0;
  left: 80px;
  height: 100%;
  width: 288px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;

  padding: 40px 16px 24px 16px;
  border-left: 1px solid
    ${({ theme }) => theme.sideNavigationBar.subMenu.separator};
  background-color: ${({ theme }) =>
    theme.sideNavigationBar.subMenu.background};
  box-shadow: 3px 0 10px lightgray;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-family: "Signika";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => theme.sideNavigationBar.subMenu.title};
  line-height: 36px;
`;

export const SubMenu = ({
  subMenuDataObject: subMenuData,
  children,
}: SubMenuProps) => {
  const { title, sort, searchInput, navigationList, button } = subMenuData;

  const navigationList2 = (
    <NavList
      contents={[...(children as BudgetType[])].map((item) => {
        return {
          ComponentToRender: (
            <>
              <IconStyled
                icon={
                  iconNames.includes(item.icon) ? item.icon : "notifications"
                }
                iconSize={24}
              />
              <SpanStyled>{item.name}</SpanStyled>
            </>
          ),
          href: `/budgets/${item.id.value}`,
          id: item.id.value,
        };
      })}
      onNavListItemClick={() => {}}
    />
  );
  return (
    <SubMenuStyled>
      <MainDiv>
        <HeaderStyled>
          <Title>{title}</Title>
          {sort?.icon}
        </HeaderStyled>
        {searchInput && (
          <SearchInput
            name="searchInput"
            type="text"
            placeholder={searchInput.placeholder}
            value={searchInput.value}
            onChange={searchInput.onChange}
            onInputCleared={searchInput.onInputCleared}
          />
        )}
        {/* {[...(children as BudgetType[])].map((item) => (
          <p key={item.name}>{item.name}</p>
        ))} */}
        {navigationList2}
      </MainDiv>

      {button && (
        <Button variant="secondary" onClick={() => button.clickHandler()}>
          {button.label}
        </Button>
      )}
    </SubMenuStyled>
  );
};
