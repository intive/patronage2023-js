import { TransactionsTable } from "./TransactionsTable";
import { useEffect, useState } from "react";
import { env } from "env.mjs";
import { BudgetFixed, Transaction } from "lib/types";
import { useQuery } from "@tanstack/react-query";
import categoryMap from "lib/category-map";
import { ButtonGroup, ErrorMessage } from "ui";
import { useSession } from "next-auth/react";
import { Pagination } from "components";
import { useTranslate } from "lib/hooks";
import {
  ButtonGroupWrapper,
  FilterSearchWrapper,
} from "./TransactionsFilterSearchStyled";
import { SearchInput } from "ui/Input/SearchInput";

type APIResponse = {
  items: Item[];
  totalCount: number;
};

type Item = {
  transactionType: string;
  transactionId: ID;
  budgetId: ID;
  name: string;
  value: number;
  budgetTransactionDate: string;
  categoryType: "HomeSpendings" | "Subscriptions" | "Car" | "Grocery";
};

type ID = {
  value: string;
};

const TransactionTableController = ({ budget }: { budget: BudgetFixed }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [transactionTypeFilterState, setTransactionTypeFilterState] = useState<
    "Income" | "Expense" | null
  >(null);
  const { t, dict } = useTranslate("BudgetsPage");
  const setSorting = (column: string) => console.log(column);
  const { data: session } = useSession();

  const fixFetchedData = (res: APIResponse) => {
    setTotalPages(Math.ceil(res.totalCount / itemsPerPage));
    return res.items.map(
      (item): Transaction => ({
        id: item.transactionId.value,
        date: Date.parse(item.budgetTransactionDate),
        amount: item.value,
        category: categoryMap[item.categoryType]
          ? categoryMap[item.categoryType]
          : categoryMap.HomeSpendings,
        description: item.name,
        status: "Done",
        creator: {
          id: budget.userID,
          name: session!.user.name,
          avatar: `${session!.user.image}.svg`,
        },
      })
    );
  };

  const {
    data: transactionsData,
    isError,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: [
      "datatable",
      itemsPerPage,
      currentPage,
      budget,
      session,
      transactionTypeFilterState,
    ],
    queryFn: async () => {
      return fetch(
        env.NEXT_PUBLIC_API_URL + "/budgets/" + budget.id + "/transactions",
        {
          body: JSON.stringify({
            pageSize: itemsPerPage,
            pageIndex: currentPage,
            transactionType: transactionTypeFilterState,
          }),
          headers: {
            Authorization: "Bearer " + session!.user.accessToken,
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`${res.status}`);
        })
        .then((json) => fixFetchedData(json));
    },
    enabled: !!session && !!budget,
  });

  const buttonGroupOptions = [
    {
      component: t(dict.buttonGroupLabels.all),
      onSelect: () => {
        setTransactionTypeFilterState(null);
      },
      id: "all",
    },
    {
      component: t(dict.buttonGroupLabels.income),
      onSelect: () => {
        setTransactionTypeFilterState("Income");
      },
      id: "income",
    },
    {
      component: t(dict.buttonGroupLabels.expenses),
      onSelect: () => {
        setTransactionTypeFilterState("Expense");
      },
      id: "expenses",
    },
  ];

  useEffect(() => setCurrentPage(1), [transactionTypeFilterState]);

  if (isError) {
    return (
      <ErrorMessage
        onClose={refetch}
        message={`${t(dict.tableError)} ${error}`}
      />
    );
  }

  return (
    <>
      <FilterSearchWrapper>
        <ButtonGroupWrapper>
          <ButtonGroup options={buttonGroupOptions} secondary />
        </ButtonGroupWrapper>
        <SearchInput placeholder="Search by name" />
      </FilterSearchWrapper>
      <TransactionsTable
        currency={budget.currency}
        setSorting={setSorting}
        transactions={transactionsData}
        isLoading={isLoading}
      />
      <Pagination
        pageIndex={currentPage - 1}
        numberOfPages={totalPages}
        pageSizeOptions={[5, 10, 25]}
        currentPageSize={itemsPerPage}
        onChangePageSize={(val) => {
          setItemsPerPage(val);
          setCurrentPage(1);
        }}
        onChangePageIndex={(val) => setCurrentPage(val + 1)}
      />
    </>
  );
};

export default TransactionTableController;
