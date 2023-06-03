"use client";

import { useState } from "react";
import MultiCardLayout from "../MultiCardLayout";
import { useTranslate } from "lib/hooks";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import { TrendChip } from "ui";
import ReportsChart from "./ReportsChart";
import { ButtonGroup, Icon, CurrencySelect, ButtonGroupSimple } from "ui";

import {
  PageWrapper,
  TopWrapper,
  TitleStyled,
  StyledWrapper,
  ButtonWrapper,
  StyledTitle,
  StyledReportsBalanceWrapper,
  StyledCurrencyAmount,
  ChartButtonsWrapper
} from "./ReportsPage.styled";

export default function ReportsPage() {
  const { t, dict } = useTranslate("ReportsPage");
  const { title, aside, balance, currency } = dict;
  const [chart, setChart] = useState("line");
  const [period, setPeriod] = useState("12month");
  const [ reportsCurrency, setReportsCurrency ] = useState("USD");
  const { hasScrollbar } = useHasScrollBar();

  const mainCardContent = (
    <>
      <PageWrapper>
        <TopWrapper>
          <TitleStyled>{t(title)}</TitleStyled>
          <ButtonGroupSimple options={[
            {
              component: "7d",
              id: "7days",
              checked: period === "7days",
            },
            {
              component: "30d",
              id: "30days",
              checked: period === "30days",
            },
            {
              component: "6m",
              id: "6month",
              checked: period === "6month",
            },
            {
              component: "12m",
              id: "12month",
              checked: period === "12month",
            },
          ]}
          selectedOption={period}
          onOptionSelect={setPeriod}
        />
        </TopWrapper>
        
        <StyledWrapper>
          <StyledTitle>{t(balance)}</StyledTitle>
          <StyledReportsBalanceWrapper>
            <StyledCurrencyAmount
              amount={124054.96}
              currencyOptions={{ tag: "USD", locale: "en-US" }}
              hidePlus
            />
            <TrendChip value={20} />
          </StyledReportsBalanceWrapper>
        </StyledWrapper>
        <ButtonWrapper>
          <CurrencySelect
            value={reportsCurrency}
            label={t(currency)}
            hasScrollbar={hasScrollbar}
            onValueChange={(value) => {
              setReportsCurrency(value);
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
        <ReportsChart chart={chart} />
      </PageWrapper>
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
