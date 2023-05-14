import { type BudgetGeneralInfo } from "lib/types";
import React, { useMemo, useState } from "react";
import { TrendChip } from "ui";
import QueryDropdown from "./QueryDropdown";
import { useQuery } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { BudgetStatisticsSuspense } from "./BudgetSuspense";
import {
  CurrencyAmountStyled,
  StatisticsWrapperStyled,
  TitleStyled,
} from "./BudgetDetails.styled";

interface Props {
  budget: BudgetGeneralInfo;
}

const BudgetStatistics = ({ budget }: Props) => {
  const [range, setRange] = useState("month");
  const { id, currency, endDate } = budget;

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
    // todo add check for earlier end
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
    <StatisticsWrapperStyled>
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
            currencyOptions={currency}
            amount={statistics?.periodValue}
            hidePlus
          />
          <TrendChip value={statistics?.trendValue} />
        </>
      )}
    </StatisticsWrapperStyled>
  );
};

export default BudgetStatistics;
