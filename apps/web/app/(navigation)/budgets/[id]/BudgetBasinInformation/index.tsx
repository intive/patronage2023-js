"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { BudgetFixed } from "lib/types";
import { useTranslate } from "lib/hooks";
import validate from "lib/validations/iconValidation";
import {
  TopWrapperStyled,
  BasicBudgetInfoWrapperStyled,
  BudgetIconStyled,
  BudgetNameWrapperStyled,
  BudgetNameIconsWrapperStyled,
  NavBudgetIconStyled,
  FavouriteStyled,
  FavouriteDropdownStyled,
  NavBudgetIconDropdownStyled,
  DropdownMenuStyled,
  BudgetNameStyled,
  BudgetDescriptionStyled,
  InfoTileAmountStyled,
  InfoTileWrapperStyled,
} from "./BudgetBasicInformation.styled";
import { EditBudget } from "./EditBudget";
import { RemoveBudget } from "./RemoveBudget";
import PeopleInBudget from "./PeopleInBudget";
import { InfoTile } from "ui";
import { StyledAddInfoSpan } from "ui/InfoTile";
import { ShareBudget } from "./ShareBudget";
//TYPES
type BudgetBasicInfoProps = {
  budget: BudgetFixed;
};
//TYPES end

export function BudgetBasicInformation({ budget }: BudgetBasicInfoProps) {
  const { t, dict } = useTranslate("BudgetsPage");
  const { data: session } = useSession();

  const loggedUserId = session?.user.id;
  const peopleWithoutLoggedUser = budget.budgetUsers?.filter(
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
    <InfoTileAmountStyled amount={limit} currencyOptions={currency} hidePlus />
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

  const openEditModal = () => {
    setIsEditBudgetModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditBudgetModalOpen(false);
  };

  const [isShareBudgetModalOpen, setIsShareBudgetModalOpen] = useState(false);

  const openShareModal = () => {
    setIsShareBudgetModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareBudgetModalOpen(false);
  };

  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);

  return (
    <>
      <TopWrapperStyled>
        <BasicBudgetInfoWrapperStyled>
          <BudgetIconStyled icon={validate(icon) ? icon : "notifications"} />
          <BudgetNameWrapperStyled>
            <BudgetNameIconsWrapperStyled>
              <BudgetNameStyled>{name}</BudgetNameStyled>
              <FavouriteStyled
                isFav={budget.isFavourite}
                budgetId={budget.id}
                isOwner={loggedUserId === budget.userId}
              />
              {loggedUserId === budget.userId && (
                <>
                  <NavBudgetIconStyled onClick={openEditModal} icon="edit" />
                  <NavBudgetIconStyled icon="share" onClick={openShareModal} />
                  <NavBudgetIconStyled
                    onClick={() => setDeleteModalVisibility(true)}
                    icon="delete"
                  />
                </>
              )}
              {loggedUserId === budget.userId && (
                <DropdownMenuStyled
                  icon="more_vert"
                  items={[
                    {
                      ComponentToRender: (
                        <FavouriteDropdownStyled
                          isFav={budget.isFavourite}
                          budgetId={budget.id}
                        />
                      ),
                      id: "favourite",
                    },
                    {
                      ComponentToRender: (
                        <NavBudgetIconDropdownStyled
                          onClick={openEditModal}
                          icon="edit"
                        />
                      ),
                      id: "edit",
                    },
                    {
                      ComponentToRender: (
                        <NavBudgetIconDropdownStyled
                          onClick={openShareModal}
                          icon="share"
                        />
                      ),
                      id: "share",
                    },
                    {
                      ComponentToRender: (
                        <NavBudgetIconDropdownStyled
                          onClick={() => setDeleteModalVisibility(true)}
                          icon="delete"
                        />
                      ),
                      id: "delete",
                    },
                  ]}
                  side="bottom"
                  ariaLabel={t(basicInformation.labels.dropdownMenuAriaLabel)}
                />
              )}
            </BudgetNameIconsWrapperStyled>
            <BudgetDescriptionStyled>{description}</BudgetDescriptionStyled>
          </BudgetNameWrapperStyled>
        </BasicBudgetInfoWrapperStyled>
        <PeopleInBudget users={peopleWithoutLoggedUser || []} />
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
        <EditBudget budget={budget} onClose={() => closeEditModal()} />
      )}
      {isShareBudgetModalOpen && (
        <ShareBudget budget={budget} onClose={() => closeShareModal()} /> // budget={budget} onClose={() => closeEditModal()} />
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
