"use client";

import { Budget } from "lib/types";
import { useState, useEffect } from "react";
import { InfoTile, Icon } from "ui";
import { StyledAddInfoSpan } from "ui/InfoTile";
import styled from "styled-components";

const currencyNames = {
  "USD": "United States Dollar",
  "GBP": "British Pound",
  "PLN": "Polish Zloty",
  "EUR": "Euro",
};

const currencySymbols = {
  "USD": "$",
  "GBP": "£",
  "PLN": "PLN",
  "EUR": "€",
}

//STYLING
const BasicInfoWrapper = styled.div`
  width: 100%;
  border: 1px solid red;
  padding: 48px;
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
//STYLING

//TYPES
type BudgetBasicInfoProps = {
  budgetId: string;
};
//TYPES

export function BudgetBasicInformation({ budgetId }: BudgetBasicInfoProps) {
  const [budget, setBudget] = useState<Budget | null>(null);

  useEffect(() => {
    fetch("/budgets.json")
      .then((response) => response.json())
      .then((res) => setBudget(res.budgets.find((el) => el.id === budgetId)));
  }, [budgetId]);

  //DATA for information tiles
  const currencyInfo = (
    <>
      {budget?.currency.tag}
      <StyledAddInfoSpan>{currencyNames[budget?.currency.tag]}</StyledAddInfoSpan>
    </>
  );
  const budgetLimit = <>{currencySymbols[budget?.currency.tag]} {budget?.limit}</>;
  //DATA for information tiles


  return (
    <>
      {budget && (
        <BasicInfoWrapper>
          <TopSectionWrapper>
            <IconWrapperStyled>
              <Icon icon={budget.icon} iconSize={40} color={({ theme }) => theme.main }/>
            </IconWrapperStyled>
            <div>
              <StyledTitle>{budget.name}</StyledTitle>
              <StyledDescription>{budget.description}</StyledDescription>
            </div>
          </TopSectionWrapper>
          <TileWrapper>
            <InfoTile label="Budget Period" dataToRender="1 Jan - 21 Jan" />
            <InfoTile label="Budget Limit" dataToRender={budgetLimit} />
            <InfoTile label="Budget Currency" dataToRender={currencyInfo} />
          </TileWrapper>
        </BasicInfoWrapper>
      )}
    </>
  );
}


