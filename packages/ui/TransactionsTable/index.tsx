"use client";

import { Budget, Transaction } from "./../../../apps/web/lib/types";

import { Table } from "ka-table";
import { DataType } from "ka-table/enums";

import { Icon } from "../Icon";
import { CategoryIcon } from "../CategoryIcon";
import { CurrencyAmount } from "../CurrencyAmount";
import { Avatar } from "../Avatar";
import { Chip } from "../Chip";
import { TransactionDropdownMenu } from "../TransactionDropdownMenu";
import * as dayjs from 'dayjs'

import { useEffect, useState } from "react";

import "./tablestyles.css";

const columns = [
  {
    key: "category",
    title: "Category",
    isSortable: true,
    dataType: DataType.Object,
  },
  { key: "description", title: "Name", dataType: DataType.String },
  {
    key: "status",
    title: "Status",
    isSortable: true,
    dataType: DataType.String,
  },
  { key: "amount", title: "Amount", dataType: DataType.Number },
  {
    key: "creator",
    title: "Creator",
    isSortable: true,
    dataType: DataType.Object,
  },
  {
    key: "editColumn",
  },
  //not intuit.
  { key: "date", title: "Date", isSortable: false, dataType: DataType.String },
];

const getDayName = (dateStr: string, locale: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
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

  const dummyItems = [
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
    <div className="table-wrapper">
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
                    <CurrencyAmount
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
                    <TransactionDropdownMenu items={dummyItems} side="right" />
                  );
              }
            },
          },
          groupCell: {
            content: (props) => {
              switch (props.column.key) {
                case "date":
                  const value = props.groupKey[props.groupIndex];
                  return (
                    <>
                      {getDayName(value, "en-US")} {value}
                    </>
                  );
              }
            },
          },
          headCellContent: {
            content: ({ column }) => {
              return (
                <>
                  {column.title}
                  {column.key !== "editColumn" && <Icon icon="sort" />}
                </>
              );
            },
          },
        }}
      />
    </div>
  );
};
