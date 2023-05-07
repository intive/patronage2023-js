import { TransactionsTable } from "./TransactionsTable";
import { useEffect, useState } from "react";
import categoryMap from "lib/category-map";
import { env } from "env.mjs";
import { Budget, Transaction } from "lib/types";
import { Spinner } from "ui";
import { useQuery } from "react-query";

type APIResponse = {
  items: Item[];
  totalCount: number;
};

type Item = {
  transactionType: string;
  transactionID: ID;
  budgetID: ID;
  name: string;
  value: number;
  budgetTransactionDate: Date;
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

const TransactionTableController = ({
  id,
  budget,
}: {
  id: string;
  budget: Budget;
}) => {
  //useSession
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  //TODO define type od budgetData
  const [budgetData, setBudgetData] = useState<any>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const setSorting = (column: string) => console.log(column);

  const sampleId = "3e6ca5f0-5ef8-44bc-a8bc-175c826b39b5";
  const Token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM0OTIwODYsImlhdCI6MTY4MzQ4NDg4NiwianRpIjoiYTkwMWQyZmQtNmE2Yy00OTdlLWI5Y2MtODZmMjU0NDVlZDIzIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODIwNjNmMmUtOWQ5YS00YjM4LWEyMmUtNTU3MmNlZTlkZGY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjI1ZTJhOGYzLWUzYzQtNGJjNi04YjgzLTQxZmE5ZmEyNjkyYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjI1ZTJhOGYzLWUzYzQtNGJjNi04YjgzLTQxZmE5ZmEyNjkyYiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoic211dG5hIHphYmEiLCJhdmF0YXIiOiIxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic211dG5hcnphYmFAcG5nLnBsIiwiZ2l2ZW5fbmFtZSI6InNtdXRuYSIsImZhbWlseV9uYW1lIjoiemFiYSIsImVtYWlsIjoic211dG5hcnphYmFAcG5nLnBsIn0.esBl4Wy2WvWzKDOnvSCFD2snk53HE_o7DdhoSou59see0O9uF58WNglXxMgignNdf9PKyesZZLpwgSBM4MzWyAA7yeZwlbZK9Q33_XSoOCHcnnGM-6wLKHl1o2EgW0IR0PxMi56poFUFh5TOUSiv0IN21KT3BAIbv6NjBgN-g8TpDjwZuxrL7AC2YQpczX7Ju0agA9eOhTcwA5Iebn-ZUanNz-Mh1rXKv_nkIJakDFmzfzclQ34a8lVzXLH5xFVWbsISiINx9fBzhjL1eF33TR1LFKzAOIoto2KBqAMh6rkFMijoo3OPWEJCDtXp6SVgxHFjPvC9t8kl2i5PtDessg";

  const fetchFunction = async (
    id: string,
    token: string,
    itemsOnPage: number,
    pageNumber: number
  ) => {
    try {
      const fetchedData = await fetch(
        env.NEXT_PUBLIC_API_URL + "/budgets/" + id + "/transactions",
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
      console.log(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  const dataQuery = useQuery({
    queryKey: ["Datatable"],
    queryFn: () => fetchFunction(sampleId, Token, itemsPerPage, currentPage),
  });

  useEffect(() => {
    fetch(`/budget/${id}.json`)
      .then((response) => response.json())
      .then((result) => setTransactions(result.transactions));
  }, [id]);

  // if (dataQuery.isLoading) {
  //   return <Spinner />;
  // }
  //
  // if (dataQuery.error) {
  //   return <h1>Error occurred</h1>;
  // }

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
