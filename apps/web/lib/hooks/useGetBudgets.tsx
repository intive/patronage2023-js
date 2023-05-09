"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBudgetsList, reqInstance } from "services/mutations";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM2NTI0NzMsImlhdCI6MTY4MzY0NTI3MywianRpIjoiOWEwM2ExMWYtN2JlYi00MjMwLWI5NGYtNTNjMDljMTY0NjM0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjU5Y2ZlN2FhLTYyNTItNDgxMy1hYjRhLTU5MWRjNDBjNjY2NiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjU5Y2ZlN2FhLTYyNTItNDgxMy1hYjRhLTU5MWRjNDBjNjY2NiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.lExNbPBjG6g8vAlpMlNg2CljmEL3yHA6JX7cUXVVbApS7jF746x0M-dNoogeyLi-r2ADOclE__WHp9jBC4XoMoaaW1n16hKfhdVMX6Wxj8E1vxJJI_8Ilvn61HGcrn8mQ2F4iSmqjxFHNqXBoEsjDWie66EgViieJg12QEJe9DBczs0xhOLVEb-eJQkCjrYUbu-07JaPeX_IfUjj0hmB0vxQtcdQ86f6bW7up6qJAfWfyDOtB9bkiDZB3EGnXeybNnDUarhhFgasewygEUne6t2UcutYh0A8rbAPZXYL8r2VTliaVcCmnnkS1f6c0ZeKReEGHVX6EviTYJA3iN8FtA";
const pageSize = 13;
const pageIndex = 1;
const axiosInstance = reqInstance(token);

export const useGetBudgets = (searchValue: string, sortAscending: boolean) => {
  return useInfiniteQuery({
    queryKey: ["budgets", { searchValue, sortAscending }],
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
