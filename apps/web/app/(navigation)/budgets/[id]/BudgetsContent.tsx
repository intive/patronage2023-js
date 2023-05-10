"use client";

import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../../MultiCardLayout";
import { useQuery } from "@tanstack/react-query";
import { TransactionsTable } from "./TransactionsTable";
import { BudgetBasicInformation } from "./BudgetBasicInformation";
import styled from "styled-components";
import { env } from "env.mjs";
import { BudgetBasicInformationSuspense } from "./BudgetBasicInformation";
import { useSession } from "next-auth/react";
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

  const { data: session } = useSession();
  // z tym poniżej działa pewnie dlatego, że sesja jest na początku undefined
  // const token =
  //   "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM3NDI5NjksImlhdCI6MTY4MzczNTc2OSwianRpIjoiY2UyMGZkMmMtOWM5My00NTE2LTg4YmYtYTgyOTE5Y2NiZDM5IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODIwNjNmMmUtOWQ5YS00YjM4LWEyMmUtNTU3MmNlZTlkZGY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjhmZDQ0YTMwLWUwYzgtNDQ2Yi04NWJiLTZmNjAzMDFjNjY5YyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjhmZDQ0YTMwLWUwYzgtNDQ2Yi04NWJiLTZmNjAzMDFjNjY5YyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoic211dG5hIHphYmEiLCJhdmF0YXIiOiIxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic211dG5hcnphYmFAcG5nLnBsIiwiZ2l2ZW5fbmFtZSI6InNtdXRuYSIsImZhbWlseV9uYW1lIjoiemFiYSIsImVtYWlsIjoic211dG5hcnphYmFAcG5nLnBsIn0.A_TIEiIE9Mk7MCEXp_rjHNQ83r9AZB5FsUjD3v6v6ZWtnPe6-6B4VJAvCQ6wgjcZIF9PPra8GbqM4RZOkoVZe5EFQOqpRLWfpPLd14A7IWjZETdCKKVCVvQL1GmpuxjV4Vqa2VHiKA8pAKOcJe81uAXYwu9cCtuq72Qqeqfk_cRiIXVEjA73vOCxprXnVbECw1Ihf8LWgui9HasEV_GvcqbhQ-L65EcC1m68c1NV8xzOtHfDJd3C7MUpbkVWxCvxBPThmqrEoTexth5IvfosEzvIbli5dFTrr-dpAFSTRKCxXCLvUCjRP2eadA7SkWiGMfaW3NCKBIDtxqnODF7Ttg";
  const { data: budget } = useQuery({
    queryKey: ["budgets", id],
    queryFn: async () => {
      return fetch(`${env.NEXT_PUBLIC_API_URL}budgets/${id}`, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user.accessToken,
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
