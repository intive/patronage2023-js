"use client";

import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useTranslate } from "lib/hooks";

import { Budget, Transaction } from "../../../../lib/types";
import { Table } from "ka-table";
import { DataType } from "ka-table/enums";
import { Column } from "ka-table/models";
import { Icon } from "ui/Icon";
import { CategoryIcon } from "ui/CategoryIcon";
import { Avatar } from "ui/Avatar";
import { Chip } from "ui/Chip";
import { TransactionDropdownMenu } from "ui/TransactionDropdownMenu";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

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
    style: {
      backgroundColor: "Wheat",
      verticalAlign: "middle",
      lineHeight: 0,
    },
    width: "19%",
  },
  {
    key: "description",
    title: "Name",
    isSortable: true,
    dataType: DataType.String,
    style: { backgroundColor: "PaleTurquoise" },
    width: "31%",
  },
  // {
  //   key: "status",
  //   title: "Status",
  //   isSortable: true,
  //   dataType: DataType.String,
  //   // style: { backgroundColor: "RosyBrown" },
  //   width: "18%",
  // },
  {
    key: "amount",
    title: "Amount",
    isSortable: true,
    dataType: DataType.Number,
    style: { backgroundColor: "LightBlue" },
    width: "32%",
  },
  {
    key: "creator",
    title: "Creator",
    isSortable: true,
    dataType: DataType.Object,
    style: {
      backgroundColor: "Coral",
      textAlign: "center",
      verticalAlign: "middle",
      lineHeight: 0,
      paddingLeft: "8px",
      paddingRight: "8px",
    },
    width: "13%",
  },
  {
    key: "editColumn",
    style: {
      backgroundColor: "LightPink",
      textAlign: "center",
      verticalAlign: "middle",
      lineHeight: 0,
      paddingLeft: "8px",
      paddingRight: "8px",
    },
    width: "5%",
  },
  {
    key: "date",
    title: "Date",
    isSortable: false,
    dataType: DataType.Number,
  },
  {
    key: "empty",
    title: "",
    isSortable: false,
    width: "48px",
  },
] as Column[];

type TransactionsTableProps = {
  budget: Budget;
  setSorting: (column: string) => void;
};

export const TransactionsTable = ({
  budget,
  setSorting,
}: TransactionsTableProps) => {
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
      ComponentToRender: <div>Edit</div>,
      id: "edit-budget",
    },
    {
      ComponentToRender: <div>Clone</div>,
      id: "clone-budget",
    },
    {
      ComponentToRender: <div>Remove</div>,
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
                // case "status":
                //   return <Chip type={props.value}>{props.value}</Chip>;
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
              if (column.key === "empty") {
                return null;
              }
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
