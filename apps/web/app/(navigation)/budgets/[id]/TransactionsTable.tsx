"use client";

import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useTranslate } from "lib/hooks";

import { Budget, Transaction } from "../../../../lib/types";
import { Table } from "ka-table";
import { DataType } from "ka-table/enums";
import { Icon } from "ui/Icon";
import { CategoryIcon } from "ui/CategoryIcon";
import { Avatar } from "ui/Avatar";
import { Chip } from "ui/Chip";
import { TransactionDropdownMenu } from "ui/TransactionDropdownMenu";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import localizedFormat from "dayjs/plugin/localizedFormat";
// import "dayjs/locale/pl";
// import "dayjs/locale/en-GB";
// import "dayjs/locale/en";

import { useEffect, useState } from "react";
import {
  TableWrapperStyled,
  StyledCurrencyAmount,
} from "./TransactionsTable.styled";

const columns = [
  {
    key: "category",
    title: "Category",
    isSortable: true,
    dataType: DataType.Object,
    width: 120,
  },
  {
    key: "description",
    title: "Name",
    isSortable: true,
    dataType: DataType.String,
    width: 170,
  },
  {
    key: "status",
    title: "Status",
    isSortable: true,
    dataType: DataType.String,
  },
  {
    key: "amount",
    title: "Amount",
    isSortable: true,
    dataType: DataType.Number,
    width: 140,
  },
  {
    key: "creator",
    title: "Creator",
    isSortable: true,
    dataType: DataType.Object,
    width: 70,
  },
  {
    key: "editColumn",
    width: 30,
  },
  {
    key: "date",
    title: "Date",
    isSortable: false,
    dataType: DataType.Number,
  },
];

type Props = {
  budget: Budget;
  setSorting: (column: string) => void;
};

export const TransactionsTable = ({ budget, setSorting }: Props) => {
  const theme = useContext(ThemeContext);
  const { t, dict } = useTranslate("BudgetsPage");
  const { tableDates } = dict;

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch(`/budget/${budget.id}.json`)
      .then((response) => response.json())
      .then((result) => setTransactions(result.transactions));
  }, [budget]);

  const getDayName = (timestamp: number, locale: string) => {
    dayjs.extend(isToday);
   // dayjs.extend(localizedFormat);
    dayjs.extend(isYesterday);

    const date = dayjs(timestamp);
    const formattedDate = date.format("DD.MM.YYYY");

    let dayOfWeek = date.format("dddd");
    if (date.isToday()) {
      dayOfWeek = t(tableDates.today);
    } else if (date.isYesterday()) {
      dayOfWeek = t(tableDates.yesterday);
    }
    return `${dayOfWeek}, ${formattedDate}`;
  };

  const dropdownMenuItems = [
    {
      ComponentToRender: "Edit",
      id: "edit-budget",
    },
    {
      ComponentToRender: "Clone",
      id: "clone-budget",
    },
    {
      ComponentToRender: "Remove",
      id: "remove-budget",
    },
  ];

  return (
    <TableWrapperStyled>
      <Table
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
                case "status":
                  return <Chip type={props.value}>{props.value}</Chip>;
                case "amount":
                  return (
                    <StyledCurrencyAmount
                      amount={props.value}
                      currencyOptions={budget.currency}
                    />
                  );
                case "creator":
                  return (
                    <Avatar
                      className="avatar"
                      src={`/avatars/${props.value.avatar}`}
                    />
                  );
                case "editColumn":
                  return (
                    <TransactionDropdownMenu
                      items={dropdownMenuItems}
                      side="right"
                    />
                  );
              }
            },
          },
          groupCell: {
            content: (props) => {
              switch (props.column.key) {
                case "date":
                  const value = props.groupKey[props.groupIndex];
                  return <>{getDayName(value, budget.currency.locale)}</>;
              }
            },
          },
          headCellContent: {
            content: ({ column }) => {
              return (
                <>
                  <span>{column.title}</span>
                  {column.key !== "editColumn" && (
                    <button onClick={() => setSorting(column.key)}>
                      <Icon
                        icon="sort"
                        iconSize={20}
                        color={theme.transactionsTable.sortIcon}
                      />
                    </button>
                  )}
                </>
              );
            },
          },
        }}
      />
    </TableWrapperStyled>
  );
};
