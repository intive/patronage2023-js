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
import { Budget } from "lib/types";

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
  const FixCurrencyObject = (budget: Budget) => {
    const strToLocale = (tag: string) => {
      const localObj = {
        USD: "en-US",
        GBP: "en-GB",
        EUR: "de-DE",
        PLN: "pl-PL",
      };
      return {
        tag,
        locale: localObj[tag as keyof typeof localObj],
      };
    };
    return {
      ...budget,
      currency: strToLocale(budget.currency),
    };
  };

  const id = "3e6ca5f0-5ef8-44bc-a8bc-175c826b39b5";

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
    <MultiCardLayout main={mainCardContent} aside={<DummyAsideCardContent />} />
  );
};
