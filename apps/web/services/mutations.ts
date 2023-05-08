import axios, { AxiosInstance } from "axios";
import { env } from "env.mjs";
import { IconType } from "ui/Icon";

type BudgetType = {
  name: string;
  icon: IconType;
  id: {
    value: string | number;
  };
};
type ItemType = {
  items: BudgetType[];
  totalCount: number;
};

export type GetBudgetsListType = {
  pageSize: number;
  pageIndex: number;
  searchValue: string;
  sortAscending: boolean;
  axiosInstance: AxiosInstance;
  pageParam?: number;
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

export const getBudgetsList = async ({
  pageSize,
  pageIndex,
  searchValue,
  sortAscending,
  axiosInstance,
  pageParam,
}: GetBudgetsListType) => {
  const scrollPage = pageParam ? pageParam : pageIndex;
  const body = {
    pageSize: pageSize,
    pageIndex: scrollPage,
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
