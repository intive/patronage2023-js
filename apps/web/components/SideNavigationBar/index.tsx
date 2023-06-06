"use client";
import { useCallback, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import { useTranslate } from "lib/hooks";
import { useDebounce } from "lib/hooks/useDebounce";
import { useGetBudgets } from "lib/hooks/useGetBudgets";
import useSuperfetch from "lib/hooks/useSuperfetch";
import validate from "lib/validations/iconValidation";

import { CreateNewBudget } from "../../app/(navigation)/budgets/[id]/BudgetContent/CreateNewBudget";
import { ItemType, BudgetType } from "services/mutations";
import { Favourite } from "./Favourite";

import { categoryFilterAtom } from "store";

import { ImportModal } from "components/ImportModal";
import { SideNavigationBar, Icon, NavList, useToast } from "ui";
import { SpanStyled } from "ui/NavList";
import { ImportCSVInstructionScreen } from "components/ImportModal/ImportModal.screens";
import { ExportResponseProps } from "lib/types";

export const IconStyled = styled(Icon)`
  background: ${({ theme }) => theme.navList.navItem.iconBackgroundColor};
  padding: 4px;
  border-radius: 8px;
`;

export default function SideNav() {
  const { dict, t } = useTranslate("NavigationLayout");
  const { SideNav } = dict;
  const { t: tExport, dict: dictExport } = useTranslate("ExportFile");
  const { t: tImport, dict: dictImport } = useTranslate("ImportModal"); //

  const { data: session } = useSession();
  const setCategoryFilter = useSetAtom(categoryFilterAtom);
  const showToast = useToast();
  const superFetch = useSuperfetch();

  const [isNavListItemClicked, setIsNavItemClicked] = useState(false);
  const [isCreateNewBudgetModalVisible, setIsCreateNewBudgetModalVisible] =
    useState(false);

  const [isImportModalVisible, setIsImportModalVisible] = useState(false);

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

  const mapToBudgetsComponents = (budgets: BudgetType[]) => {
    return budgets.map(({ icon, name, id, isFavourite }, index, list) => ({
      ComponentToRender: (
        <>
          <IconStyled icon={validate(icon) ? icon : "help"} iconSize={24} />
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
      ref: index === list.length - 1 ? lastBudgetRef : null,
    }));
  };

  interface UniqueObject {
    [key: string]: boolean;
  }
  const createKey = (obj: BudgetType) => {
    return obj.id.value;
  };

  const removeDuplicates = (fetchedBudgets: BudgetType[], fn: Function) => {
    const unique: UniqueObject = {};
    const distinct: BudgetType[] = [];

    fetchedBudgets.forEach((fetchedBudget: BudgetType) => {
      const key = fn(fetchedBudget);

      if (!unique[key]) {
        distinct.push(fetchedBudget);
        unique[key] = true;
      }
    });

    return distinct;
  };

  const flatData = data?.pages?.flatMap(({ items }: ItemType) => items) ?? [];

  const uniqueValues = removeDuplicates(flatData, createKey);

  const successData = mapToBudgetsComponents(uniqueValues);

  const { data: exportData } = useQuery({
    queryKey: ["exportedCsvUri"],
    queryFn: async (): Promise<ExportResponseProps> => {
      return superFetch(`${env.NEXT_PUBLIC_API_URL}budgets/export`).catch(
        (err) => console.error(err)
      );
    },
    enabled: !!session,
  });

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
    exportButton: {
      clickHandler: () => {
        showToast({
          variant: "confirm",
          message: tExport(dictExport.exportToastMessage),
        });
      },
      label: t(SideNav.budgetsItem.exportButtonLabel),
      csvUri: exportData?.uri,
    },
    importButton: {
      clickHandler: () => {
        setIsImportModalVisible(true);
      },
      label: t(SideNav.budgetsItem.importButtonLabel),
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
    {
      ComponentToRender: (
        <span>{t(dict.SideNav.settingsItem.settingsItems.currency)}</span>
      ),
      href: "/settings/currency",
      id: 4,
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
        resetSearch={() => setSearchValue("")}
      />

      {isCreateNewBudgetModalVisible && (
        <CreateNewBudget onClose={closeModal} />
      )}
      {isImportModalVisible && (
        <ImportModal
          importEndpoint="budgets/import"
          allowedFileExtensions={[".csv"]}
          downloadButtonLabel={tExport(dictImport.downloadButtonText)}
          importButtonLabel={tImport(dictImport.importButtonText)}
          noDataSavedToastMsg={tImport(dictImport.noBudgetSaved)}
          onClose={() => setIsImportModalVisible(false)}
          instructionScreen={() =>
            ImportCSVInstructionScreen({
              exampleHeader:
                "Name, IconName, Description, Currency, Value, StartDate, EndDate",
              exampleFirstLine:
                "budgetName,yellowIcon,some budget description,USD,15.00,04/20/2023 19:14:20,04/25/2023 20:14:20",
            })
          }
        />
      )}
    </>
  );
}
