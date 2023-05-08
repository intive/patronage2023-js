"use client";

import styled from "styled-components";
import { Budget } from "lib/types";
import { InfoTile, BudgetIcon, CurrencyAmount } from "ui";
import { StyledAddInfoSpan } from "ui/InfoTile";
import { useTranslate } from "lib/hooks";
import { device } from "lib/media-queries";

//STYLING
const BasicInfoWrapper = styled.div`
  width: 100%;
`;

const TopSectionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
  ${device.tablet} {
    margin-bottom: 32px;
    align-items: center;
    gap: 16px;
  }
  
`;

const TileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const BudgetIconStyled = styled(BudgetIcon)`
  height: 40px;
  width: 40px;
  font-size: .9em;
  flex-shrink: 0;
  ${device.tablet} {
    height: 80px;
    width: 80px;
    font-size: 1.5em;
  }
`;

const StyledTitle = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 28px;
  color: ${({ theme }) => theme.main};
  ${device.tablet} {
    font-size: 32px;
    line-height: 48px;
  }
`;

const StyledDescription = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.infoTile.label};
  ${device.tablet} {
    font-size: 14px;
    line-height: 20px;
  }
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
  const { startDate, endDate, limit, currency, name, icon, description } =
    budget;
  const { tag } = currency;

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
      {convertTimestamp(startDate)} - {convertTimestamp(endDate)}
    </>
  );

  const limitInfo = (
    <InfoTileAmount amount={limit} currencyOptions={currency} hidePlus />
  );

  const currencyInfo = (
    <>
      <span>{tag}</span>
      <StyledAddInfoSpan>
        {t(
          basicInformation.currencyNames[
            tag as keyof typeof basicInformation.currencyNames
          ]
        )}
      </StyledAddInfoSpan>
    </>
  );
  //DATA for information tiles end

  return (
    <>
      <BasicInfoWrapper>
        <TopSectionWrapper>
          <BudgetIconStyled icon={icon} />
          <div>
            <StyledTitle>{name}</StyledTitle>
            <StyledDescription>{description}</StyledDescription>
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
