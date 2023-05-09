"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBudgetsList, reqInstance } from "services/mutations";

const token =
 "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM2MTY0NjksImlhdCI6MTY4MzYwOTI2OSwianRpIjoiNmYzNGZjZDgtMmM1ZS00MmRhLWFkZDQtNDk0YWZiNWJiMGJlIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImM4N2RmYjRkLTk4YTUtNGI3YS1hNDAxLTQ0NDhiMDU1ZTk3YyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImM4N2RmYjRkLTk4YTUtNGI3YS1hNDAxLTQ0NDhiMDU1ZTk3YyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.DKyGhv9h7pIzgPfSaNTQ6Rv5kLMVUuSd6nX1T9LgaN0J3TY2McpQgBvDGkc56cHwD-6RytuY_IFJUHXG5JfmhAhHmtqWQ-Uu3Dj3pUbKaMRksTW4PPNPdCZRJkPm67BfrFW5rgp-WQAL8ssrNEqElBOzRiGau35wZhhP7qy97Do7OF2xofXcxItZGbhqsztFBVykGcZ1OREjmbk8apTiygEGfFbxPDcCWOL6qgKfXMAfx804qJaD8F9VAt01cT5vCDbznSsvEMDAgyEES4koOU34IS9GbcEPbr-ox5AszV4ZY_exmK_QwY_oaf5ZqMF9oJwXoKo0PJZnX82U4UA8qA"

const pageSize = 13;
const pageIndex = 1;
const axiosInstance = reqInstance(token);
const sortAscending = true;

export const useGetBudgets = (searchValue: string) => {
  return useInfiniteQuery({
    queryKey: ["budgets", searchValue],
    queryFn: ({ pageParam = 1 }) => {
      return getBudgetsList({
        pageSize,
        pageIndex,
        searchValue,
        sortAscending,
        axiosInstance,
        pageParam,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.items.length ? allPages.length + 1 : undefined;
    },
  });
};
