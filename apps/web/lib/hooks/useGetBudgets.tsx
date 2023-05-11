"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getBudgetsList, reqInstance } from "services/mutations";

export const useGetBudgets = (
  searchValue: string,
  sortAscending: boolean,
  pageSize: number
) => {
  const { data: sessionData } = useSession();
  const axiosInstance = reqInstance(sessionData?.user.accessToken);

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
    enabled: !!sessionData,
  });
};
