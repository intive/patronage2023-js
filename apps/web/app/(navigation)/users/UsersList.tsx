"use client";

import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useTranslate } from "lib/hooks";
import { Table } from "ka-table";
import { DataType } from "ka-table/enums";
import { Column } from "ka-table/models";

import { Icon, Avatar } from "ui";
import { z } from 'zod';

import {
  UsersListStyled,
  EmailStyled
} from "./UsersList.styled";
import { TransactionsTableSuspense } from "./../budgets/[id]/TransactionsTableSuspense";

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
};

export const UsersListTable = ({
  setSorting,
  users = [],
  isLoading,
}: UsersListProps) => {
  const theme = useContext(ThemeContext);
  const { t, dict } = useTranslate("UsersPage");
  const { usersTable } = dict;

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
      style: { width: "33%" },
    },
    {
      key: "firstName",
      title: t(usersTable.firstName),
      isSortable: true,
      dataType: DataType.String,
      style: { width: "33%" },
    },
    {
      key: "email",
      title: t(usersTable.email),
      isSortable: true,
      dataType: DataType.String,
      style: { width: "33%" },
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
        columns={columns}
        rowKeyField={"id"}
        data={users}
        noData={{
          text: "No Data Found",
        }}
        childComponents={{
          cell: {
            content: (props) => {
              switch (props.column.key) {
                case "avatar":
                  //set default avatar if missing data
                  if (!props.rowData.avatar) return <Avatar src="/unsetAvatar.svg" />

                  const text = props.rowData.avatar;
                  //check if avatar string is one from public folder
                  const schemaPath = z.string().startsWith("/avatars/").endsWith(".svg");
                  //check if avatar url is valid url
                  const schemaUrl = z.string().url();
                  const isPath = schemaPath.safeParse(text);
                  const isUrl = schemaUrl.safeParse(text);
                  return <Avatar src={isPath.success || isUrl.success ? props.rowData.avatar : "/unsetAvatar.svg"} />;
                case "email":
                  return <EmailStyled>{props.rowData.email}</EmailStyled>;
                case "createdTimestamp":
                  const date = new Date(props.rowData.createdTimestamp);
                  const dateString = `${date.getFullYear()}-${((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1)}-${(date.getDate() < 10 ? '0' : '') + date.getDate()}`;
                  return dateString
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
                      color={theme.transactionsTable.sortIcon}
                    />
                  </button>
                )}
              </>
            ),
          },
          tableBody: {
            content: (props) => {
              return (
                isLoading && (
                  <TransactionsTableSuspense rowsNumber={5} {...props} />
                )
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
