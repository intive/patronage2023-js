"use client";

import { AsideCardContent } from "app/AsideCardContent";
import MultiCardLayout from "../../../MultiCardLayout";
import { useQuery } from "@tanstack/react-query";
import { BudgetBasicInformation } from "../BudgetBasinInformation";
import styled from "styled-components";
import { env } from "env.mjs";
import {
  BudgetBasicInformationSuspense,
  BudgetDetailsSuspense,
} from "../BudgetDetails/BudgetSuspense";
import BudgetDetails from "../BudgetDetails/BudgetDetails";
import { useSession } from "next-auth/react";
import fixCurrencyObject from "lib/validations/fixCurrenyObject";
import { ButtonWithDropdown, Separator } from "ui";
import { useTranslate } from "lib/hooks";
import { useState } from "react";
import { CreateNewTransaction } from "../CreateNewTransaction";
import TransactionTableController from "../TransactionTableController";
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

export const BudgetContent = ({ id }: BudgetsContentProps) => {
  const { t, dict } = useTranslate("BudgetsPage");
  const [
    createNewTransactionModalVisible,
    setCreateNewTransactionModalVisible,
  ] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  const { data: session } = useSession();

  const handleCreateNewTransaction = (transactionType: string) => {
    setTransactionType(transactionType);
    setCreateNewTransactionModalVisible(true);
  };

  const { data: budget } = useQuery({
    queryKey: ["budgets"],
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

  const mainCardContent = (
    <BudgetContentWrapperStyled>
      {budget ? (
        <BudgetBasicInformation budget={fixCurrencyObject(budget)} />
      ) : (
        <BudgetBasicInformationSuspense />
      )}
      <SeparatorStyled />
      <CreateButtonWrapper>
        <ButtonWithDropdown
          disabled={!budget}
          label={t(dict.createButton.label)}
          items={[
            {
              id: "Income",
              label: t(dict.createButton.newIncome),
              callback: () => handleCreateNewTransaction("Income"),
            },
            {
              id: "Expense",
              label: t(dict.createButton.newExpense),
              callback: () => handleCreateNewTransaction("Expense"),
            },
          ]}
        />
      </CreateButtonWrapper>
      {budget ? (
        <BudgetDetails budget={fixCurrencyObject(budget)} />
      ) : (
        <BudgetDetailsSuspense />
      )}
      {budget && (
        <TransactionTableController budget={fixCurrencyObject(budget)} />
      )}
    </BudgetContentWrapperStyled>
  );

  return (
    <>
      <MultiCardLayout main={mainCardContent} aside={<AsideCardContent />} />
      {createNewTransactionModalVisible && (
        <CreateNewTransaction
          type={transactionType}
          onClose={() => setCreateNewTransactionModalVisible(false)}
          budget={budget}
        />
      )}
    </>
  );
};
