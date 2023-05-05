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
  const [sortAscending, setSortAscending] = useState(true);

  const url =
    "https://inbudget-patronage-api-dev.azurewebsites.net/budgets/list";

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODMyOTk1MzMsImlhdCI6MTY4MzI5MjMzMywianRpIjoiMjNlYTYwZGMtNjRjMy00YjQ2LWEyOWItZWZhODhjMDVlODMzIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjdkNWE4OWQ0LWM3ZTAtNGI5ZS1hNzA1LTcxNzgxY2JjM2I2ZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjdkNWE4OWQ0LWM3ZTAtNGI5ZS1hNzA1LTcxNzgxY2JjM2I2ZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.LmHOwKeY1uDPfWbCHt1Eqxa3lmWhOvJG1bDZDtwHD5qlZty81Vc8E99Aj-0tBRpTLAT8FCuU5RjLxwOBXVa6YD0HgwsxkT4ukOiHFbSnBezcDWOKtERyLERuEDmB7Totzv67u8GWf02cFjEpssYo2CX6xxLu2Z31uD4ys25TIp1TbzEPn-nvWKwzCP9Qq1JX_YS8eGTYQYpIITjuNxzAbsBzL6J5pWBeQLCwljEFt1Qm4afMr5z2nSx5w8evuwhWIuXFQTN44P5Tr__4SkacRRK64Vry3BQ46dkTFGt9MDX8GSvYXjsXOr92NLJ64Q4BYLTVMAG9-DOkgD1fQIYCHA";

  const getBudgetsList = async (
    url: string,
    searchValue: string,
    sortAscending: boolean
  ) => {
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
            sortAscending: sortAscending,
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
    getBudgetsList(url, searchValue, sortAscending);
    console.log("click click");
  }, [searchValue, sortAscending]);

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
      clickHandler: () => {
        setSortAscending(!sortAscending);
      },
      icon: "filter_list",
      sortAscending: sortAscending,
    },
    searchInput: {
      placeholder: t(SideNav.budgetsItem.searchInputPlaceholder),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
        getBudgetsList(url, event.currentTarget.value, sortAscending);
        console.log("przeladowane");
      },
    },
    navigationList: (
      <NavList
        // contents={BudgetsSubMenuNavListContents}
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

  console.log("sortAscending", sortAscending);

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
