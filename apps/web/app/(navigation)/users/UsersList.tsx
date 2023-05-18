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

};

type UsersListProps = {
  setSorting: (column: string) => void;
  users: User[] | undefined;
  isLoading: boolean;
};

export const UsersList = ({
  setSorting,
  users = [],
  isLoading,
}: UsersListProps) => {
  const theme = useContext(ThemeContext);
  // const { t, dict } = useTranslate("BudgetsPage");
  // const { transactionsTable } = dict;

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
      key: "firstName",
      title: "First name",
      isSortable: true,
      dataType: DataType.String,
      style: { width: "33%" },
    },
    {
      key: "lastName",
      title: "Last name",
      isSortable: true,
      dataType: DataType.String,
      style: { width: "33%" },
    },
    {
      key: "email",
      title: "Email",
      isSortable: true,
      dataType: DataType.String,
      style: { width: "33%" },
    },
    {
      key: "createdTimestamp",
      title: "Date created",
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
                  if (!props.rowData.attributes) return <Avatar src="/unsetAvatar.svg" />
                  const text = props.rowData.attributes.avatar[0];
                  const schemaPath = z.string().startsWith("/avatars/").endsWith(".svg");
                  const schemaUrl = z.string().url();
                  const isPath = schemaPath.safeParse(text);
                  const isUrl = schemaUrl.safeParse(text);
                  return <Avatar src={isPath.success || isUrl.success ? props.rowData.attributes.avatar[0] : "/unsetAvatar.svg"} />;
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
