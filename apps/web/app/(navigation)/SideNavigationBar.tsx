"use client";

import { useTranslate } from "lib/hooks";
import { useDebounce } from "lib/hooks/useDebounce";
import { useCallback, useRef, useState } from "react";
import { SideNavigationBar, Icon, NavList } from "ui";
import { CreateNewBudget } from "./CreateNewBudget";

import { iconNames } from "lib/iconValidation";
import { SpanStyled } from "ui/NavList";
import { useGetBudgets } from "lib/hooks/useGetBudgets";
import { useQueryClient } from "@tanstack/react-query";
import { ItemType } from "services/mutations";
import { Favourite } from "./Favourite";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { categoryFilterAtom } from "store";
import { useSetAtom } from "jotai";

export const IconStyled = styled(Icon)`
  background: white;
  padding: 4px;
  border-radius: 8px;
`;

export default function SideNav() {
  const { dict, t } = useTranslate("NavigationLayout");
  const { SideNav } = dict;

  const { data: session } = useSession();
  const setCategoryFilter = useSetAtom(categoryFilterAtom);

  const [isNavListItemClicked, setIsNavItemClicked] = useState(false);
  const [isCreateNewBudgetModalVisible, setIsCreateNewBudgetModalVisible] =
    useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const debouncedSearch = useDebounce(searchValue, 500);

  const queryClient = useQueryClient();
  const pageSize = 13;

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    refetch,
  } = useGetBudgets(debouncedSearch, sortAscending, pageSize);

  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastBudgetRef = useCallback(
    (budget: HTMLLIElement) => {
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

  const text = {
    noData: t(dict.SideNav.budgetsItem.infos.text),
    noDataInBudgets: t(dict.SideNav.budgetsItem.infos.noDataInBudgets),
    loading: t(dict.SideNav.budgetsItem.infos.loading),
    error: t(dict.SideNav.budgetsItem.infos.error),
  };

  const resetIsNavListItemClicked = () => {
    setIsNavItemClicked(false);
  };

  const hideSubMenu = () => {
    setIsNavItemClicked(true);
  };

  const navListItemClickHandler = () => {
    hideSubMenu();
    setCategoryFilter([]);
    refetch();
  };

  const closeModal = () => {
    setIsCreateNewBudgetModalVisible(false);
  };

  const openModal = () => {
    setIsCreateNewBudgetModalVisible(true);
  };

  const successData =
    data?.pages?.flatMap(
      ({ items }: ItemType) =>
        items &&
        items.map(({ icon, name, id, isFavourite }) => ({
          ComponentToRender: (
            <>
              <IconStyled
                icon={iconNames.includes(icon) ? icon : "help"}
                iconSize={24}
              />
              <SpanStyled>{name}</SpanStyled>
              <Favourite
                isFav={isFavourite}
                budgetId={id.value}
                activeHref={`/budgets/${id.value}`}
              />
            </>
          ),
          href: `/budgets/${id.value}`,
          id: id.value,
          ref: lastBudgetRef,
        }))
    ) ?? [];

  const budgetsSubMenuData = {
    title: t(SideNav.budgetsItem.title),
    sort: {
      clickHandler: () => {
        queryClient.clear();
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
      resetSearch: () => {
        setSearchValue("");
      },
    },
    navigationList: (
      <NavList
        contents={successData}
        onNavListItemClick={navListItemClickHandler}
        loading={isFetchingNextPage || status === "loading"}
        error={status === "error"}
        text={text}
        isSearchEmpty={!!!searchValue}
      />
    ),
    button: {
      clickHandler: () => {
        openModal();
      },
      label: t(SideNav.budgetsItem.buttonLabel),
    },
  };

  // edit settingSubmenu items below
  const settingsSubmenuItems = [
    {
      ComponentToRender: (
        <span>{t(dict.SideNav.settingsItem.settingsItems.editProfile)}</span>
      ),
      href: "/settings/edit-profile",
      id: 1,
    },
    {
      ComponentToRender: (
        <span>{t(dict.SideNav.settingsItem.settingsItems.changePassword)}</span>
      ),
      href: "/settings/change-password",
      id: 2,
    },
    {
      ComponentToRender: (
        <span>{t(dict.SideNav.settingsItem.settingsItems.language)}</span>
      ),
      href: "/settings/change-language",
      id: 3,
    },
  ];

  const settingsSubMenuData = {
    title: t(SideNav.settingsItem.title),
    navigationList: (
      <NavList
        contents={settingsSubmenuItems}
        onNavListItemClick={hideSubMenu}
      />
    ),
  };

  //edit navbarItems below
  const navbarItems = [
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
  ];

  const renderNavbar = () => {
    //add items for admin
    if (session?.user.role === "ADMIN") {
      return [
        ...navbarItems,
        {
          href: "/users",
          icon: <Icon icon="account_circle" iconSize={32} />,
          textValue: t(SideNav.usersItem.title),
          id: "4",
        },
      ];
    }
    return navbarItems;
  };

  return (
    <>
      <SideNavigationBar
        items={renderNavbar()}
        isNavListItemClicked={isNavListItemClicked}
        resetIsNavListItemClicked={resetIsNavListItemClicked}
        refetchBudgetsFunction={refetch}
        resetSearch={setSearchValue}
      />
      <>
        {isCreateNewBudgetModalVisible && (
          <CreateNewBudget onClose={closeModal} />
        )}
      </>
    </>
  );
}
