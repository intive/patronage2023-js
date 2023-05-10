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
