import React from "react";
import styled from "styled-components";
import BudgetStatistics from "./BudgetStatistics";
import { type BudgetGeneralInfo } from "lib/types";
import { useQuery } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import { DetailsWrapperStyled } from "./BudgetDetails.styled";
interface Props {
  budget: BudgetGeneralInfo;
}

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
