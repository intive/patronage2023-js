"use client";

import { BudgetFixed } from "lib/types";
import { InfoTile } from "ui";
import { StyledAddInfoSpan } from "ui/InfoTile";
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
import { useState } from "react";
import { RemoveBudget } from "./RemoveBudget";
//TYPES
type BudgetBasicInfoProps = {
  budget: BudgetFixed;
};
//TYPES end

export function BudgetBasicInformation({ budget }: BudgetBasicInfoProps) {
  const { t, dict } = useTranslate("BudgetsPage");

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
      {convertTimestamp(startDate)} - {convertTimestamp(endDate)}
    </>
  );

  const limitInfo = (
    <InfoTileAmount amount={limit} currencyOptions={currency} hidePlus />
  );

  const currencyInfo = (
    <>
      <span>{currency.tag}</span>
      <StyledAddInfoSpan>
        {t(
          basicInformation.currencyNames[
            currency.tag as keyof typeof basicInformation.currencyNames
          ]
        )}
      </StyledAddInfoSpan>
    </>
  );
  //DATA for information tiles end

  const [deleteModalVisibility, setDeleteModalVisibility] =
    useState<boolean>(false);

  return (
    <BasicInfoWrapper>
      <TopSectionWrapper>
        <BudgetIconStyled
          icon={iconNames.includes(icon) ? icon : "notifications"}
        />
        <div>
          <StyledTitle>{name}</StyledTitle>
          <StyledDescription>{description}</StyledDescription>
        </div>
        <button onClick={() => setDeleteModalVisibility(true)}>Delete</button>
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
      {deleteModalVisibility && (
        <RemoveBudget
          budget={budget}
          onClose={() => setDeleteModalVisibility(false)}
        />
      )}
    </BasicInfoWrapper>
  );
}
