"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getBudgetsList } from "services/mutations";

export const useGetBudgets = (
  searchValue: string,
  sortAscending: boolean,
  pageSize: number
) => {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.accessToken;

  return useInfiniteQuery({
    queryKey: ["budgets", { searchValue, sortAscending }],
    queryFn: async ({ pageParam = 1 }) => {
      return getBudgetsList({
        pageSize,
        pageParam,
        searchValue,
        sortAscending,
        token,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.items!.length
        ? allPages.length + 1
        : undefined;
    },
    enabled: !!sessionData,
  });
};
