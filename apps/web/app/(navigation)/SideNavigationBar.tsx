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
import { useMutation } from "@tanstack/react-query";
import {
  getBudgetsList,
  GetBudgetsListType,
  reqInstance,
} from "services/mutations";

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

  // const token = "dsf";
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM0MjI2MjQsImlhdCI6MTY4MzQxNTQyNCwianRpIjoiNGM0ZjIwZTktNDM2Ny00M2IwLTk0MDQtZTEwYjRkNDMzZWFlIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjVmNWQxYzc5LTllN2UtNGUyNy1iNWVlLWZmZTVmZTViNWI3NSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjVmNWQxYzc5LTllN2UtNGUyNy1iNWVlLWZmZTVmZTViNWI3NSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.G4bvciOzlBjIJVmsBe6QYP6RHHBdfuXKFHYInFEpaGONLqbgnr_7Oft3EJDjB1qks0tntvJSsLyz82KXFSi5icCeXNIwQf1n5fQAXTBxgYlzZ_feAGct9vbBPTePTepQBlNgrklqV2ww_qYoTvAKW9M0pD4FuwXUUMkdJDhi3nBi_jaGPY9Z7JkdhG2BvP8-E5PuVVg6LFCS0Hhlu9dcF1i26VM2jeduLmjdferreLy28z-57An_dARzHKD5a83P7RTIpF73glh8_qp8gkSsS6LdqY4_7pjG5ie_Odf6ubVe-unAn3ofeiAY8Sfd7ayUYZRUg5nt2fb0sJVhTG-RPw";

  const budgetsMutation = useMutation({
    mutationFn: ({ pageSize, pageIndex, axiosInstance }: GetBudgetsListType) =>
      getBudgetsList({ pageSize, pageIndex, axiosInstance }),
  });

  useEffect(() => {
    //getBudgetsList(url, searchValue, sortAscending);
    console.log("click click");
  }, [searchValue, sortAscending]);

  useEffect(() => {
    //getBudgetsList(url, searchValue, sortAscending);
    const pageSize = 15;
    const pageIndex = 1;
    const axiosInstance = reqInstance(token);

    budgetsMutation.mutateAsync({ pageSize, pageIndex, axiosInstance });
    console.log("click click");
  }, []);

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

  const budgetsSubMenuData = {
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
        //getBudgetsList(url, event.currentTarget.value, sortAscending);
        console.log("przeladowane");
      },
    },
    navigationList: (
      <NavList
        // contents={BudgetsSubMenuNavListContents}
        contents={
          budgetsMutation.isSuccess
            ? budgetsMutation.data.items.map((item) => {
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
            : BudgetsSubMenuNavListContents
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

  const settingsSubMenuData = {
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
            href: "/budgets",
            icon: <Icon icon="wallet" iconSize={32} />,
            textValue: t(SideNav.budgetsItem.title),
            subMenu: budgetsSubMenuData,
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
            subMenu: settingsSubMenuData,
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
