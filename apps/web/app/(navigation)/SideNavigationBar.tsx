"use client";

import { useTranslate } from "lib/hooks";
import { useEffect, useState } from "react";
import { SideNavigationBar, Icon, NavList } from "ui";
import { CreateNewBudget } from "./CreateNewBudget";
import { IconStyled } from "./SideNavigationBarNavListData";

import { SettingsSubMenuNavListContents } from "./SideNavigationBarNavListData";
import { SpanStyled } from "ui/NavList";
import { IconType } from "ui/Icon";

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

  const url =
    "https://inbudget-patronage-api-dev.azurewebsites.net/budgets/list";

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODI5NTk2NTgsImlhdCI6MTY4Mjk1MjQ1OCwianRpIjoiMmFjNTU5YjAtMzhjMC00YmUzLThiM2UtMDk4NThkZTlhNmZlIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImQzYmFkODVhLWI0MjAtNGQ0YS1iYmFmLTc0OGJjNzVhNzlhMSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImQzYmFkODVhLWI0MjAtNGQ0YS1iYmFmLTc0OGJjNzVhNzlhMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.gWFxl3vVvpW6E_bSuwLsQNwfpTESvmxlt966J_wtVcvmHFOVMNk_RwfLZrL4el80TK9a4OywvKgYxdsedR3HngOMceB3y9Umraq9SbIG3VNxj0NrORHMlsoXUxkKm-6tzgu5mc8ZlznECnN8nCdkaoAcvVw--yLpc8N9ZNn0zRosswkYZukHHuinNxKvILhyjl5LAS65wNIjsJWtod7Njgkiov1yhQ0s6_yJKYSlr08MsKnJEtfARi2-yXIzZMSwHGtRP7FnJMhCZHqKIR5lFWVKky-c6PUh3A_Cxo7P2BmEzmrKvAkT38aMHWTHADhNLiUG30owXZYzjqLtbV2ajA";

  const getBudgetsList = async (url: string) => {
    await fetch(url, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageSize: 10,
        pageIndex: 1,
        search: "",
        sortDescriptors: [
          {
            columnName: "name",
            sortAscending: true,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((json) => setData(json.items))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getBudgetsList(url);
  }, []);

  console.log(data);

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

  const [value, setValue] = useState("null");
  console.log(value);

  const BudgetsSubMenuData = {
    title: t(SideNav.budgetsItem.title),
    sort: {
      clickHandler: () => {},
      icon: <Icon icon="filter_list" />,
    },
    searchInput: {
      placeholder: t(SideNav.budgetsItem.searchInputPlaceholder),
      onChange: (event: any) => setValue(event.currentTarget.value),
      onInputCleared: () => setValue(""),
    },
    navigationList: (
      <NavList
        contents={data.map((item) => {
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
      <SideNavigationBar
        items={[
          {
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
