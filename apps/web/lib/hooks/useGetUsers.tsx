"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";

export type GetUsersListType = {
  pageSize: number;
  pageParam: number;
  searchValue: string;
  token: string | undefined;
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

const URL = `${env.NEXT_PUBLIC_API_URL}user/list`;

export const getUsersList = async ({
  pageSize,
  pageParam,
  searchValue,
  token,
}: GetUsersListType): Promise<ItemType> => {
  const options = {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageSize: pageSize,
      pageIndex: pageParam,
      search: searchValue,
      sortDescriptors: [
        {
          columnName: "firstName",
          sortAscending: true,
        },
      ],
    }),
  };

  return fetch(URL, options).then((res) => res.ok && res.json());
};

export const useGetUsers = (searchValue: string, pageSize: number) => {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.accessToken;

  return useInfiniteQuery({
    queryKey: ["budgetsList", { searchValue }],
    queryFn: async ({ pageParam = 1 }): Promise<ItemType> => {
      return getUsersList({
        pageSize,
        pageParam,
        searchValue,
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
