import React from "react";
import BudgetStatistics from "./BudgetStatistics";
import { type BudgetGeneralInfo } from "lib/types";
import { useQuery } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import { DetailsWrapperStyled } from "./BudgetDetails.styled";
import { TrendChart } from "./TrendChart";
interface Props {
  budget: BudgetGeneralInfo;
}

const BudgetDetails = ({ budget }: Props) => {
  const { data: session } = useSession();

  const { id, currency, startDate, endDate } = budget;

  const { data: statistics } = useQuery({
    queryKey: ["mainStatistics", budget.id],
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

  if (!statistics?.item){
    return null
  }

  return (
    <DetailsWrapperStyled>
      <TrendChart currency={currency} statistics={statistics} />
      <BudgetStatistics budget={budget} />
    </DetailsWrapperStyled>
  );
};

export default BudgetDetails;
