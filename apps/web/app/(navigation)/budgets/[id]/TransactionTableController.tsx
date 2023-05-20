import { TransactionsTable } from "./TransactionsTable";
import { useEffect, useState } from "react";
import { env } from "env.mjs";
import { BudgetFixed, Transaction } from "lib/types";
import { useQuery } from "@tanstack/react-query";
import categoryMap from "lib/category-map";
import { ErrorMessage } from "ui";
import { useSession } from "next-auth/react";
import { Pagination } from "components";
import { useTranslate } from "lib/hooks";
import useSuperfetch from "lib/hooks/useSuperfetch";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [transactionType, setTransactionType] = useState<
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

  const fetch = useSuperfetch();

  const {
    data: transactionsData,
    isError,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["datatable", itemsPerPage, currentPage, budget, transactionType],

    queryFn: async () => {
      return fetch(
        `${env.NEXT_PUBLIC_API_URL}budgets/${budget.id}/transactions`,
        {
          method: "POST",
          body: {
            pageSize: itemsPerPage,
            pageIndex: currentPage,
            search: "",
            transactionType: transactionType,
          },
        }
      )
        .then((res) => fixFetchedData(res))
        .catch((err) => console.error(err));
    },
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
        transactions={transactionsData as Transaction[]}
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
