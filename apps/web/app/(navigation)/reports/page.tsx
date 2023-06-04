"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/pl";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { languageAtom } from "store";
import { env } from "env.mjs";
import MultiCardLayout from "../MultiCardLayout";
import useSuperfetch from "lib/hooks/useSuperfetch";
import { useTranslate } from "lib/hooks";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import { TrendChip } from "ui";
import ReportsChart from "./ReportsChart";
import { ButtonGroup, Icon, CurrencySelect, ButtonGroupSimple, Spinner } from "ui";

import {
  PageWrapper,
  TopWrapper,
  TitleStyled,
  StyledWrapper,
  ButtonWrapper,
  StyledTitle,
  StyledReportsBalanceWrapper,
  StyledCurrencyAmount,
  ChartButtonsWrapper,
  StyledInfo
} from "./ReportsPage.styled";

const currencyMap = {
  PLN: {
    tag: "PLN",
    locale: "pl-PL",
  },
  USD: {
    tag: "USD",
    locale: "en-US",
  },
  EURO: {
    tag: "EURO",
    locale: "en-US",
  },
};

export default function ReportsPage() {
  const { t, dict } = useTranslate("ReportsPage");
  const { title, aside, balance, currency } = dict;
  const [chart, setChart] = useState("line");
  const [timeRange, setTimeRange] = useState("12month");
  const [reportsCurrency, setReportsCurrency] = useState("USD");
  const { hasScrollbar } = useHasScrollBar();
  const [language] = useAtom(languageAtom);

  useEffect(() => {
    dayjs.locale(language);
  }, [language]);

  const getDateRange = (timeRange: string) => {
    let endDate = dayjs(); // Current date as the end date
    let startDate;

    switch (timeRange) {
      case "12month":
        startDate = endDate.subtract(12, "month").startOf("month");
        break;
      case "6month":
        startDate = endDate.subtract(6, "month").startOf("month");
        break;
      case "30days":
        startDate = endDate.subtract(30, "day");
        break;
      case "7days":
        startDate = endDate.subtract(7, "day");
        break;
      default:
        // Set a default time range
        startDate = endDate.subtract(12, "month");
    }

    return {
      start: startDate.format("YYYY-MM-DD"),
      end: endDate.format("YYYY-MM-DD"),
    };
  };

  const { start, end } = getDateRange(timeRange);

  const fetch = useSuperfetch();

  const { data: statistics, isLoading } = useQuery({
    queryKey: ["GET:budgets/statistics", start, end, reportsCurrency, language],
    queryFn: async () => {
      return fetch(
        `${env.NEXT_PUBLIC_API_URL}budgets/statistics?startDate=${start}&endDate=${end}&currency=${reportsCurrency}`
      ).catch((err) => console.error(err));
    },
  });

  let isData;
  let transactions;

  if (statistics && statistics.incomes != null && statistics.expenses != null) {
    isData = statistics.incomes || statistics.expenses;

    if (timeRange === "12month" || timeRange === "6month") {
      transactions = [...statistics.incomes, ...statistics.expenses].reduce(
        (acc, transaction) => {
          const date = dayjs(transaction.datePoint);
          const yearMonth = date.format("MMMYY");
          const { value } = transaction;

          if (!acc[yearMonth]) {
            // If the month is not yet in the accumulator, initialize it with zero income and expense
            acc[yearMonth] = { incomes: 0, expenses: 0 };
          }

          if (statistics.incomes.includes(transaction)) {
            // If it's an income transaction, add the value to the incomes total
            acc[yearMonth].incomes += value;
          } else {
            // If it's an expense transaction, add the value to the expenses total
            acc[yearMonth].expenses += value;
          }

          return acc;
        },
        {}
      );
    } else if (timeRange === "30days" || timeRange === "7days") {
      transactions = [...statistics.incomes, ...statistics.expenses]
        .sort(
          (a, b) => dayjs(a.datePoint).valueOf() - dayjs(b.datePoint).valueOf()
        )
        .reduce((acc, transaction) => {
          const date = dayjs(transaction.datePoint);
          const day = date.format("DD-MM");
          const { value } = transaction;

          // If the day is not yet in the accumulator, initialize it with zero income and expense
          if (!acc[day]) {
            acc[day] = { expenses: 0, incomes: 0 };
          }

          if (statistics.incomes.includes(transaction)) {
            // If it's an income transaction, add the value to the incomes total
            acc[day].incomes += value;
          } else {
            // If it's an expense transaction, add the value to the expenses total
            acc[day].expenses += value;
          }

          return acc;
        }, {});
    }
  }

  console.log(statistics);

  const mainCardContent = (
    <>
      {isLoading && <Spinner />}
      {statistics && <PageWrapper>
        <TopWrapper>
          <TitleStyled>{t(title)}</TitleStyled>
          <ButtonGroupSimple
            options={[
              {
                component: "7d",
                id: "7days",
                checked: timeRange === "7days",
              },
              {
                component: "30d",
                id: "30days",
                checked: timeRange === "30days",
              },
              {
                component: "6m",
                id: "6month",
                checked: timeRange === "6month",
              },
              {
                component: "12m",
                id: "12month",
                checked: timeRange === "12month",
              },
            ]}
            selectedOption={timeRange}
            onOptionSelect={setTimeRange}
          />
        </TopWrapper>
        <StyledWrapper>
          {isData ? (
            <>
              <StyledTitle>{t(balance)}</StyledTitle>
              <StyledReportsBalanceWrapper>
                <StyledCurrencyAmount
                  amount={statistics.totalBalance}
                  currencyOptions={
                    currencyMap[reportsCurrency as keyof typeof currencyMap]
                  }
                  hidePlus
                />
                <TrendChip value={20} />
              </StyledReportsBalanceWrapper>
            </>
          ) : (
            <StyledReportsBalanceWrapper>
              <StyledInfo>{reportsCurrency}: brak budżetów</StyledInfo>
            </StyledReportsBalanceWrapper>
          )}
        </StyledWrapper>
        <ButtonWrapper>
          <CurrencySelect
            value={reportsCurrency}
            label={t(currency)}
            hasScrollbar={hasScrollbar}
            onValueChange={(value) => {
              setReportsCurrency(value);
              setTimeRange("12month");
            }}
          />
          <ChartButtonsWrapper>
            <ButtonGroup
              options={[
                {
                  component: <Icon icon="area_chart" />,
                  id: "area_chart",
                  onSelect: () => {
                    setChart("line");
                  },
                  defaultChecked: chart === "line",
                },
                {
                  component: <Icon icon="bar_chart" />,
                  id: "bar_chart",
                  onSelect: () => {
                    setChart("bar");
                  },
                  defaultChecked: chart === "bar",
                },
              ]}
              secondary
            />
          </ChartButtonsWrapper>
        </ButtonWrapper>
        {isData && <ReportsChart chart={chart} transactions={transactions} />}
      </PageWrapper>
}
    </>
  );
  const data = t(aside.title);
  const shown = true;
  //conditionally render aside if needed e.g. pass user info to it etc.
  return (
    <MultiCardLayout
      main={mainCardContent}
      aside={shown ? <>{data}</> : <></>}
    />
  );
}
