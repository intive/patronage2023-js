"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { BudgetFixed } from "lib/types";
import { useTranslate } from "lib/hooks";
import { iconNames } from "lib/iconValidation";
import {
  TopWrapperStyled,
  BasicBudgetInfoWrapper,
  BudgetIconStyled,
  BudgetNameWrapperStyled,
  BudgetNameIconsWrapperStyled,
  BudgetNameStyled,
  BudgetDescriptionStyled,
  InfoTileAmount,
  InfoTileWrapperStyled,
  // TitleEditButton,
} from "./BudgetBasicInformation.styled";
import { EditBudget } from "app/(navigation)/EditBudget";
import { RemoveBudget } from "./RemoveBudget";
import PeopleInBudget from "./PeopleInBudget";
import { NavBudgetIcon, InfoTile } from "ui";
import { StyledAddInfoSpan } from "ui/InfoTile";
//TYPES
type BudgetBasicInfoProps = {
  budget: BudgetFixed;
};
//TYPES end

export function BudgetBasicInformation({ budget }: BudgetBasicInfoProps) {
  const { t, dict } = useTranslate("BudgetsPage");
  const { data: session } = useSession();

  const loggedUserId = session?.user.id;
  const peopleWithoutLoggedUser = budget.budgetUsers.filter(
    (user) => user.id !== loggedUserId
  );

  const { basicInformation } = dict;
  const { startDate, endDate, limit, currency, description, icon, name } =
    budget;
  //DATE formatting
  function convertDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString(t(basicInformation.dateFormats), {
      day: "numeric",
      month: "short",
      year: "2-digit",
    });
  }

  //DATA to display for information tiles
  const dataRangeInfo = (
    <>
      {convertDate(startDate)} - {convertDate(endDate)}
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

  const [isEditBudgetModalOpen, setIsEditBudgetModalOpen] = useState(false);

  const openModal = () => {
    setIsEditBudgetModalOpen(true);
  };

  const closeModal = () => {
    setIsEditBudgetModalOpen(false);
  };

  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);

  return (
    <>
      <TopWrapperStyled>
        <BasicBudgetInfoWrapper>
          <BudgetIconStyled
            icon={iconNames.includes(icon) ? icon : "notifications"}
          />
          <BudgetNameWrapperStyled>
            <BudgetNameIconsWrapperStyled>
              <BudgetNameStyled>{name}</BudgetNameStyled>
              <NavBudgetIcon onClick={() => openModal()} icon={"edit"} />
              <NavBudgetIcon onClick={() => {}} icon={"favorite"} />
              <NavBudgetIcon
                onClick={() => setDeleteModalVisibility(true)}
                icon={"delete"}
              />
            </BudgetNameIconsWrapperStyled>
            <BudgetDescriptionStyled>{description}</BudgetDescriptionStyled>
          </BudgetNameWrapperStyled>
        </BasicBudgetInfoWrapper>
        <PeopleInBudget users={peopleWithoutLoggedUser} />
      </TopWrapperStyled>

      <InfoTileWrapperStyled>
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
      </InfoTileWrapperStyled>

      {isEditBudgetModalOpen && (
        <EditBudget budget={budget} onClose={() => closeModal()} />
      )}
      {deleteModalVisibility && (
        <RemoveBudget
          budget={budget}
          onClose={() => setDeleteModalVisibility(false)}
        />
      )}
    </>
  );
}
