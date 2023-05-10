"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBudgetsList, reqInstance } from "services/mutations";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM3MDM2NDAsImlhdCI6MTY4MzY5NjQ0MCwianRpIjoiOWQ4MmY1ODktYTFlZS00YTA5LWI1ZjMtYmFiOWU0NTUxYWM2IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZTE3MjUyYmEtMjc5ZS00NWM3LWJhMWItNjcwMDNkZWI2YzAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImJiYjMyOTU3LWU0YjctNDY0NS1hODIzLTE0Y2NlM2Q2YzA0OSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImJiYjMyOTU3LWU0YjctNDY0NS1hODIzLTE0Y2NlM2Q2YzA0OSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkphbiBLb3dhbHNraSIsImF2YXRhciI6ImF2YXRhciIsInByZWZlcnJlZF91c2VybmFtZSI6Imprb3dhbHNraUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiSmFuIiwiZmFtaWx5X25hbWUiOiJLb3dhbHNraSIsImVtYWlsIjoiamtvd2Fsc2tpQGdtYWlsLmNvbSJ9.T0KxNnRJNf2I5Cbs94Xh7gr-WVuOhRtyc-joeuWZ5adQ2J2ZN6Qm2McTIv3tREiSdAp0LQLf6CLEcH7ORYwRYm82-UlHhPAqr7AWyZvvML8yM9CFWFPrHF2c3aTbGPE-YA_IH9qViLJy3xlz1jRDI7CfPUOjoirR1mULO8D3cnVAGMowagYeDzDiFnZ9ms_GlMGbaVR6cvROAb9EDN3sEH17UTvCAMt3dIkYwAO9gucaSNlN637mUpes-CNbcj2ozEV50rxSSxn_hm4VSO-y4wv2vfnZUgPW5ySqePsNq5ZqBqxEYzfZf-_y0MIbUDqCInhl7yAW2rnGr_6Obr8_8w"
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
