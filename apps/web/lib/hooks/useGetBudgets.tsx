"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBudgetsList, reqInstance } from "services/mutations";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM3MzI0ODEsImlhdCI6MTY4MzcyNTI4MSwianRpIjoiZjg5OTdjMWMtMmM1MC00NTA1LWI4ZjktM2ZmNDUzMmU5NTk2IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjFiMjZkNDViLTAxNzUtNDQxZS1hOTJkLWM2ZWYwM2UyODIzMSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjFiMjZkNDViLTAxNzUtNDQxZS1hOTJkLWM2ZWYwM2UyODIzMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.ftT2ZEPPk4JFUwOO83kifk0UP7fXehZzjikAMXMPKFCoW0SmjeHNTRIUzmiuTuLQ5O2HwRAIzyKgATeJIWk_bBvYy8RWbCwke8TtWoF9LUSIYcFJyTKRUBiRKQHWQrO9VEXgoyhM5BXxesnFlmIrFLFBBbmZJwjAIDDO3HsAuXksOXT3cx4SgdM0aQrpaOqWKOTGELVx4nS3PH1oKiea4Wsj5BzNPCq5mBGL6Xmh4f2D2UDiz1wssJrY88gaWT35JZNsVP3NKtmPl9q2Z6MxVIURAJ2gpmOnpxRVe4cYXH_2-1Q74IM2SIzYqwPfGJmtyzxCe8e3IH5mXCM7_Ew_PA";

const axiosInstance = reqInstance(token);

export const useGetBudgets = (
  searchValue: string,
  sortAscending: boolean,
  pageSize: number
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
