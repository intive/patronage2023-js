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
import { useTranslate } from "lib/hooks";
import { useState } from "react";
import { ButtonWithDropdown, Separator } from "ui";
import { CreateNewTransaction } from "./CreateNewTransaction";
const BudgetContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
  gap: 32px;
  width: 100%;
`;
const SeparatorStyled = styled(Separator)`
  display: block;
  width: 100%;
`;

const CreateButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

interface BudgetsContentProps {
  id: string;
}

export const BudgetsContent = ({ id: _ }: BudgetsContentProps) => {
  const id = "3e9ca5f0-5ef8-44bc-a8bc-175c826b39b5";

  const { t, dict } = useTranslate("BudgetsPage");
  const [
    createNewTransactionModalVisible,
    setCreateNewTransactionModalVisible,
  ] = useState(false);
  const [transactionType, setTransactionType] = useState("");

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
    enabled: !!session,
  });

  const handleCreateNewTransaction = (transactionType: string) => {
    setTransactionType(transactionType);
    setCreateNewTransactionModalVisible(true);
  };

  const closeNewTransactionModal = () => {
    setCreateNewTransactionModalVisible(false);
  };

  const mainCardContent = (
    <BudgetContentWrapperStyled>
      {budget ? (
        <BudgetBasicInformation budget={budget} />
      ) : (
        <BudgetBasicInformationSuspense />
      )}
      <SeparatorStyled />
      <CreateButtonWrapper>
        <ButtonWithDropdown
          label={t(dict.createButton.label)}
          items={[
            {
              label: t(dict.createButton.newIncome),
              callback: () => handleCreateNewTransaction("Income"),
            },
            {
              label: t(dict.createButton.newExpense),
              callback: () => handleCreateNewTransaction("Expense"),
            },
          ]}
        />
      </CreateButtonWrapper>
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
    <>
      <MultiCardLayout
        main={mainCardContent}
        aside={<DummyAsideCardContent />}
      />
      {createNewTransactionModalVisible && (
        <CreateNewTransaction
          type={transactionType}
          onClose={closeNewTransactionModal}
          budgetId={budget.id}
        />
      )}
    </>
  );
};
