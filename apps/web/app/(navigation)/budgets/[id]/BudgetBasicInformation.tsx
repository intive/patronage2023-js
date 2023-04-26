"use client";

import { Budget } from "lib/types";
import { useState, useEffect } from "react";
import { InfoTile, BudgetIcon, CurrencyAmount } from "ui";
import { CurrencyAmountProps } from "ui/CurrencyAmount";
import { StyledAddInfoSpan } from "ui/InfoTile";
import styled from "styled-components";
import { useTranslate } from "lib/hooks";

//STYLING
const BasicInfoWrapper = styled.div`
  width: 100%;
  padding: 48px 0 0 48px;
  align-self: flex-start;
  justify-self: flex-start;
`;

const TopSectionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const TileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const BudgetIconStyled = styled(BudgetIcon)`
  height: 80px;
  width: 80px;
`;

const StyledTitle = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: 0px;
  text-align: left;
  color: ${({ theme }) => theme.main};
`;

const StyledDescription = styled.span`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: ${({ theme }) => theme.infoTile.label};
`;

const InfoTileAmount = styled(CurrencyAmount)<CurrencyAmountProps>`
  color: ${({ theme }) => theme.infoTile.value};
`;
//STYLING

//TYPES
type BudgetBasicInfoProps = {
  budgetId: string;
};
//TYPES

export function BudgetBasicInformation ( { budgetId } : BudgetBasicInfoProps) {
  const [budget, setBudget] = useState<Budget | null>(null);
  const { t, dict } = useTranslate("BudgetsPage");
  const { basicInformation } = dict;

  useEffect(() => {
    fetch("/budgets.json")
      .then((response) => response.json())
      .then((res) => setBudget(res.budgets.find((el: any) => el.id === budgetId) as Budget));
  }, [budgetId]);

  function convertTimestamp(timestamp: number){
    const date = new Date(timestamp);

    return date.toLocaleDateString(t(basicInformation.dateFormats), {day: 'numeric', month: 'short', year: '2-digit'})
  }

  //DATA for information tiles
  let dataRangeInfo, currencyInfo, limitInfo;
  if (budget) {
    dataRangeInfo = (
      <>
        {convertTimestamp(budget.startDate)} - {convertTimestamp(budget.endDate)}
      </>
    );
    currencyInfo = (
      <>
          <span>{budget.currency.tag}</span>
          <StyledAddInfoSpan>{t(basicInformation.currencyNames[budget.currency.tag as keyof typeof basicInformation.currencyNames])}</StyledAddInfoSpan>
      </>
    );
    limitInfo = (
      <InfoTileAmount amount={budget.limit} currencyOptions={budget.currency} hidePlus />
    );
  }
  //DATA for information tiles

  return (
    <>
      {!budget && <h1 style={{color: "lightgrey"}}>Loading...</h1>}
      {budget && (
        <BasicInfoWrapper>
          <TopSectionWrapper>
            <BudgetIconStyled icon={budget.icon}/>
            <div>
              <StyledTitle>{budget.name}</StyledTitle>
              <StyledDescription>{budget.description}</StyledDescription>
            </div>
          </TopSectionWrapper>
          <TileWrapper>
            <InfoTile label={t(basicInformation.labels.period)} dataToRender={dataRangeInfo} />
            <InfoTile label={t(basicInformation.labels.limit)} dataToRender={limitInfo} />
            <InfoTile label={t(basicInformation.labels.currency)} dataToRender={currencyInfo} />
          </TileWrapper>
        </BasicInfoWrapper>
      )}
    </>
  );
}


