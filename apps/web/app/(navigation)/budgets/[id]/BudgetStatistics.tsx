"use client";
import { type BudgetGeneralInfo } from "lib/types";
import React, { useState } from "react";
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
import { StyledTrendChip } from "./TrendChart.styled";
import { useTranslate } from "lib/hooks";

interface Props {
  budget: BudgetGeneralInfo;
}

const BudgetStatistics = ({ budget }: Props) => {
  const [range, setRange] = useState("week");
  const { id, currency, endDate } = budget;
  const { dict, t } = useTranslate("BudgetStatistics");
  const { queryButtonLabels, title: translatedTitle } = dict;

  const TitleMap = {
    week: t(translatedTitle.week),
    month: t(translatedTitle.month),
    quarter: t(translatedTitle.quarter),
  } as const;

  const title = TitleMap[range as keyof typeof TitleMap];

  const getRange = () => {
    let start = dayjs();
    let end = dayjs();
    switch (range) {
      case "week":
        //-1 in case of checking weekly budget on sunday
        start = start.subtract(1, "day").startOf("week");
        break;
      case "month":
        start = start.startOf("month");
        break;
      case "quarter":
        start = start.subtract(3, "months");
        break;
      default:
        start = start.startOf("week");
        break;
    }
    if (dayjs(endDate).isBefore(end)) {
      end = dayjs(endDate);
    }
    return [start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")];
  };

  const [startRange, endRange] = getRange();

  const { data: session } = useSession();

  const { data: statistics, isLoading } = useQuery({
    queryKey: ["rangedStatistics", startRange, endRange, budget.id],
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
                id: "week",
                label: t(queryButtonLabels.week),
                callback: () => setRange("week"),
              },
              {
                id: "month",
                label: t(queryButtonLabels.month),
                callback: () => setRange("month"),
              },
              {
                id: "quarter",
                label: t(queryButtonLabels.quarter),
                callback: () => setRange("quarter"),
              },
            ]}
          />
          <CurrencyAmountStyled
            currencyOptions={currency}
            amount={statistics?.periodValue}
            hidePlus
          />
          <StyledTrendChip value={statistics?.trendValue} />
        </>
      )}
    </StatisticsWrapperStyled>
  );
};

export default BudgetStatistics;
