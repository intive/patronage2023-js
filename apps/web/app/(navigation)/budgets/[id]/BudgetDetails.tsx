import React from "react";

import styled from "styled-components";
import BudgetStatistics, {
  BudgetStatisticsSuspenseMain,
} from "./BudgetStatistics";
import { type BudgetGeneralInfo } from "lib/types";
import { useQuery } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
interface Props {
  budget: BudgetGeneralInfo;
}

const DetailsWrapperStyled = styled.div`
  width: 100%;
  border: 2px solid #f7f7f7;
  border-radius: 16px;
  display: flex;
  padding: 24px 32px;
  gap: 48px;
`;

const TotalWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 48px;
  gap: 8px;
`;

const BudgetDetails = ({ budget }: Props) => {
  const { data: session } = useSession();

  const { id, startDate, endDate } = budget;

  const { data: statistics } = useQuery({
    queryKey: ["mainStatistics"],
    queryFn: async () => {
      return fetch(
        `${env.NEXT_PUBLIC_API_URL}budgets/${id}/statistics?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + session?.user.accessToken,
          },
        }
      ).then((res) => res.json());
    },
    enabled: !!session,
  });
  console.log("statystyki główne", statistics);
  return (
    <DetailsWrapperStyled>
      {/* statistics do lewego */}
      <div>lewy</div>
      <BudgetStatistics budget={budget} />
    </DetailsWrapperStyled>
  );
};

export default BudgetDetails;

const TotalDetailsSuspense = () => {
  return (
    <TotalWrapperStyled>
      <Skeleton height={10} width={100} />
      <Skeleton height={30} width={250} />
      <Skeleton height={20} width={50} />
    </TotalWrapperStyled>
  );
};

export const BudgetDetailsSuspense = () => {
  return (
    <DetailsWrapperStyled>
      <TotalDetailsSuspense />
      <Skeleton width={500} height={100} />
      <BudgetStatisticsSuspenseMain />
    </DetailsWrapperStyled>
  );
};
