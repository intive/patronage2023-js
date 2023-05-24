"use client";

import { useContext } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { languageAtom } from "store";
import { ThemeContext } from "styled-components";
import { useTranslate } from "lib/hooks";
import { Table } from "ka-table";
import { DataType } from "ka-table/enums";
import { Column } from "ka-table/models";
import { Icon, Avatar } from "ui";
import { UsersListStyled, EmailStyled } from "./UsersList.styled";
import { TransactionsTableSuspense as UserTableSuspense } from "./../budgets/[id]/TransactionsTableSuspense";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdTimestamp: number;
  createdVia: string;
  avatar: string;
};

type UsersListProps = {
  setSorting: (column: string) => void;
  users: User[] | undefined;
  isLoading: boolean;
  sortingData: SortingData;
};

type SortingData = {
  actualColumn: string,
    ascending: {
      lastName: boolean,
      firstName: boolean,
      email: Boolean,
      createdTimestamp: boolean,
    }
};

export const UsersListTable = ({
  setSorting,
  users = [],
  isLoading,
  sortingData,
}: UsersListProps) => {
  const theme = useContext(ThemeContext);
  const { t, dict } = useTranslate("UsersPage");
  const { usersTable } = dict;
  const [language] = useAtom(languageAtom);

  const columns = [
    {
      key: "avatar",
      isSortable: false,
      dataType: DataType.Object,
      style: {
        fontSize: "2.5em",
        width: "15%",
      },
    },
    {
      key: "lastName",
      title: t(usersTable.lastName),
      isSortable: true,
      dataType: DataType.String,
      style: { width: "30%" },
    },
    {
      key: "firstName",
      title: t(usersTable.firstName),
      isSortable: true,
      dataType: DataType.String,
      style: { width: "30%" },
    },
    {
      key: "email",
      title: t(usersTable.email),
      isSortable: true,
      dataType: DataType.String,
      style: { width: "40%" },
    },
    {
      key: "createdTimestamp",
      title: t(usersTable.dateCreated),
      isSortable: true,
      dataType: DataType.Number,
      style: { width: "20%" },
    },
  ] as Column[];

  return (
    <UsersListStyled>
      <Table
        key={language}
        columns={columns}
        rowKeyField={"id"}
        data={users}
        noData={{
          text: "No Data Found",
        }}
        childComponents={{
          cell: {
            content: ({ column, rowData }) => {
              switch (column.key) {
                case "avatar":
                  //set default avatar if missing data
                  if (!rowData.avatar) return <Avatar src="/unsetAvatar.svg" />;

                  const text = rowData.avatar;
                  //check if avatar string is a path coming from our avatars folder
                  const schemaPath = z.string().startsWith("/avatars/");
                  //check if avatar string is valid url
                  const schemaUrl = z.string().url();
                  const isPath = schemaPath.safeParse(text);
                  const isUrl = schemaUrl.safeParse(text);
                  return (
                    <Avatar
                      src={
                        isPath.success || isUrl.success
                          ? rowData.avatar
                          : "/unsetAvatar.svg"
                      }
                    />
                  );
                case "email":
                  return <EmailStyled>{rowData.email}</EmailStyled>;
                case "createdTimestamp":
                  return format(
                    new Date(rowData.createdTimestamp),
                    "yyyy-MM-dd"
                  );
              }
            },
          },
          headCellContent: {
            content: ({ column }) => (
              <>
                <span>{column.title}</span>
                {column.key !== "avatar" && (
                  <button onClick={() => setSorting(column.key)}>
                    <Icon
                        icon="sort"
                        iconSize={20}
                        color={sortingData.actualColumn === column.key ? theme.transactionsTable.sortIcon : theme.transactionsTable.sortIconInactive}
                      />
                    {(sortingData.actualColumn === column.key)
                    ?
                    <Icon
                        icon={sortingData.ascending[column.key as keyof typeof sortingData.ascending] ? "arrow_downward" : "arrow_upward"}
                        iconSize={15}
                        color={sortingData.actualColumn === column.key ? theme.transactionsTable.sortIcon : theme.transactionsTable.sortIconInactive}
                    />
                    :
                    null
                  }  
                  </button>
                  
                )}
              </>
            ),
          },
          tableBody: {
            content: (props) => {
              return (
                isLoading && <UserTableSuspense rowsNumber={5} {...props} />
              );
            },
            elementAttributes: () => ({
              className: isLoading ? "loading-tbody" : undefined,
            }),
          },
        }}
      />
    </UsersListStyled>
  );
};
