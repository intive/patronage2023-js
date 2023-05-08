"use client";

import { useTranslate } from "lib/hooks";
import { useDebounce } from "lib/hooks/useDebounce";
import { useEffect, useState } from "react";
import { SideNavigationBar, Icon, NavList } from "ui";
import { CreateNewBudget } from "./CreateNewBudget";
import {
  BudgetsSubMenuNavListContents, // for testing
  IconStyled,
} from "./SideNavigationBarNavListData";
import { SettingsSubMenuNavListContents } from "./SideNavigationBarNavListData";

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

  const [searchValue, setSearchValue] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const debouncedSearch = useDebounce(searchValue, 500);

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM1NTc0MDIsImlhdCI6MTY4MzU1MDIwMiwianRpIjoiZTNiNThmNzQtMjEzOC00MzcwLTk5MDEtOGEzYTc3Yzc4OWEyIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjgxY2YzZGRhLTZlYjQtNDAzYi1iNGNkLTRjNDhkNjY5NTRiMSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjgxY2YzZGRhLTZlYjQtNDAzYi1iNGNkLTRjNDhkNjY5NTRiMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.e_bjSfgIhPiJ1Sb0NitduveRwodliQ-xIh3V9HZ1WcBM_bNOGilQDkv0wyfPNaEJV6yIEuun8SEQCm0mTy_KVHAGYIafzB-QRid07LEIIyk0iIJcgrqVoFXFJY_PY2nTJBt3d0Fy7wGNdWtu2p8xRQo8CpuBpR1QFAmHEsyJECZj4ulBTMB2jf-0-hQ-0hoPUp7avvtZyUxMlbxU2yW_zMwU-1wlSvvZ_7kRJoP5w15LjxdMW1U0CIXyH_n9ZVK_2fETwZp-BE5GTyKP6LV9w_kLo1wAgQ486m-S27k0hRdie_cGKsT3E4dBA8j_yqnOczFCUQQdrQeN_VXL4_6E9A";

  const budgetsMutation = useMutation({
    mutationFn: ({ pageSize, pageIndex, axiosInstance }: GetBudgetsListType) =>
      getBudgetsList({
        pageSize,
        pageIndex,
        searchValue,
        sortAscending,
        axiosInstance,
      }),
  });

  useEffect(() => {
    const pageSize = 200;
    const pageIndex = 1;
    const axiosInstance = reqInstance(token);
    budgetsMutation.mutateAsync({
      pageSize,
      pageIndex,
      searchValue,
      sortAscending,
      axiosInstance,
    });
  }, [debouncedSearch, sortAscending]);

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

  const successData =
    budgetsMutation.isSuccess &&
    budgetsMutation.data.items.map((item) => {
      return {
        ComponentToRender: (
          <>
            <IconStyled
              icon={iconNames.includes(item.icon) ? item.icon : "help"}
              iconSize={24}
            />
            <SpanStyled>{item.name}</SpanStyled>
          </>
        ),
        href: `/budgets/${item.id.value}`,
        id: item.id.value,
      };
    });

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
      onChange: (value: string) => {
        setSearchValue(value);
      },
    },
    navigationList: (
      <NavList
        contents={successData ? successData : []}
        onNavListItemClick={hideSubMenu}
        loading={budgetsMutation.isLoading}
        error={budgetsMutation.isError}
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

  return (
    <>
      <SideNavigationBar
        items={[
          {
            href: "/budgets",
            icon: <Icon icon="wallet" iconSize={32} />,
            textValue: t(SideNav.budgetsItem.title),
            subMenu: budgetsSubMenuData,
            id: "1",
          },
          {
            href: "/reports",
            icon: <Icon icon="query_stats" iconSize={32} />,
            textValue: t(SideNav.reportsItem.title),
            id: "2",
          },
          {
            href: "/settings",
            icon: <Icon icon="settings" iconSize={32} />,
            textValue: t(SideNav.settingsItem.title),
            subMenu: settingsSubMenuData,
            id: "3",
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
