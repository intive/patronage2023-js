"use client";

import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../MultiCardLayout";
import { TransactionsTable } from "./[id]/TransactionsTable";
import { BudgetBasicInformation } from "./[id]/BudgetBasicInformation";
import { Budget } from "lib/types";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { EditBudget } from "../EditBudget";
import { device } from "lib/media-queries";

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

export const BudgetsContent = () => {
  const id = usePathname()?.replace("/budgets/", "");

  const [isEditBudgetModalOpen, setIsEditBudgetModalOpen] = useState(false);

  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    fetch(`/budgets.json`)
      .then((response) => response.json())
      .then((result) => {
        setBudgets(result.budgets);
        console.log(result);
      });
  }, []);

  const budget = useMemo(
    () => budgets.find((currentBudget) => currentBudget.id === id),
    [id, budgets]
  );

  const showEditBudgetModal = () => {
    setIsEditBudgetModalOpen(true);
  };

  const hideEditBudgetModal = () => {
    setIsEditBudgetModalOpen(false);
  };

  const handleBudgetsEdit = (budgetsAfterEdit: Budget[]) => {
    setBudgets(budgetsAfterEdit);
  };

  const mainCardContent = budget && (
    <BudgetContentWrapperStyled>
      <BudgetBasicInformation
        budget={budget}
        handleShowEditBudgetModal={showEditBudgetModal}
      />
      <TransactionsTable
        budget={budget}
        setSorting={(column) => console.log(column)}
      />
      {isEditBudgetModalOpen && (
        <EditBudget
          budget={budget}
          onClose={hideEditBudgetModal}
          handleHideEditBudgetModal={hideEditBudgetModal}
          handleBudgetsEdit={handleBudgetsEdit}
        />
      )}
    </BudgetContentWrapperStyled>
  );

  return (
    <MultiCardLayout
      main={mainCardContent ? mainCardContent : <></>}
      aside={<DummyAsideCardContent />}
    />
  );
};
