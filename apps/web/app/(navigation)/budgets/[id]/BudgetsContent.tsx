"use client";

import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../../MultiCardLayout";
import { useQuery } from "@tanstack/react-query";
import { TransactionsTable } from "./TransactionsTable";
import { BudgetBasicInformation } from "./BudgetBasicInformation";
import styled from "styled-components";
import { env } from "env.mjs";

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

export const BudgetsContent = () => {
  const id = "3e9ca5f0-5ef8-44bc-a8bc-175c826b39b5";

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM0OTkyMTgsImlhdCI6MTY4MzQ5MjAxOCwianRpIjoiNTBjNmQyYjQtNDRiMC00NDZmLWJjNDItMDk3MTY4NjQ2NjJiIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODIwNjNmMmUtOWQ5YS00YjM4LWEyMmUtNTU3MmNlZTlkZGY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjY3YjBlMTE5LWEzYWMtNDg5Zi1hYTU0LTgzMmRjZmVjNDMzNCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjY3YjBlMTE5LWEzYWMtNDg5Zi1hYTU0LTgzMmRjZmVjNDMzNCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoic211dG5hIHphYmEiLCJhdmF0YXIiOiIxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic211dG5hcnphYmFAcG5nLnBsIiwiZ2l2ZW5fbmFtZSI6InNtdXRuYSIsImZhbWlseV9uYW1lIjoiemFiYSIsImVtYWlsIjoic211dG5hcnphYmFAcG5nLnBsIn0.q7wYpqZJ12JoFuyifYPmgsaoGZC6aGq08wghL0B4cei6AeV0CaDh50NlKWt8R-KAHXT_Pfv_MCOz1i2NX420d7ZdlilPvkiB6ZG16G6d00zUyKICaA_9iHzLid0cKDbIk87BCNQm-alRJq5f_H67ql3CTNPFyMn3eNPTpRJoPbEFGw7TrIRmWALpp6TkSoLNVaSvBchPLA6a1nRpxW9g3KQRmgi-C_p8CH_yjSsK03lVFCMhOAEd9Ga_xgPYVaLrNq02odeFjuuLIAn6jFD_rHgWCy-HxvN-s5DYdmVapNYb6sBl7xfoVRkqondwFMsU0OtkLMfkYQ_vFb8xhUAJ6A";

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
      <BudgetBasicInformation budget={budget} />
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
