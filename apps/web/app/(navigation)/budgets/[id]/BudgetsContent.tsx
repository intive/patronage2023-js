"use client";

import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../../MultiCardLayout";
import { useQuery } from "@tanstack/react-query";
import { TransactionsTable } from "./TransactionsTable";
import { BudgetBasicInformation } from "./BudgetBasicInformation";
import styled from "styled-components";
import { env } from "env.mjs";
import { BudgetBasicInformationSuspense } from "./BudgetBasicInformation";
import BudgetDetails from "./BudgetDetails";
const BudgetContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
  gap: 32px;
  width: 100%;
`;

interface BudgetsContentProps {
  id: string;
}

export const BudgetsContent = ({ id: _ }: BudgetsContentProps) => {
  const id = "3e9ca5f0-5ef8-44bc-a8bc-175c826b39b5";

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM3MTk3ODQsImlhdCI6MTY4MzcxMjU4NCwianRpIjoiMjliYjA4ZWYtZTNiMS00ZTVlLTgzNDktZThkMTMzZWRmZTgwIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODIwNjNmMmUtOWQ5YS00YjM4LWEyMmUtNTU3MmNlZTlkZGY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjE2Y2FhYjMyLTg4MzktNDI3Zi1iYjZlLTJhYWI0MDk2N2YzZCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjE2Y2FhYjMyLTg4MzktNDI3Zi1iYjZlLTJhYWI0MDk2N2YzZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoic211dG5hIHphYmEiLCJhdmF0YXIiOiIxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic211dG5hcnphYmFAcG5nLnBsIiwiZ2l2ZW5fbmFtZSI6InNtdXRuYSIsImZhbWlseV9uYW1lIjoiemFiYSIsImVtYWlsIjoic211dG5hcnphYmFAcG5nLnBsIn0.BouJJAhKu_uLT7kli9aMmF_IAFYmT1Kv6Ptk08dpaZ0BlXLp9zdXQLhNVV2emP6ycbE_ir9YigSyb0aa-JV0qDkPQZA1C5W_Rx_Yy4XVHrWstasbxPX9SoLTmQfeKfcHLkjPnzLXT62UWiwh3X-m-JxBdd8xNBxcgNVdjvEkvavk_4lgBNXuvjHXJ5HV9dcdwjkmBgRHERwa_lk7DgwIE8EnDYQcA-ZliESts3K5UE-ZJ8oGVhz4-OA7zgZoCuXHbHuEsiHGeSyNFf5Xs6siquVbI_i8iEjdYe7KdHICHnDv3bp5m1_8_1OwRkOk-HKu2uyaDE7unKTnt8fiVFMzow";

  const { data: budget } = useQuery({
    queryKey: ["budgets", id],
    queryFn: async () => {
      return fetch(`${env.NEXT_PUBLIC_API_URL}/budgets/${id}`, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((res) => res.json());
    },
  });
  const mainCardContent = (
    <BudgetContentWrapperStyled>
      {budget ? (
        <BudgetBasicInformation budget={budget} />
      ) : (
        <BudgetBasicInformationSuspense />
      )}
      {budget ? <BudgetDetails budget={budget} /> : "loading"}

      {/* no suspense for TransactionTable so we don't render it when there is no data */}
      {budget && (
        <TransactionsTable
          budget={budget}
          setSorting={(column) => console.log(column)}
        />
      )}
    </BudgetContentWrapperStyled>
  );

  return (
    <MultiCardLayout main={mainCardContent} aside={<DummyAsideCardContent />} />
  );
};
