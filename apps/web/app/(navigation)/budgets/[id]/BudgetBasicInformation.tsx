"use client";

import styled from "styled-components";
import { Budget } from "lib/types";
import { InfoTile, BudgetIcon, CurrencyAmount, SkeletonLoading } from "ui";
import { StyledAddInfoSpan } from "ui/InfoTile";
import { useTranslate } from "lib/hooks";
//STYLING
const BasicInfoWrapper = styled.div`
  width: 100%;
`;

const TopSectionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const TileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const BudgetIconStyled = styled(BudgetIcon)`
  height: 80px;
  width: 80px;
  font-size: 1.5em;
`;

const StyledTitle = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  color: ${({ theme }) => theme.main};
`;

const StyledDescription = styled.span`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  color: ${({ theme }) => theme.infoTile.label};
`;

const InfoTileAmount = styled(CurrencyAmount)`
  color: ${({ theme }) => theme.infoTile.value};
`;
//STYLING end

//TYPES
type BudgetBasicInfoProps = {
  budget: Budget;
};
//TYPES end

export function BudgetBasicInformation({ budget }: BudgetBasicInfoProps) {
  const { t, dict } = useTranslate("BudgetsPage");
  const { basicInformation } = dict;

  //DATE formatting
  function convertTimestamp(timestamp: number) {
    const date = new Date(timestamp);

    return date.toLocaleDateString(t(basicInformation.dateFormats), {
      day: "numeric",
      month: "short",
      year: "2-digit",
    });
  }

  //DATA to display for information tiles
  const dataRangeInfo = (
    <>
      {budget ? (
        <>
          {convertTimestamp(budget.startDate)} -{" "}
          {convertTimestamp(budget.endDate)}
        </>
      ) : (
        <SkeletonLoading width={150} />
      )}
    </>
  );

  const limitInfo = (
    <>
      {budget ? (
        <InfoTileAmount
          amount={budget.limit}
          currency={budget.currency}
          hidePlus
        />
      ) : (
        <SkeletonLoading width={75} />
      )}
    </>
  );

  const currencyInfo = (
    <>
      {budget ? (
        <>
          <span>{budget.currency}</span>
          <StyledAddInfoSpan>
            {t(
              basicInformation.currencyNames[
                budget.currency as keyof typeof basicInformation.currencyNames
              ]
            )}
          </StyledAddInfoSpan>
        </>
      ) : (
        <SkeletonLoading width={75} />
      )}
    </>
  );
  //DATA for information tiles end

  return (
    <>
      <BasicInfoWrapper>
        <TopSectionWrapper>
          {budget ? (
            <BudgetIconStyled icon={budget.icon} />
          ) : (
            <SkeletonLoading circle={true} height={80} width={80} />
          )}
          <div>
            <StyledTitle>
              {budget ? (
                budget.name
              ) : (
                <SkeletonLoading width={150} height={25} />
              )}
            </StyledTitle>
            <StyledDescription>
              {budget ? (
                budget.description
              ) : (
                <SkeletonLoading width={150} height={10} />
              )}
            </StyledDescription>
          </div>
        </TopSectionWrapper>
        <TileWrapper>
          <InfoTile
            label={t(basicInformation.labels.period)}
            dataToRender={dataRangeInfo}
          />
          <InfoTile
            label={t(basicInformation.labels.limit)}
            dataToRender={limitInfo}
          />
          <InfoTile
            label={t(basicInformation.labels.currency)}
            dataToRender={currencyInfo}
          />
        </TileWrapper>
      </BasicInfoWrapper>
    </>
  );
}
