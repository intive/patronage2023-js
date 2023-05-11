"use client";

import { DummyAsideCardContent } from "app/DummyAsideCardContent";
import MultiCardLayout from "../../MultiCardLayout";
import { useQuery } from "@tanstack/react-query";
import { BudgetBasicInformation } from "./BudgetBasicInformation";
import styled from "styled-components";
import { env } from "env.mjs";
import {
  BudgetBasicInformationSuspense,
  BudgetDetailsSuspense,
} from "./BudgetSuspense";
import BudgetDetails from "./BudgetDetails";
import { useSession } from "next-auth/react";
import { FixCurrencyObject } from "lib/currencyValidation";

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

export const BudgetsContent = ({ id }: BudgetsContentProps) => {
  const { t, dict } = useTranslate("BudgetsPage");
  const [
    createNewTransactionModalVisible,
    setCreateNewTransactionModalVisible,
  ] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  const { data: session } = useSession();

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
        <BudgetBasicInformation budget={FixCurrencyObject(budget)} />
      ) : (
        <BudgetBasicInformationSuspense />
      )}

      {budget ? (
        <BudgetDetails budget={FixCurrencyObject(budget)} />
      ) : (
        <BudgetDetailsSuspense />
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
          budget={budget}
        />
      )}
    </>
  );
};
