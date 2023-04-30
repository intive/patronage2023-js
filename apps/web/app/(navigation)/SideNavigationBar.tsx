"use client";

import { useTranslate } from "lib/hooks";
import { useEffect, useState } from "react";
import { SideNavigationBar, Icon, NavList } from "ui";
import { CreateNewBudget } from "./CreateNewBudget";
import { IconStyled } from "./SideNavigationBarNavListData";

import { SettingsSubMenuNavListContents } from "./SideNavigationBarNavListData";
import { SpanStyled } from "ui/NavList";

export default function SideNav() {
  const { dict, t } = useTranslate("NavigationLayout");
  const { SideNav } = dict;

  const [isNavListItemClicked, setIsNavItemClicked] = useState(false);

  const [isCreateNewBudgetModalVisible, setIsCreateNewBudgetModalVisible] =
    useState(false);

  const [data, setData] = useState([]);

  const url =
    "https://inbudget-patronage-api-dev.azurewebsites.net/budgets/list";

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODI4NTAxNjUsImlhdCI6MTY4Mjg0Mjk2NSwianRpIjoiMGE5YjM2NjItODliMC00NTcxLWFlZmItYTJkYmNlY2NhOGNkIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjAxZGVhYzY3LTYzZmEtNDI1YS1hM2RlLTU1NGJiNmY1M2E2NCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjAxZGVhYzY3LTYzZmEtNDI1YS1hM2RlLTU1NGJiNmY1M2E2NCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.hWx85q30pClpBk860YhK43MCSkT97y6Yp9gPq_vy3yiZxq8hH2P6HVAUH-kOI3NGhtUhEejJfQSJm07DVfxTrOPvw5l6p9wZojK2zIUsDKutiTRc0Lodv6lDgOxVnvLXPKN0uzLp6oO5ydAvEl6Ir-ZZHL28bRyzx5I3LmKxrSo8TnGdhwotXa1pTNx8nO9p23dL6_rguD-E0chQy1hBQAjO70-nEwrDT57C_lkOmOixO38AZ7pkTbWz5gVL226iIa5mOuUHroz3q2TgOpIdk_Fz6AmJkDnydSjRVM0Frhj5QTakG8UbaBi_9hwKnrJrG71G4shpz60WVB7VyBk5RA";

  const getBudgetsList = async (url: any) => {
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
      .then((json) => {
        setData(json.items);
      });
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

  const BudgetsSubMenuData = {
    title: t(SideNav.budgetsItem.title),
    sort: {
      clickHandler: () => {},
      icon: <Icon icon="filter_list" />,
    },
    searchInput: {
      placeholder: t(SideNav.budgetsItem.searchInputPlaceholder),
    },
    navigationList: (
      <NavList
        contents={data.map((item) => {
          return {
            ComponentToRender: (
              <>
                <IconStyled icon={"directions_car"} iconSize={24} />
                <SpanStyled>{item.name}</SpanStyled>
              </>
            ),
            href: item.id.value,
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
