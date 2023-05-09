"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBudgetsList, reqInstance } from "services/mutations";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM2NzI4NDcsImlhdCI6MTY4MzY2NTY0NywianRpIjoiMTQwNGM5ZDYtZjU0Yi00ZTdlLTk1YjgtZDFmZTU3N2Y0ZmE4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjU5MDhiM2M4LWQ3ZTgtNGM0Ny1hZmVkLTk4ZWQwNDhjZmM3MSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjU5MDhiM2M4LWQ3ZTgtNGM0Ny1hZmVkLTk4ZWQwNDhjZmM3MSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.NmYVfv-2lkiDHyVgMRCDk3H0KNvbz0ns2G2pc8w-uA_iGHv3gV1Tj_A7UAVpKNtF2Y-D40gv9s68V0KR-I_hWM92XrD0ryKAf4PQcNNKr1uHXcAlaep6aZB7KCzcfyxHZaomS6ynk99AkNVFmbczu8We6RhYtdoB0iANF3fWO4Yr9-vsPYPvW8qv59YpdO5y90uCAaiHyFrN1McdDtlHY5kFYthi5YmV6X90SHOUgdmXO0aw3L5gZgejJF5t5RWABVenh-gxeKXk65mPnuwsIFTYFA492iKPBuMLknJVCgmT6__XnbY6yuX1AbLYj8JNqpcX9wYU69vzzEB6TlEE_g";

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
