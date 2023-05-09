"use client";

import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";
import { TransactionsTable } from "./[id]/TransactionsTable";
import { BudgetBasicInformation } from "./[id]/BudgetBasicInformation";
import { Budget } from "lib/types";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { CreateNewTransaction } from "./CreateNewTransaction";
import { device } from "lib/media-queries";
import { ButtonWithDropdown, Separator } from "ui";
import { useTranslate } from "lib/hooks";

const BudgetContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
  gap: 16px;
  ${device.tablet} {
    gap: 32px;
  }
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

export const BudgetsContent = () => {
  const { t, dict } = useTranslate("BudgetsPage");
  const id = usePathname()?.replace("/budgets/", "");
  const [
    createNewTransactionModalVisible,
    setCreateNewTransactionModalVisible,
  ] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    fetch(`/budgets.json`)
      .then((response) => response.json())
      .then((result) => {
        setBudgets(result.budgets);
      });
  }, []);

  const budget = useMemo(
    () => budgets.find((currentBudget) => currentBudget.id === id),
    [id, budgets]
  );

  const handleCreateNewExpense = () => {
    setTransactionType("Expense");
    setCreateNewTransactionModalVisible(true);
  };

  const handleCreateNewIncome = () => {
    setTransactionType("Income");
    setCreateNewTransactionModalVisible(true);
  };

  const closeNewTransactionModal = () => {
    setCreateNewTransactionModalVisible(false);
  };

  const mainCardContent = budget && (
    <BudgetContentWrapperStyled>
      <BudgetBasicInformation budget={budget} />
      <SeparatorStyled />
      <CreateButtonWrapper>
        <ButtonWithDropdown
          label={t(dict.createButton.label)}
          items={[
            {
              label: t(dict.createButton.newIncome),
              callback: handleCreateNewIncome,
            },
            {
              label: t(dict.createButton.newExpense),
              callback: handleCreateNewExpense,
            },
          ]}
        />
      </CreateButtonWrapper>
      <TransactionsTable
        budget={budget}
        setSorting={(column) => console.log(column)}
      />
    </BudgetContentWrapperStyled>
  );

  return (
    <>
      <MultiCardLayout
        main={mainCardContent ? mainCardContent : <></>}
        aside={<DummyAsideCardContent />}
      />
      {createNewTransactionModalVisible && (
        <CreateNewTransaction
          type={transactionType}
          onClose={closeNewTransactionModal}
          budgetId={id}
        />
      )}
    </>
  );
};
