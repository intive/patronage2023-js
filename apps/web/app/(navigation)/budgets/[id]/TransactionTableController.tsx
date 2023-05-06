import { TransactionsTable } from "./TransactionsTable";
import { useEffect, useState } from "react";
import categoryMap from "lib/category-map";
import { env } from "env.mjs";
import { Budget, Transaction } from "lib/types";
import { Spinner } from "ui";

const TransactionTableController = ({
  id,
  budget,
}: {
  id: string;
  budget: Budget;
}) => {
  //useSession
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesPerPage, setPagesPerPage] = useState<number>(5);
  //TODO define type od budgetData
  const [budgetData, setBudgetData] = useState<any>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const setSorting = (column: string) => console.log(column);

  // fetch(env.NEXT_PUBLIC_API_URL + "/budgets/" + id + "/transactions", {
  //   body: JSON.stringify({
  //     pageSize: pagesPerPage,
  //     pageIndex: currentPage,
  //   }),
  //   headers: {
  //     Authorization: "Bearer " + Token,
  //     "Content-Type": "application/json",
  //   },
  //   method: "POST",
  // })
  //   .then((r) => setBudgetData(r))
  //   .catch((error) => console.log(error));

  useEffect(() => {
    fetch(`/budget/${id}.json`)
      .then((response) => response.json())
      .then((result) => setTransactions(result.transactions));
  }, [id]);

  if (isLoading) {
    return <Spinner />;
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
