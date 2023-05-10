import { TransactionsTable } from "./TransactionsTable";
import { useEffect, useState } from "react";
import { env } from "env.mjs";
import { Budget, Transaction } from "lib/types";
import { useQuery } from "react-query";
import categoryMap from "lib/category-map";
import { Spinner } from "ui";

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

// {
//   "items": [
//   {
//     "transactionType": "Income",
//     "transactionId": {
//       "value": "3e6ca5f0-5ef8-44bc-a8bc-175c826b39b5"
//     },
//     "budgetId": {
//       "value": "3e6ca5f0-5ef8-44bc-a8bc-175c826b39b5"
//     },
//     "name": "Wypłata",
//     "value": 5000,
//     "budgetTransactionDate": "2023-05-01T07:33:18.485",
//     "categoryType": "HomeSpendings"
//   },
//   {
//     "transactionType": "Income",
//     "transactionId": {
//       "value": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//     },
//     "budgetId": {
//       "value": "3e6ca5f0-5ef8-44bc-a8bc-175c826b39b5"
//     },
//     "name": "string",
//     "value": 1,
//     "budgetTransactionDate": "2023-06-20T14:15:47.392",
//     "categoryType": "HomeSpendings"
//   }
// ],
//   "totalCount": 2
// }

const TransactionTableController = ({ budget }: { budget: Budget }) => {
  //useSession
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  //TODO define type od budgetData
  const [budgetData, setBudgetData] = useState<any>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const setSorting = (column: string) => console.log(column);

  const sampleId = "3e6ca5f0-5ef8-44bc-a8bc-175c826b39b5";
  const Token = "...";

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
          id: "Anyid",
          name: "Pepe",
          avatar: "1.svg",
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
    queryKey: ["DataTable"],
    queryFn: () => fetchFunction(sampleId, Token, itemsPerPage, currentPage),
  });

  // useEffect(() => {
  //   fetch(`/budget/${id}.json`)
  //     .then((response) => response.json())
  //     .then((result) => setTransactions(result.transactions));
  // }, [id]);

  if (dataQuery.isLoading) {
    return <Spinner />;
  }

  if (dataQuery.error) {
    return <h1>Error occurred</h1>;
  }

  return (
    <>
      <TransactionsTable
        budget={budget}
        setSorting={setSorting}
        transactions={transactions}
      />
    </>
  );
};

export default TransactionTableController;
