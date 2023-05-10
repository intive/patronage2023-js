import { TransactionsTable } from "./TransactionsTable";
import { useState } from "react";
import { env } from "env.mjs";
import { Budget, Transaction } from "lib/types";
import { useQuery } from "@tanstack/react-query";
import categoryMap from "lib/category-map";
import { ErrorMessage, Spinner } from "ui";
import { useSession } from "next-auth/react";
import { Pagination } from "components";
import { useTranslate } from "lib/hooks";

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
  categoryType: string;
};

type ID = {
  value: string;
};

const TransactionTableController = ({ budget }: { budget: Budget }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { t, dict } = useTranslate("BudgetsPage");
  const setSorting = (column: string) => console.log(column);
  const { data: session } = useSession();

  const fixFetchedData = (res: APIResponse) => {
    const tempArray = [] as Transaction[];
    res.items.map((item) => {
      tempArray.push({
        id: item.transactionId.value,
        date: Date.parse(item.budgetTransactionDate),
        amount: item.value,
        // @ts-ignore
        category: categoryMap[item.categoryType]
          ? // @ts-ignore
            categoryMap[item.categoryType]
          : categoryMap.HomeSpendings,
        description: item.name,
        status: "Done",
        creator: {
          id: budget.userID,
          name: session!.user.name,
          avatar: `${session!.user.image}.svg`,
        },
      });
    });
    setTotalPages(Math.ceil(res.totalCount / itemsPerPage));
    return tempArray;
  };

  const {
    data: transactionsData,
    isError,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["datatable", itemsPerPage, currentPage, budget, session],
    queryFn: async () => {
      return fetch(
        env.NEXT_PUBLIC_API_URL + "/budgets/" + budget.id + "/transactions",
        {
          body: JSON.stringify({
            pageSize: itemsPerPage,
            pageIndex: currentPage,
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

  if (isLoading) {
    return <Spinner />;
  }

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
      <TransactionsTable
        currency={budget.currency}
        setSorting={setSorting}
        transactions={transactionsData}
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
