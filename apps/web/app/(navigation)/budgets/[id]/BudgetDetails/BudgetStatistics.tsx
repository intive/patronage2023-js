"use client";
import { type BudgetGeneralInfo } from "lib/types";
import React, { useState } from "react";
import QueryDropdown from "./QueryDropdown";
import { useQuery } from "@tanstack/react-query";
import { env } from "env.mjs";
import dayjs from "dayjs";
import { BudgetStatisticsSuspense } from "./BudgetSuspense";
import {
  CurrencyAmountStyled,
  StatisticsWrapperStyled,
  TitleStyled,
} from "./BudgetDetails.styled";
import { StyledTrendChip } from "./TrendChart.styled";
import { useTranslate } from "lib/hooks";
import useSuperfetch from "lib/hooks/useSuperfetch";

interface Props {
  budget: BudgetGeneralInfo;
}

const BudgetStatistics = ({ budget }: Props) => {
  const [range, setRange] = useState("week");
  const { id, currency, endDate, startDate } = budget;
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
    //if we are looking at old budget
    if (start.isAfter(endDate)) return [startDate, endDate];
    switch (range) {
      case "week":
        //-1 in case of checking weekly budget on sunday
        start = start.subtract(1, "day").startOf("week");
        end = end.endOf("week");
        break;
      case "month":
        start = start.startOf("month");
        end = start.endOf("month");
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

  const fetch = useSuperfetch();

  const { data: statistics, isLoading } = useQuery({
    queryKey: ["rangedStatistics", startRange, endRange],
    queryFn: async () => {
      return fetch(
        `${env.NEXT_PUBLIC_API_URL}budgets/${id}/statistics?startDate=${startRange}&endDate=${endRange}`
      ).catch((err) => console.error(err));
    },
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
                node: t(queryButtonLabels.week),
                callback: () => setRange("week"),
              },
              {
                id: "month",
                node: t(queryButtonLabels.month),
                callback: () => setRange("month"),
              },
              {
                id: "quarter",
                node: t(queryButtonLabels.quarter),
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
