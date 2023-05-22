import { TransactionsTable } from "./TransactionsTable";
import { useEffect, useState } from "react";
import { env } from "env.mjs";
import { BudgetFixed, Transaction } from "lib/types";
import { useQuery } from "@tanstack/react-query";
import categoryMap from "lib/category-map";
import { ErrorMessage } from "ui";
import { useSession } from "next-auth/react";
import { Pagination } from "components";
import { useLocalStorage, useTranslate } from "lib/hooks";
import { useAtomValue } from "jotai";
import { categoryFilterAtom } from "store";
import { FilterSearchWrapper } from "./TransactionsFilterSearchStyled";
import { TransactionTypeFilter } from "./TransactionTypeFilter";

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
  const [getPageSizeValue, setPageSizeValue] = useLocalStorage("pageSize", "5");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [transactionType, setTransactionType] = useState<
    "Income" | "Expense" | null
  >(null);
  const { t, dict } = useTranslate("BudgetsPage");
  const setSorting = (column: string) => console.log(column);
  const { data: session } = useSession();
  const categoryFilterState = useAtomValue(categoryFilterAtom);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilterState]);

  const fixFetchedData = (res: APIResponse) => {
    setTotalPages(Math.ceil(res.totalCount / parseFloat(getPageSizeValue)));
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
      parseFloat(getPageSizeValue),
      currentPage,
      budget,
      session,
      categoryFilterState,
      transactionType,
    ],
    queryFn: async () => {
      return fetch(
        env.NEXT_PUBLIC_API_URL + "/budgets/" + budget.id + "/transactions",
        {
          body: JSON.stringify({
            pageSize: parseFloat(getPageSizeValue),
            pageIndex: currentPage,
            categoryTypes: categoryFilterState,
            search: "",
            transactionType: transactionType,
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

  useEffect(() => setCurrentPage(1), [transactionType]);

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
        <TransactionTypeFilter onSelect={(type) => setTransactionType(type)} />
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
        currentPageSize={parseFloat(getPageSizeValue)}
        onChangePageSize={(val) => {
          setPageSizeValue(val);
          setCurrentPage(1);
        }}
        onChangePageIndex={(val) => setCurrentPage(val + 1)}
      />
    </>
  );
};

export default TransactionTableController;
