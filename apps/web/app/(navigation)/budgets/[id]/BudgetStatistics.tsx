import { type BudgetGeneralInfo } from "lib/types";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { CurrencyAmount, TrendChip } from "ui";
import QueryDropdown from "./QueryDropdown";
import { useQuery } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import Skeleton from "react-loading-skeleton";
interface Props {
  budget: BudgetGeneralInfo;
}

const DetailsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e1e1e1;
  padding-inline: 48px;
  gap: 8px;
`;
const DetailsWrapperSuspense = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  const [range, setRange] = useState("month");
  const { id, currency } = budget;

  const [startRange, endRange, title] = useMemo(() => {
    let start = dayjs();
    let end = dayjs();
    let title = "";
    switch (range) {
      case "thisMonth":
        start = start.startOf("month");
        title = "Budget this month";
        break;
      case "2weeks":
        start = start.subtract(14, "days");
        title = "Budget of two weeks";
        break;
      case "7days":
        start = start.subtract(7, "days");
        title = "Budget of seven days";
        break;
      default:
        start = start.startOf("month");
        title = "Budget this month";
        break;
    }

    return [start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"), title];
  }, [range]);

  const { data: session } = useSession();

  const { data: statistics, isLoading } = useQuery({
    queryKey: ["rangedStatistics", startRange, endRange],
    queryFn: async () => {
      return fetch(
        `${env.NEXT_PUBLIC_API_URL}budgets/${id}/statistics?startDate=${startRange}&endDate=${endRange}`,
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
  return (
    <DetailsWrapperStyled>
      {isLoading ? (
        <BudgetStatisticsSuspense />
      ) : (
        <>
          <QueryDropdown
            label={<TitleStyled>{title}</TitleStyled>}
            items={[
              {
                id: "thisMonth",
                label: "This month",
                onClick: () => setRange("thisMonth"),
              },
              {
                id: "2weeks",
                label: "2 weeks",
                onClick: () => setRange("2weeks"),
              },
              {
                id: "7days",
                label: "7 days",
                onClick: () => setRange("7days"),
              },
            ]}
          />
          <CurrencyAmountStyled
            currency={currency}
            amount={statistics?.periodValue}
            hidePlus
          />
          <TrendChip value={statistics?.trendValue} />
        </>
      )}
    </DetailsWrapperStyled>
  );
};

export default BudgetStatistics;

const BudgetStatisticsSuspense = () => {
  return (
    <DetailsWrapperSuspense>
      <Skeleton height={10} width={100} />
      <Skeleton height={30} width={150} />
      <Skeleton height={20} width={50} />
    </DetailsWrapperSuspense>
  );
};

export const BudgetStatisticsSuspenseMain = () => {
  return (
    <DetailsWrapperStyled>
      <Skeleton height={10} width={100} />
      <Skeleton height={30} width={150} />
      <Skeleton height={20} width={50} />
    </DetailsWrapperStyled>
  );
};
