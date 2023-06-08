"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import useSuperfetch from "./useSuperfetch";

export type GetUsersListType = {
  pageSize: number;
  pageParam: number;
  searchValue: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdTimestamp: number;
  createdVia: string;
  avatar: string;
};

export type ItemType = {
  items: User[];
  totalCount: number;
};

export const useGetUsers = (searchValue: string, pageSize: number) => {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.accessToken;

  const fetch = useSuperfetch();

  const getUsersList = async ({
    pageSize,
    pageParam,
    searchValue,
  }: GetUsersListType): Promise<ItemType> => {
    const options = {
      method: "POST",
      body: {
        pageSize: pageSize,
        pageIndex: pageParam,
        search: searchValue,
        sortDescriptors: [
          {
            columnName: "firstName",
            sortAscending: true,
          },
        ],
      },
    };

    return fetch(`${env.NEXT_PUBLIC_API_URL}user/list`, options);
  };

  return useInfiniteQuery({
    queryKey: ["usersList", { searchValue }],
    queryFn: async ({ pageParam = 1 }): Promise<ItemType> => {
      return getUsersList({
        pageSize,
        pageParam,
        searchValue,
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
