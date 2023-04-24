"use client";

import { Table } from "ka-table";
import {
  DataType,
  FilteringMode,
  PagingPosition,
  SortingMode,
} from "ka-table/enums";

import { Icon } from "../Icon";
import { Avatar } from "../Avatar";
import { useState } from "react";
import { Chip } from "../Chip";

import { SearchInput } from "../Input/SearchInput";
import { search } from "ka-table/actionCreators";

import "./tablestyles.css";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: {
    ISO: string;
    locale: string;
  };
  category: {
    id: number;
    name: string;
    icon: {
      name: string;
      foreground: string;
      background: string;
    };
  };
  description: string;
  status: string;
  creator: string;
}

const transactions = [
  {
    id: "1",
    date: "2023-04-21",
    amount: -1337.69,
    currency: {
      ISO: "USD",
      locale: "en-US",
    },
    category: {
      id: 1,
      name: "Home spendings",
      icon: {
        name: "home",
        foreground: "#1E4C40",
        background: "#F1FBF6",
      },
    },
    description: "Rent",
    status: "Done",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "2",
    date: "2023-04-21",
    amount: 44.0,
    currency: {
      ISO: "EUR",
      locale: "de-DE",
    },
    category: {
      id: 5,
      name: "Income",
      icon: {
        name: "money",
        foreground: "#162A41",
        background: "#F0F3F7",
      },
    },
    description: "Lift share",
    status: "Done",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "3",
    date: "2023-04-20",
    amount: -77.99,
    currency: {
      ISO: "USD",
      locale: "en-US",
    },
    category: {
      id: 4,
      name: "Grocery",
      icon: {
        name: "shopping_cart",
        foreground: "#5A092F",
        background: "#FDE7F1",
      },
    },
    description: "Grocery",
    status: "Cancelled",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "4",
    date: "2023-04-19",
    amount: -4000.99,
    currency: {
      ISO: "USD",
      locale: "en-US",
    },
    category: {
      id: 1,
      name: "Home spendings",
      icon: {
        name: "subscriptions",
        foreground: "#1E4C40",
        background: "#F1FBF6",
      },
    },
    description: "Rug store",
    status: "Done",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "5",
    date: "2023-04-17",
    amount: -15,
    currency: {
      ISO: "EUR",
      locale: "de-DE",
    },
    category: {
      id: 3,
      name: "Car",
      icon: {
        name: "directions_car",
        foreground: "#003150",
        background: "#E0F3FF",
      },
    },
    description: "Car wash",
    status: "Cancelled",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "6",
    date: "2023-04-17",
    amount: -43.39,
    currency: {
      ISO: "EUR",
      locale: "de-DE",
    },
    category: {
      id: 3,
      name: "Car",
      icon: {
        name: "directions_car",
        foreground: "#003150",
        background: "#E0F3FF",
      },
    },
    description: "Petrol",
    status: "Done",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "7",
    date: "2023-04-16",
    amount: -25.99,
    currency: {
      ISO: "USD",
      locale: "en-US",
    },
    category: {
      id: 4,
      name: "Grocery",
      icon: {
        name: "shopping_cart",
        foreground: "#5A092F",
        background: "#FDE7F1",
      },
    },
    description: "Grocery",
    status: "Done",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "8",
    date: "2023-04-16",
    amount: -25.99,
    currency: {
      ISO: "USD",
      locale: "de-DE",
    },
    category: {
      id: 4,
      name: "Grocery",
      icon: {
        name: "shopping_cart",
        foreground: "#5A092F",
        background: "#FDE7F1",
      },
    },
    description: "Grocery",
    status: "Cancelled",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "9",
    date: "2023-04-16",
    amount: -30.26,
    currency: {
      ISO: "USD",
      locale: "de-DE",
    },
    category: {
      id: 1,
      name: "Home spendings",
      icon: {
        name: "home",
        foreground: "#1E4C40",
        background: "#F1FBF6",
      },
    },
    description: "Grocery",
    status: "Done",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "10",
    date: "2023-04-17",
    amount: -150,
    currency: {
      ISO: "EUR",
      locale: "de-DE",
    },
    category: {
      id: 3,
      name: "Home spendings",
      icon: {
        name: "home",
        foreground: "#1E4C40",
        background: "#F1FBF6",
      },
    },
    description: "New doorbell",
    status: "Done",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "11",
    date: "2023-04-17",
    amount: -26.99,
    currency: {
      ISO: "EUR",
      locale: "de-DE",
    },
    category: {
      id: 3,
      name: "Grocery",
      icon: {
        name: "shopping_cart",
        foreground: "#5A092F",
        background: "#FDE7F1",
      },
    },
    description: "Party snacks",
    status: "Done",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "12",
    date: "2023-04-17",
    amount: -500,
    currency: {
      ISO: "EUR",
      locale: "de-DE",
    },
    category: {
      id: 3,
      name: "Home spendings",
      icon: {
        name: "home",
        foreground: "#1E4C40",
        background: "#F1FBF6",
      },
    },
    description: "Kitchen renovation",
    status: "Cancelled",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "13",
    date: "2023-04-17",
    amount: -27,
    currency: {
      ISO: "EUR",
      locale: "de-DE",
    },
    category: {
      id: 3,
      name: "Income",
      icon: {
        name: "money",
        foreground: "#162A41",
        background: "#F0F3F7",
      },
    },
    description: "Birthday present",
    status: "Done",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "14",
    date: "2023-04-17",
    amount: -15,
    currency: {
      ISO: "EUR",
      locale: "de-DE",
    },
    category: {
      id: 3,
      name: "Grocery",
      icon: {
        name: "shopping_cart",
        foreground: "#5A092F",
        background: "#FDE7F1",
      },
    },
    description: "Carrots",
    status: "Cancelled",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
  {
    id: "15",
    date: "2023-04-17",
    amount: -15,
    currency: {
      ISO: "EUR",
      locale: "de-DE",
    },
    category: {
      id: 3,
      name: "Car",
      icon: {
        name: "directions_car",
        foreground: "#003150",
        background: "#E0F3FF",
      },
    },
    description: "Car wash",
    status: "Cancelled",
    creator: {
      id: "b7f83347-5d65-43d0-a5a9-3cb6397b5fe2",
      name: "Jan Kowalski",
      avatar: "/avatar.svg",
    },
  },
];

const columns = [
  {
    key: "category",
    title: "Category",
    isSortable: false,
    dataType: DataType.Object,
  },
  { key: "description", title: "Description", dataType: DataType.String },
  {
    key: "status",
    title: "Status",
    isSortable: false,
    dataType: DataType.String,
  },
  { key: "amount", title: "Amount", dataType: DataType.Number },
  {
    key: "creator",
    title: "Creator",
    isSortable: false,
    dataType: DataType.Object,
  },
  //not intuit.
  { key: "date", title: "Date", isSortable: false, dataType: DataType.String },
];

const getDayName = (dateStr: string, locale: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
};

export const TransactionsTable = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="table-wrapper">
      <Table
        columns={columns}
        rowKeyField={"id"}
        data={transactions}

        paging={{
          enabled: true,
          pageIndex: 0,
          pageSize: 10,
          pageSizes: [5, 10, 15],
          position: PagingPosition.Bottom,
        }}

        groups={[{ columnKey: "date" }]}

        searchText={searchText}
        search={({ searchText: searchTextValue, rowData, column }) => {
          if (column.key === "status") {
            // return (searchTextValue === 'Cancelled' && rowData.status.includes("Cancelled")) || (searchTextValue === 'Done' && rowData.status.includes("Done"));
            return rowData.status.includes(searchTextValue);
          }
        }}
        noData={{
          text: "No Data Found",
        }}
        sortingMode={SortingMode.SingleTripleState}
        filteringMode={FilteringMode.HeaderFilter}
        virtualScrolling= {{
          enabled: true
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
                      <Icon icon="more_vert" />
                    </div>
                  );
                  case "status":
                    return (
                    <Chip type={props.value}>{props.value}</Chip>
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
                    <span>
                      {getDayName(value, "en-US")} {value}
                    </span>
                  );
              }
            },
          },
          headCellContent: {
            content: ({ column }) => {
              return (
                <>
                  <span>{column.title}</span>
                  {column.key !=="status" && <Icon icon="sort" />}
                </>
              );
            },
          },
          sortIcon: {
            content: ({ column }) => {
              return <></>;
            },
          },
          headFilterButton: {
            content: ({ column: {key}}) => {
              if (key !== 'status') {
                return <></>
              } 
              return <Icon icon="sort"/>
            },
          },
          tableWrapper: {
            elementAttributes: () => ({ style: { maxHeight: 350, minHeight:350 }})
          }
        }}></Table>
    </div>
  );
};