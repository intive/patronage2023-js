"use client";

import { useTranslate } from "lib/hooks";
import { useEffect, useState } from "react";
import { SideNavigationBar, Icon, NavList } from "ui";
import { CreateNewBudget } from "./CreateNewBudget";
import { IconStyled } from "./SideNavigationBarNavListData";

import { SettingsSubMenuNavListContents } from "./SideNavigationBarNavListData";
import { SpanStyled } from "ui/NavList";
import { IconType } from "ui/Icon";
import styled from "styled-components";

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

export default function SideNav() {
  const { dict, t } = useTranslate("NavigationLayout");
  const { SideNav } = dict;

  const [isNavListItemClicked, setIsNavItemClicked] = useState(false);
  const [isCreateNewBudgetModalVisible, setIsCreateNewBudgetModalVisible] =
    useState(false);

  const [data, setData] = useState<Array<BudgetType>>([]);

  type BudgetType = {
    name: string;
    icon: IconType;
    id: {
      value: string | number;
    };
  };

  const [searchValue, setSearchValue] = useState("");

  const url =
    "https://inbudget-patronage-api-dev.azurewebsites.net/budgets/list";

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODMwNTI0MDQsImlhdCI6MTY4MzA0NTIwNCwianRpIjoiODRiOWZmZDMtNWEwNi00NWU1LWE0ZDctOTAwMDUxY2Q4NTZhIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjUwMjY5ZjM3LTcxOTYtNDNiMS05NTEwLTU2ZmI0MGIxZTZkNiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjUwMjY5ZjM3LTcxOTYtNDNiMS05NTEwLTU2ZmI0MGIxZTZkNiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.YtSAIkGzMy6b09k6A_CkD9rRkv6cit-Ch-AA7BQj2nSBl-JLprcpzxkTVIq0zXalugQRZ0k756GvBVzOBhqpvr5sS4lncGcGK3IqdMUDv6_46TObTQ163gRoyzXJw8NKJthKy3ugawegj25dFDumaZnwBSkqOOAHIMIdF0otmsYijcTy6vO5cQSw9DHPACDCGnb-m0ZoltMB10EQdaaKKZxfnWWg5-2bTt1sMLpIHCQwxEr2n4LgCKtCTKMVxWq96z0x47d1RzuYZ-BQW_92HuvawmahHZC2ZNVhM6nB7lW2PXzresNpr0tLh1BaKbvj7Pmu2fL5pop2kpyBKhh1Hw";
  const getBudgetsList = async (url: string, searchValue: string) => {
    await fetch(url, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageSize: 15,
        pageIndex: 1,
        search: searchValue,
        sortDescriptors: [
          {
            columnName: "name",
            sortAscending: true,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json.items);
        console.log(data);
      });
  };

  useEffect(() => {
    getBudgetsList(url, searchValue);
    console.log("click click");
  }, [searchValue]);

  const resetIsNavListItemClicked = () => {
    setIsNavItemClicked(false);
  };

  const hideSubMenu = () => {
    setIsNavItemClicked(true);
  };

  const closeModal = () => {
    setIsCreateNewBudgetModalVisible(false);
  };

  const openModal = () => {
    setIsCreateNewBudgetModalVisible(true);
  };

  const BudgetsSubMenuData = {
    title: t(SideNav.budgetsItem.title),
    sort: {
      clickHandler: () => {},
      icon: <Icon icon="filter_list" />,
    },
    searchInput: {
      placeholder: t(SideNav.budgetsItem.searchInputPlaceholder),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
        getBudgetsList(url, event.currentTarget.value);
        console.log("przeladowane");
      },
    },
    navigationList: (
      <NavList
        contents={
          data &&
          data.map((item) => {
            return {
              ComponentToRender: (
                <>
                  <IconStyled
                    icon={
                      iconNames.includes(item.icon)
                        ? item.icon
                        : "notifications"
                    }
                    iconSize={24}
                  />
                  <SpanStyled>{item.name}</SpanStyled>
                </>
              ),
              href: `/budgets/${item.id.value}`,
              id: item.id.value,
            };
          })
        }
        onNavListItemClick={hideSubMenu}
      />
    ),
    button: {
      clickHandler: () => {
        openModal();
      },
      label: t(SideNav.budgetsItem.buttonLabel),
    },
  };

  const SettingsSubMenuData = {
    title: t(SideNav.settingsItem.title),
    navigationList: (
      <NavList
        contents={SettingsSubMenuNavListContents}
        onNavListItemClick={hideSubMenu}
      />
    ),
  };

  return (
    <>
      <StyledResponse>
        {data.map((item) => (
          <p key={item.name}>{item.name}</p>
        ))}
      </StyledResponse>
      <SideNavigationBar
        items={[
          {
            data,
            href: "/budgets",
            icon: <Icon icon="wallet" iconSize={32} />,
            textValue: t(SideNav.budgetsItem.title),
            subMenu: BudgetsSubMenuData,
            id: 1,
          },
          {
            href: "/reports",
            icon: <Icon icon="query_stats" iconSize={32} />,
            textValue: t(SideNav.reportsItem.title),
            id: 2,
          },
          {
            href: "/settings",
            icon: <Icon icon="settings" iconSize={32} />,
            textValue: t(SideNav.settingsItem.title),
            subMenu: SettingsSubMenuData,
            id: 3,
          },
        ]}
        isNavListItemClicked={isNavListItemClicked}
        resetIsNavListItemClicked={resetIsNavListItemClicked}
      />
      <>
        {isCreateNewBudgetModalVisible && (
          <CreateNewBudget onClose={closeModal} />
        )}
      </>
    </>
  );
}

const StyledResponse = styled.div`
  display: flex;
  flex-direction: column;
`;
