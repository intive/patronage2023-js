"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ItemType, getBudgetsList } from "services/mutations";
import useSuperfetch from "./useSuperfetch";

export const useGetBudgets = (
  searchValue: string,
  sortAscending: boolean,
  pageSize: number
) => {
  const fetch = useSuperfetch();
  const { data: sessionData } = useSession();
  const token = sessionData?.user.accessToken;

  return useInfiniteQuery({
    queryKey: ["budgetsList", { searchValue, sortAscending }],
    queryFn: async ({ pageParam = 1 }): Promise<ItemType> => {
      return getBudgetsList({
        pageSize,
        pageParam,
        searchValue,
        sortAscending,
        token,
        fetch,
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
