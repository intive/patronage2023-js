import axios, { AxiosInstance } from "axios";
import { env } from "env.mjs";
import { IconType } from "ui/Icon";

type ItemType = {
  items: BudgetType[];
};
type BudgetType = {
  name: string;
  icon: IconType;
  id: {
    value: string | number;
  };
};

export type GetBudgetsListType = {
  pageSize: number;
  pageIndex: number;
  searchValue: string;
  sortAscending: boolean;
  axiosInstance: AxiosInstance;
};

export const reqInstance = (token: string) =>
  axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

// Will be changed
export const getBudgetsList = async ({
  pageSize,
  pageIndex,
  searchValue,
  sortAscending,
  axiosInstance,
}: GetBudgetsListType) => {
  const body = {
    pageSize: pageSize,
    pageIndex: pageIndex,
    search: searchValue,
    sortDescriptors: [
      {
        columnName: "name",
        sortAscending: sortAscending,
      },
    ],
  };
  return (await axiosInstance.post<ItemType>("/budgets/list", body)).data;
};
