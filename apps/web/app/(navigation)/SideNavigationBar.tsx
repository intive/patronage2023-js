"use client";

import { useTranslate } from "lib/hooks";
import { useEffect, useState } from "react";
import { SideNavigationBar, Icon, NavList } from "ui";
import { CreateNewBudget } from "./CreateNewBudget";
import {
  BudgetsSubMenuNavListContents,
  IconStyled,
} from "./SideNavigationBarNavListData";
import { SettingsSubMenuNavListContents } from "./SideNavigationBarNavListData";
import { IconType } from "ui/Icon";
import { iconNames } from "lib/consts";
import { SpanStyled } from "ui/NavList";

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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODMyNzgwNjUsImlhdCI6MTY4MzI3MDg2NCwianRpIjoiNzJkZTEwZGYtMDk0Yi00MjVjLTlmM2QtNDYyYTE0ZmJjYzZkIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjI1Zjk5MmFkLWE4YzQtNGQ5Ni05MmYwLTVlNzVhYjIyNDhlOCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjI1Zjk5MmFkLWE4YzQtNGQ5Ni05MmYwLTVlNzVhYjIyNDhlOCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.dZ3Zu0QaunwRWXbjZqIxwYxPTJMQWmNaQ59uQC30-Da0wwy3BJ3CFPI8vmFefZCNPbjojytWZ3-eBvxESh5DtPiaY6MbaV-adH3nJlsdwBwHIy49ThKgugoQTB1rZ0tPm-5zkh6X6DIMH4pR97PAgn7ajePLM8zukSd2oZCiltTBf5zO60p1fjrZ1dUM6KNk2hmVh9CLa46nUeIhAZn5G8CA6BmGYaO7zLGFVnOi9pQrZQS7tueMmuymqRPtk8gmzMgiJAn0Vw5aE2ijeIK_7xAD0PphqTexsB4b__CObRJb7eeJfKQavoaBfRio0NVgFGNR1RCuvbjwhNCKw2sc5g";

  const getBudgetsList = async (url: string, searchValue: string) => {
    await fetch(url, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
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
        contents={BudgetsSubMenuNavListContents}
        // contents={
        //   data &&
        //   data.map((item) => {
        //     return {
        //       ComponentToRender: (
        //         <>
        //           <IconStyled
        //             icon={
        //               iconNames.includes(item.icon)
        //                 ? item.icon
        //                 : "notifications"
        //             }
        //             iconSize={24}
        //           />
        //           <SpanStyled>{item.name}</SpanStyled>
        //         </>
        //       ),
        //       href: `/budgets/${item.id.value}`,
        //       id: item.id.value,
        //     };
        //   })
        // }
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
            // data,
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
