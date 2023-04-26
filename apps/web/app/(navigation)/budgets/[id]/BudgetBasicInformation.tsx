"use client";

import { Budget } from "lib/types";
import { useState, useEffect } from "react";
import { InfoTile, Icon, CurrencyAmount } from "ui";
import { CurrencyAmountProps } from "ui/CurrencyAmount";
import { StyledAddInfoSpan } from "ui/InfoTile";
import styled from "styled-components";
import { useTranslate } from "lib/hooks";

const currencyNames:  Record<string, string>  = {
  "USD": "United States Dollar",
  "GBP": "British Pound",
  "PLN": "Polish Zloty",
  "EUR": "Euro",
};

//STYLING
const BasicInfoWrapper = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  //remove padding as it's Card's job to add it
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

const IconWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.iconPicker.background};
  //throw out before merging my monitor is not able to show "theme.iconPicker.background"
  border: 1px solid red;
  color: ${({ theme }) => theme.iconPicker.main};
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

  let dataRangeInfo, currencyInfo, limitInfo;

  function convertTimestamp(timestamp: number){
    const date = new Date(timestamp);

    return date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: '2-digit'})
  }

  //DATA for information tiles
  if (budget) {
    dataRangeInfo = (
      <>
        {convertTimestamp(budget.startDate)} - {convertTimestamp(budget.endDate)}
      </>
    );
    currencyInfo = (
      <>
          <span>{budget?.currency.tag}</span>
          <StyledAddInfoSpan>{t(basicInformation.currencyNames[budget?.currency.tag])}</StyledAddInfoSpan>
      </>
    );
    limitInfo = (
      <InfoTileAmount amount={budget?.limit} currencyOptions={budget?.currency} hidePlus />
    );
  }
  //DATA for information tiles

  return (
    <>
      {!budget && <h1 style={{color: "lightgrey"}}>Loading...</h1>}
      {budget && (
        <BasicInfoWrapper>
          <TopSectionWrapper>
            <IconWrapperStyled>
              <Icon icon={budget.icon} iconSize={40}/>
            </IconWrapperStyled>
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


