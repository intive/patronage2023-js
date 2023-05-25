import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useTranslate } from "lib/hooks";
import useSuperfetch from "lib/hooks/useSuperfetch";
import { useDebounce } from "lib/hooks/useDebounce";
import { ErrorMessage } from "ui";
import { Pagination } from "components";
import { UsersListTable } from "./UsersList";
import { InputWrapper } from "./UsersList.styled";
import { SearchInput } from "ui/Input/SearchInput";

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
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortParams, setSortParams] = useState({
    actualColumn: "lastName",
    ascending: {
      lastName: true,
      firstName: false,
      email: false,
      createdTimestamp: false,
    },
  });

  const { t, dict } = useTranslate("BudgetsPage");
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => setCurrentPage(1), [searchValue, itemsPerPage, sortParams]);

  const dataForTable = (res: APIResponse) => {
    setTotalPages(Math.ceil(res.totalCount / itemsPerPage));
    return res.items;
  };

  const setSorting = (column: string) => {
    setSortParams((prev) => {
      return {
        actualColumn: column,
        ascending: {
          ...prev.ascending,
          [column]: !prev.ascending[column as keyof typeof prev.ascending],
        },
      };
    });
  };

  const fetch = useSuperfetch();

  const {
    data: users,
    isError,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["user", itemsPerPage, currentPage, sortParams, debouncedSearch],
    queryFn: async () => {
      return fetch(`${env.NEXT_PUBLIC_API_URL}user/list`, {
        method: "POST",
        body: {
          pageSize: itemsPerPage,
          pageIndex: currentPage,
          search: searchValue,
          sortDescriptors: [
            {
              columnName: sortParams.actualColumn,
              sortAscending:
                sortParams.ascending[
                  sortParams.actualColumn as keyof typeof sortParams.ascending
                ],
            },
          ],
        },
      })
        .then((json) => dataForTable(json))
        .catch((err) => console.error(err));
    },
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
      <InputWrapper>
        <SearchInput
          placeholder=""
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      </InputWrapper>
      <UsersListTable
        setSorting={setSorting}
        users={users}
        isLoading={isLoading}
        sortingData={sortParams}
      />
      <Pagination
        pageIndex={currentPage - 1}
        numberOfPages={totalPages}
        pageSizeOptions={[5, 10, 25]}
        currentPageSize={itemsPerPage}
        onChangePageSize={(val) => {
          setItemsPerPage(val);
        }}
        onChangePageIndex={(val) => setCurrentPage(val + 1)}
      />
    </>
  );
};

export default UsersTableController;
