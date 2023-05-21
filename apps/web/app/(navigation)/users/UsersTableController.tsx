import { UsersListTable } from "./UsersList";
import { useState } from "react";
import { env } from "env.mjs";
import { useQuery } from "@tanstack/react-query";
import { ErrorMessage } from "ui";
import { useSession } from "next-auth/react";
import { Pagination } from "components";
import { useTranslate } from "lib/hooks";
// import { FilterSearchWrapper } from "./TransactionsFilterSearchStyled";
// import { TransactionTypeFilter } from "./TransactionTypeFilter";

type APIResponse = {
  items: UserListItem[];
  totalCount: number;
};

type UserListItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdTimestamp: number;
  createdVia: string;
  avatar: string;
};

const UsersTableController = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [ascending, setAscending] = useState({
    actualColumn: "lastName",
    fields: {
      "lastName": true,
      "firstName": false,
      "email": false,
      "createdTimestamp": false,
    }
  });

  const { t, dict } = useTranslate("BudgetsPage");
  const { data: session } = useSession();

  const dataForTable = (res: APIResponse) => {
    setTotalPages(Math.ceil(res.totalCount / itemsPerPage));
    return res.items;
  }

  const setSorting = (column: string) => {
    setAscending(prev => {
      return {
        actualColumn: column,
        fields: {
          ...prev.fields,
          [column]: !prev.fields[column as keyof typeof prev.fields]
        }
      }
    })
  };

  const {
    data: users,
    isError,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["user", itemsPerPage, currentPage, ascending],
    queryFn: async () => {
      return fetch(env.NEXT_PUBLIC_API_URL + "/user/list", {
        body: JSON.stringify({
          pageSize: itemsPerPage,
          pageIndex: currentPage,
          search: "",
          sortDescriptors: [
            {
              columnName: ascending.actualColumn,
              sortAscending: ascending.fields[ascending.actualColumn as keyof typeof ascending.fields],
            },
          ],
        }),
        headers: {
          Authorization: "Bearer " + session!.user.accessToken,
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`${res.status}`);
        })
        .then((json) => dataForTable(json));
    },
    enabled: !!session,
  });

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
      {/* <FilterSearchWrapper>
        <TransactionTypeFilter onSelect={(type) => setTransactionType(type)} />
      </FilterSearchWrapper> */}
      <UsersListTable
        setSorting={setSorting}
        users={users}
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

export default UsersTableController;
