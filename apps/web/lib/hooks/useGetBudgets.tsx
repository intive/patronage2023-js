import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getBudgetsList, reqInstance } from "services/mutations";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM1OTY5MDgsImlhdCI6MTY4MzU4OTcwOCwianRpIjoiZDc3Y2MyNTctYTg5OS00MGM0LTk1ZGYtNmI3MmExMGE0Y2Y3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjQ3MTNmZTc2LWRlNTQtNGQzMC1iZTM0LTExZDhiM2FlZTdkMyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjQ3MTNmZTc2LWRlNTQtNGQzMC1iZTM0LTExZDhiM2FlZTdkMyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.BUa4s83KjKm3szgx_RKIoT58qDYyzYkKemAPveHRSRebErJ-FQtVXMW7rHW6CsIsWm6sDgDbS1GbGtH6qU7ck-GxKiELuOW1-_ZV7O6dkCl0oxsquYPA33y8HWEl6_JmKj4wTGae4XePKF2ZLL8wUtKCZPIaPtSCK090UPSLaMzzA55PJ8giEzxdi-Q5D5tyx2xDbeDSyrVIwhlu8romYiAtNQ4qEUUxorxZRUY_XwuOmWFvpfGtsAN9BPUKBQFfyNNxfymttk23gyXhBGv2B0hCnaQVDvaZZRjxsOT5sdc9y8LXN7gKD3molzRCJJ70le9jR_UeYQTUz_mr9mnLdw";

const pageSize = 13;
const pageIndex = 1;
const axiosInstance = reqInstance(token);
const sortAscending = false;

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
