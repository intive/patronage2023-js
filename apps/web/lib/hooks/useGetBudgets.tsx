"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { getBudgetsList } from "services/mutations";

export const useGetBudgets = (
  searchValue: string,
  sortAscending: boolean,
  pageSize: number,
  axiosInstance: AxiosInstance
) => {
  return useInfiniteQuery({
    queryKey: ["budgets", { searchValue, sortAscending }],
    queryFn: ({ pageParam = 1 }) => {
      return getBudgetsList({
        pageSize,
        pageParam,
        searchValue,
        sortAscending,
        axiosInstance,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.items.length ? allPages.length + 1 : undefined;
    },
  });
};
