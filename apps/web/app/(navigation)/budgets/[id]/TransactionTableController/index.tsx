import { useEffect, useState } from "react";
import { env } from "env.mjs";
import { BudgetFixed, Transaction } from "lib/types";
import { useQuery } from "@tanstack/react-query";
import categoryMap from "lib/category-map";
import useSuperfetch from "lib/hooks/useSuperfetch";
import { useDebounce } from "lib/hooks/useDebounce";
import { ErrorMessage } from "ui";
import { SearchInput } from "ui/Input/SearchInput";
import { useSession } from "next-auth/react";
import { Pagination } from "components/Pagination";
import { useLocalStorage, useTranslate } from "lib/hooks";
import { useAtomValue } from "jotai";
import { categoryFilterAtom } from "store";
import { FilterSearchWrapper } from "./TransactionsFilterSearchStyled";
import { TransactionTypeFilter } from "./TransactionTypeFilter";
import { TransactionsTable } from "./TransactionsTable";
import { MobileCategorySearch } from "components/CategoryFilter";

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
  categoryType:
    | "HomeSpendings"
    | "Subscriptions"
    | "Car"
    | "Grocery"
    | "Salary"
    | "Refund";
  user: {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    userEmail: string;
  };
};

type ID = {
  value: string;
};

const TransactionTableController = ({ budget }: { budget: BudgetFixed }) => {
  const [getPageSizeValue, setPageSizeValue] = useLocalStorage(
    "transactionsTablePageSize",
    "5"
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [transactionType, setTransactionType] = useState<
    "Income" | "Expense" | null
  >(null);
  const [searchTransactionByName, setSearchTransactionByName] = useState("");
  const [sortDescriptors, setSortDescriptors] = useState([
    { columnName: "BudgetTransactionDate", sortAscending: false },
  ]);
  const debouncedSearch = useDebounce(searchTransactionByName, 500);
  const { t, dict } = useTranslate("BudgetsPage");
  const { data: session } = useSession();
  const categoryFilterState = useAtomValue(categoryFilterAtom);
  const pageSize = parseInt(getPageSizeValue);

  const setSorting = (column: string) => {
    setSortDescriptors((previousSortDescriptors) => {
      return [
        ...previousSortDescriptors.filter(
          (element) => element.columnName !== column
        ),
        {
          columnName: column,
          sortAscending: !previousSortDescriptors.find(
            (element) => element.columnName === column
          )?.sortAscending,
        },
      ];
    });
  };

  const fixFetchedData = (res: APIResponse) => {
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
        creator: item.user,
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
    queryKey: [
      "datatable",
      pageSize,
      currentPage,
      budget,
      transactionType,
      categoryFilterState,
      transactionType,
      debouncedSearch,
      sortDescriptors,
    ],

    queryFn: async () => {
      return fetch(
        `${env.NEXT_PUBLIC_API_URL}budgets/${budget.id}/transactions`,
        {
          method: "POST",
          body: {
            pageSize: pageSize,
            pageIndex: currentPage,
            categoryTypes: categoryFilterState,
            transactionType: transactionType,
            search: debouncedSearch,
            sortDescriptors,
          },
        }
      )
        .then((res) => {
          setTotalPages(Math.ceil(res.totalCount / pageSize));
          return fixFetchedData(res);
        })
        .catch((err) => console.error(err));
    },
  });

  useEffect(
    () => setCurrentPage(1),
    [transactionType, categoryFilterState, debouncedSearch]
  );

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
        <SearchInput
          placeholder={`${t(dict.searchInputTransactionPlaceholder)}`}
          onChange={(e) => {
            setSearchTransactionByName(e.currentTarget.value);
          }}
        />
        <MobileCategorySearch />
      </FilterSearchWrapper>
      <TransactionsTable
        currency={budget.currency}
        setSorting={setSorting}
        sortDescriptors={sortDescriptors}
        transactions={transactionsData as Transaction[]}
        isLoading={isLoading}
      />
      <Pagination
        pageIndex={currentPage - 1}
        numberOfPages={totalPages}
        pageSizeOptions={[5, 10, 25]}
        currentPageSize={pageSize}
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
