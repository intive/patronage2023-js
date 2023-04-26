"use client";

import { Budget, Transaction } from "./../../../apps/web/lib/types";

import { Table } from "ka-table";
import { DataType } from "ka-table/enums";

import { Icon } from "../Icon";
import { CategoryIcon } from "../CategoryIcon";
import { Avatar } from "../Avatar";
import { Chip } from "../Chip";
import { TransactionDropdownMenu } from "../TransactionDropdownMenu";
import dayjs from "dayjs";

import { useEffect, useState } from "react";

import { TableWrapperStyled, StyledCurrencyAmount } from "./TransactionsTable.styled";

const columns = [
  {
    key: "category",
    title: "Category",
    isSortable: true,
    dataType: DataType.Object,
  },
  {
    key: "description",
    title: "Name",
    isSortable: true,
    dataType: DataType.String,
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
  },
  {
    key: "creator",
    title: "Creator",
    isSortable: true,
    dataType: DataType.Object,
  },
  {
    key: "editColumn",
  },
  { key: "date", title: "Date", isSortable: false, dataType: DataType.Number },
];

const getDayName = (timestamp: number, locale: string) => {
  // const date = new Date(timestamp);
  // return date.toLocaleDateString(locale, { weekday: "long" });
  return dayjs(timestamp).format("DD/MM/YYYY");
};

type Props = {
  budget: Budget;
};

export const TransactionsTable = ({ budget }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch(`/budget/${budget.id}.json`)
      .then((response) => response.json())
      .then((result) => setTransactions(result.transactions));
  }, [budget]);

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
                    <div className="avatar-icon-wrapper">
                      <Avatar
                        className="avatar"
                        src={`/avatars/${props.value.avatar}`}
                      />{" "}
                    </div>
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
                  {column.key !== "editColumn" && <button><Icon icon="sort" iconSize={20} color={'#515151'}/></button>}
                </>
              );
            },
          },
        }}
      />
    </TableWrapperStyled>
  );
};
