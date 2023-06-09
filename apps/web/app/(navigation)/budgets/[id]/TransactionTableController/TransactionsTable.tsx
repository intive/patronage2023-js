"use client";

import { useContext, useMemo } from "react";
import { ThemeContext } from "styled-components";
import { useAtomValue } from "jotai";
import { languageAtom } from "store";
import { Table } from "ka-table";
import { DataType } from "ka-table/enums";
import { Column } from "ka-table/models";
import { Icon, Avatar, DropdownMenu, CategoryIcon } from "ui";

import { useTranslate } from "lib/hooks";
import useLocaleDateString from "lib/hooks/useLocaleDateString";
import { Transaction } from "lib/types";

import {
  TableWrapperStyled,
  StyledCurrencyAmount,
} from "./TransactionsTable.styled";

import TableSuspense from "components/TableSuspense";
import isAvatarValid from "lib/validations/avatarValidation";

type SortDescriptor = {
  columnName: string;
  sortAscending: boolean;
};

type TransactionsTableProps = {
  currency: {
    tag: string;
    locale: string;
  };
  setSorting: (column: string) => void;
  sortDescriptors: SortDescriptor[];
  transactions: Transaction[] | undefined;
  isLoading: boolean;
};

export const TransactionsTable = ({
  currency,
  setSorting,
  sortDescriptors,
  transactions = [],
  isLoading,
}: TransactionsTableProps) => {
  const theme = useContext(ThemeContext);
  const { t, dict } = useTranslate("BudgetsPage");
  const { transactionsTable } = dict;

  const locale = useAtomValue(languageAtom);

  const getLocaleDateString = useLocaleDateString();

  const columns = useMemo(
    () =>
      [
        {
          key: "category",
          title: t(transactionsTable.tableColumnHeaders.category),
          isSortable: true,
          dataType: DataType.Object,
          style: {
            verticalAlign: "middle",
            lineHeight: 0,
            width: "27%",
          },
        },
        {
          key: "description",
          title: t(transactionsTable.tableColumnHeaders.name),
          isSortable: true,
          dataType: DataType.String,
          style: { width: "29%" },
        },
        {
          key: "amount",
          title: t(transactionsTable.tableColumnHeaders.amount),
          isSortable: true,
          dataType: DataType.Number,
          style: { width: "44%" },
        },
        {
          key: "creator",
          title: t(transactionsTable.tableColumnHeaders.creator),
          isSortable: true,
          dataType: DataType.Object,
          style: {
            textAlign: "center",
            verticalAlign: "middle",
            lineHeight: 0,
            paddingLeft: "5px",
            paddingRight: "5px",
            width: "100px",
          },
        },
        {
          key: "editColumn",
          style: {
            textAlign: "center",
            verticalAlign: "middle",
            lineHeight: 0,
            width: "28px",
          },
        },
        {
          key: "date",
          title: "Date",
          isSortable: false,
          dataType: DataType.Number,
        },
      ] as Column[],
    // disable deps warning, because we know t will change only when locale changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  const columnMap = {
    category: "CategoryType",
    description: "Name",
    amount: "Value",
    date: "BudgetTransactionDate",
    creator: "Email",
  };

  const isSortedByColumn = (column: string | undefined) => {
    return sortDescriptors.find((element) => element.columnName === column);
  };

  const dropdownMenuItems = [
    {
      ComponentToRender: (
        <div>{t(dict.transactionsTable.threeDotsComponentNames.edit)}</div>
      ),
      id: "edit-budget",
    },
    {
      ComponentToRender: (
        <div>{t(dict.transactionsTable.threeDotsComponentNames.clone)}</div>
      ),
      id: "clone-budget",
    },
    {
      ComponentToRender: (
        <div>{t(dict.transactionsTable.threeDotsComponentNames.remove)}</div>
      ),
      id: "remove-budget",
    },
  ];

  return (
    <TableWrapperStyled>
      <Table
        key={locale}
        columns={columns}
        rowKeyField={"id"}
        data={transactions}
        groups={[{ columnKey: "date" }]}
        noData={{
          text: "No Data Found",
        }}
        childComponents={{
          cell: {
            content: (props) => {
              switch (props.column.key) {
                case "category":
                  return <CategoryIcon category={props.value} small={false} />;
                case "amount":
                  return (
                    <StyledCurrencyAmount
                      amount={props.value}
                      currencyOptions={currency}
                    />
                  );
                case "creator":
                  return props.value ? (
                    <Avatar
                      className="avatar"
                      src={
                        isAvatarValid(props.value.avatar)
                          ? props.value.avatar
                          : "/default.svg"
                      }
                    />
                  ) : (
                    <></>
                  );
                case "editColumn":
                  return (
                    <DropdownMenu items={dropdownMenuItems} side="right" />
                  );
              }
            },
          },
          groupCell: {
            content: (props) => {
              switch (props.column.key) {
                case "date":
                  const value = props.groupKey[props.groupIndex];
                  return <>{getLocaleDateString(value)}</>;
              }
            },
          },
          headCellContent: {
            content: ({ column }) => {
              const isSortedByThis = isSortedByColumn(
                columnMap[column.key as keyof typeof columnMap]
              );
              return (
                <>
                  <span>{column.title}</span>
                  {column.key !== "editColumn" && (
                    <button
                      onClick={() =>
                        setSorting(
                          columnMap[column.key as keyof typeof columnMap]
                        )
                      }>
                      <Icon
                        icon="sort"
                        iconSize={20}
                        color={
                          isSortedByThis
                            ? theme.transactionsTable.sortIcon.active
                            : theme.transactionsTable.sortIcon.inactive
                        }
                      />
                      {isSortedByThis && (
                        <Icon
                          icon={
                            isSortedByThis.sortAscending
                              ? "arrow_upward"
                              : "arrow_downward"
                          }
                          iconSize={15}
                        />
                      )}
                    </button>
                  )}
                </>
              );
            },
          },
          tableBody: {
            content: (props) => {
              return isLoading && <TableSuspense rowsNumber={5} {...props} />;
            },
            elementAttributes: () => ({
              className: isLoading ? "loading-tbody" : undefined,
            }),
          },
        }}
      />
    </TableWrapperStyled>
  );
};
