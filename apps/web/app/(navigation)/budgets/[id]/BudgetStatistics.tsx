import { type BudgetGeneralInfo } from "lib/types";
import React from "react";
import styled from "styled-components";
import { ButtonWithDropdown, CurrencyAmount } from "ui";
import QueryDropdown from "./QueryDropdown";
import { useQuery } from "@tanstack/react-query";
import { env } from "process";
import { useSession } from "next-auth/react";
interface Props {
  budget: BudgetGeneralInfo;
}

const DetailsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e1e1e1;
  padding-inline: 48px;
`;

const TopWrapperStyled = styled.div`
  display: flex;
`;

const CurrencyAmountStyled = styled(CurrencyAmount)`
  font-size: 32px;
  line-height: 150%;
  font-weight: 600;
  color: #515151; // ADD THEME
`;

const TitleStyled = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  line-height: 24px;
  color: #7e7e7e;
`;

const BudgetStatistics = ({ budget }: Props) => {
  const { id, currency, startDate, endDate } = budget;

  const { data: session } = useSession();

  const { data: statistics } = useQuery({
    queryKey: ["rangedStatistics"],
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
  console.log(statistics);
  return (
    <DetailsWrapperStyled>
      <QueryDropdown
        label={<TitleStyled>Budget this month</TitleStyled>}
        items={[
          {
            id: "1",
            label: "This month",
            onClick: () => {},
          },
          {
            id: "2",
            label: "2 weeks",
            onClick: () => {},
          },
          {
            id: "3",
            label: "7 days",
            onClick: () => {},
          },
        ]}
      />
      <CurrencyAmountStyled currency={currency} amount={100} hidePlus />
      <div>chip</div>
    </DetailsWrapperStyled>
  );
};

export default BudgetStatistics;
