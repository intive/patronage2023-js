import { TransactionsTable } from "./TransactionsTable";
import { useEffect, useState } from "react";
import { env } from "env.mjs";
import { Budget, Transaction } from "lib/types";
import { useQuery } from "react-query";
import categoryMap from "lib/category-map";

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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM1MDA2OTYsImlhdCI6MTY4MzQ5MzQ5NiwianRpIjoiYjdhMGJlZDItY2Q1My00NmE4LWE4MmEtNGEwMDEyZTZjYzVkIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODIwNjNmMmUtOWQ5YS00YjM4LWEyMmUtNTU3MmNlZTlkZGY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjgwNTkxYjJiLTFiMjEtNGZhNi05ZTFlLWVmZWI4NWEzOTBkYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjgwNTkxYjJiLTFiMjEtNGZhNi05ZTFlLWVmZWI4NWEzOTBkYiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoic211dG5hIHphYmEiLCJhdmF0YXIiOiIxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic211dG5hcnphYmFAcG5nLnBsIiwiZ2l2ZW5fbmFtZSI6InNtdXRuYSIsImZhbWlseV9uYW1lIjoiemFiYSIsImVtYWlsIjoic211dG5hcnphYmFAcG5nLnBsIn0.mxTGwhVxGSo-hwX3X7-j66xmrhSW7-QOI0MEE_mDz_T4DGr5jTeNTGOSF1pQPCmVPnZgoNSHQ2k4WDNCCUG4WhJ76OIwvt2_WMJeohD5jYZsbwSQrXtyD_Jmvr8yClGlLLrOPVnHZRU3x9t6haH3b-OhiwPEGITgV0f0AXU7wKpQMuLPDF3xzGKSIOMBa6TOHPlieXN7lB7w4aZayq5UCEzxff1zVNM8t7SzU46ge_xnJn2_wNiB9wnYC_Md2_NCUBfB4cCOOxLfRD9CsvLPzisjRWESiQi8dNrxIbYs5xIygaTNN0vVVD2pEs5bYS7R3k_azRo-DSkpAn0H5-hWPw";

  const fixFetchedData = (res: APIResponse) => {
    const tempArray = [] as any;
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
    console.log(tempArray);
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
