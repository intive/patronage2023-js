"use client";

import styled from "styled-components";
import { Budget } from "lib/types";
import { InfoTile, BudgetIcon, CurrencyAmount, EditIcon } from "ui";
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

const StyledTitle = styled.span`
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

const TitleEditButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
//STYLING end

//TYPES
type BudgetBasicInfoProps = {
  budget: Budget;
  handleEditBudgetModalVisibility: {
    showEditBudgetModal: () => void;
    hideEditBudgetModal: () => void;
  };
};
//TYPES end

export function BudgetBasicInformation({
  budget,
  handleEditBudgetModalVisibility,
}: BudgetBasicInfoProps) {
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
            <TitleEditButton>
              <StyledTitle>{name}</StyledTitle>
              <EditIcon
                onClick={handleEditBudgetModalVisibility.showEditBudgetModal}
              />
            </TitleEditButton>

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
