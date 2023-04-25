"use client";

import { Transaction } from "./../../../apps/web/lib/types";

import { Table } from "ka-table";
import { DataType } from "ka-table/enums";

import { Icon } from "../Icon";
import { Avatar } from "../Avatar";
import { useEffect, useState } from "react";
import { Chip } from "../Chip";

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
    width: 30
  },
  //not intuit.
  { key: "date", title: "Date", isSortable: false, dataType: DataType.String },
];

const getDayName = (dateStr: string, locale: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
};

type Props = {
  budgetId: string;
};

export const TransactionsTable = ({ budgetId }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch(`/budget/${budgetId}.json`)
      .then((response) => response.json())
      .then((result) => setTransactions(result.transactions));
  }, [budgetId]);

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
                  return (
                    <Icon
                      color={props.value.icon.foreground}
                      icon={props.value.icon.name}></Icon>
                  );
                case "creator":
                  return (
                    <div className="avatar-icon-wrapper">
                      <Avatar className="avatar" src={props.value.avatar} />{" "}
                    </div>
                  );
                case "status":
                  return <Chip type={props.value}>{props.value}</Chip>;
                case "editColumn":
                  return <Icon icon="more_vert" />
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
                  {column.key !== "status" && <Icon icon="sort" />}
                </>
              );
            },
          },
          sortIcon: {
            content: ({ column }) => {
              return <></>;
            },
          },
        }}
      />
    </div>
  );
};
