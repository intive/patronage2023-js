"use client";

import { useTranslate } from "lib/hooks";
import { useDebounce } from "lib/hooks/useDebounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { SideNavigationBar, Icon, NavList } from "ui";
import { CreateNewBudget } from "./CreateNewBudget";
import {
  BudgetsSubMenuNavListContents, // for testing
  IconStyled,
} from "./SideNavigationBarNavListData";
import { SettingsSubMenuNavListContents } from "./SideNavigationBarNavListData";

import { iconNames } from "lib/consts";
import { SpanStyled } from "ui/NavList";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
  getBudgetsList,
  GetBudgetsListType,
  reqInstance,
} from "services/mutations";
import { useGetBudgets } from "lib/hooks/useGetBudgets";

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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM1ODg0NDksImlhdCI6MTY4MzU4MTI0OSwianRpIjoiNjA4MDdkNjQtNjJlOS00NDc4LWEzMmEtZjkyOWZiMDg5ZmQ3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjYwYWYzNzYyLThmYjgtNDBkYi05ZGQxLWY0OTI0YTQyYmQ1YyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjYwYWYzNzYyLThmYjgtNDBkYi05ZGQxLWY0OTI0YTQyYmQ1YyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.b3An54xdGmmFi1yyCrW-kEksi3-6BtkRvdVrUCXKPdHlZqLsGtVnluGfiPWbBj7LTrOamBpeOiZrTX5sedXNJTXeHexoJ7yWhq91wNIz9p9eD5ZfT5uxOfld713iL8r-uXUSNu30UMr1wzh34Ep68FV4d5aFddprE-_3tE_BUDk2IeBVeNMEeI0Q_XPJxvNZu0EVrb2UW4KmPJdkX1hWZyeWtIXBmslJO9cUTNjZR2VWJSI5h1x0wLS3afsuuuohrnNwYBkkqTb7NLLKTb1xYoi3QVFRJ5gdLTBAPhEWXh03xHAqVSn9xiupuwugK3FaJF7kLgkcz_dn5oHzQSL-ew";
  // const budgetsMutation = useMutation({
  //   mutationFn: ({ pageSize, pageIndex, axiosInstance }: GetBudgetsListType) =>
  //     getBudgetsList({
  //       pageSize,
  //       pageIndex,
  //       searchValue,
  //       sortAscending,
  //       axiosInstance,
  //     }),
  // });

  // useEffect(() => {
  //   budgetsMutation.mutateAsync({
  //     pageSize,
  //     pageIndex,
  //     searchValue,
  //     sortAscending,
  //     axiosInstance,
  //   });
  // }, [debouncedSearch, sortAscending]);

  const pageSize = 13;
  const pageIndex = 1;
  const axiosInstance = reqInstance(token);

  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
  } = useGetBudgets(debouncedSearch);

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastBudgetRef = useCallback(
    (budget: any) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((budgets) => {
        if (budgets[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (budget) intObserver.current.observe(budget);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

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
    // budgetsMutation.isSuccess &&
    // budgetsMutation.data.items.map((item) => {
    data?.pages
      .map((page) => {
        return page.items.map((item) => {
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
            ref: lastBudgetRef,
          };
        });
      })
      .flat();

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
        loading={isFetchingNextPage || status === "loading"}
        error={status === "error"}
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
        ref={lastBudgetRef}
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
