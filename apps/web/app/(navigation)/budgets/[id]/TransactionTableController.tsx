import { TransactionsTable } from "./TransactionsTable";
import { useState } from "react";
import { env } from "env.mjs";
import { Budget, Transaction } from "lib/types";
import { useQuery } from "@tanstack/react-query";
import categoryMap from "lib/category-map";
import { Spinner } from "ui";
import { useSession } from "next-auth/react";

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
    return tempArray;
  };

  const {
    data: transactionsData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["datatable"],
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
        .then((res) => res.json())
        .then((parsed) => fixFetchedData(parsed));
    },
    enabled: !!session && !!budget,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Error occurred</h1>;
  }

  return (
    <>
      <TransactionsTable
        currency={budget.currency}
        setSorting={setSorting}
        transactions={transactionsData}
      />
    </>
  );
};

export default TransactionTableController;
