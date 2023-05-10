import { TransactionsTable } from "./TransactionsTable";
import { useState } from "react";
import { env } from "env.mjs";
import { Budget, Transaction } from "lib/types";
import { useQuery } from "react-query";
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
  //useSession
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
    setTransactions(tempArray);
  };
  const fetchFunction = async (
    ids: string,
    token: string,
    itemsOnPage: number,
    pageNumber: number
  ) => {
    try {
      const fetchedData = await fetch(
        env.NEXT_PUBLIC_API_URL + "/budgets/" + ids + "/transactions",
        {
          body: JSON.stringify({
            pageSize: itemsOnPage,
            pageIndex: pageNumber,
          }),
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      const parsedData = await fetchedData.json();
      fixFetchedData(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  const dataQuery = useQuery({
    queryKey: ["datatable", budget, itemsPerPage, currentPage, session],
    queryFn: () =>
      fetchFunction(
        budget.id,
        session!.user.accessToken,
        itemsPerPage,
        currentPage
      ),
    enabled: !!session,
  });

  if (dataQuery.isLoading) {
    return <Spinner />;
  }

  if (dataQuery.error) {
    return <h1>Error occurred</h1>;
  }

  return (
    <>
      <TransactionsTable
        currency={budget.currency}
        setSorting={setSorting}
        transactions={transactions}
      />
    </>
  );
};

export default TransactionTableController;
