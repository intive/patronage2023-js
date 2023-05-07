"use client";

import { Budget } from "lib/types";
import { InfoTile, SkeletonLoading } from "ui";
import { InfoTileStyled, StyledAddInfoSpan } from "ui/InfoTile";
import { useTranslate } from "lib/hooks";
import {
  BasicInfoWrapper,
  BudgetIconStyled,
  InfoTileAmount,
  StyledDescription,
  StyledTitle,
  TileWrapper,
  TopSectionWrapper,
} from "./BudgetBasicInformation.styled";
import { iconNames } from "lib/iconValidation";
//TYPES
type BudgetBasicInfoProps = {
  budget: Budget;
};
//TYPES end

export function BudgetBasicInformation({ budget }: BudgetBasicInfoProps) {
  const { t, dict } = useTranslate("BudgetsPage");

  if (!budget) {
    return <BudgetBasicInformationSuspense />;
  }

  const { basicInformation } = dict;
  const { startDate, endDate, limit, currency, description, icon, name } =
    budget;

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
      {convertTimestamp(budget.startDate)} - {convertTimestamp(budget.endDate)}
    </>
  );

  const limitInfo = (
    <InfoTileAmount amount={limit} currency={currency} hidePlus />
  );

  const currencyInfo = (
    <>
      <span>{currency}</span>
      <StyledAddInfoSpan>
        {t(
          basicInformation.currencyNames[
            currency as keyof typeof basicInformation.currencyNames
          ]
        )}
      </StyledAddInfoSpan>
    </>
  );
  //DATA for information tiles end

  return (
    <BasicInfoWrapper>
      <TopSectionWrapper>
        <BudgetIconStyled icon={icon in iconNames ? icon : "notifications"} />
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
  );
}

const BudgetBasicInformationSuspense = () => {
  return (
    <BasicInfoWrapper>
      <TopSectionWrapper>
        <SkeletonLoading circle height={80} width={80} />
        <div>
          <StyledTitle>
            <SkeletonLoading height={25} width={150} />
          </StyledTitle>
          <StyledDescription>
            <SkeletonLoading height={15} width={150} />
          </StyledDescription>
        </div>
      </TopSectionWrapper>
      <TileWrapper>
        <InfoTileStyled>
          <SkeletonLoading height={10} width={100} />
          <SkeletonLoading height={20} width={150} />
        </InfoTileStyled>

        <InfoTileStyled>
          <SkeletonLoading height={10} width={50} />
          <SkeletonLoading height={20} width={75} />
        </InfoTileStyled>

        <InfoTileStyled>
          <SkeletonLoading height={10} width={50} />
          <SkeletonLoading height={20} width={75} />
        </InfoTileStyled>
      </TileWrapper>
    </BasicInfoWrapper>
  );
};
