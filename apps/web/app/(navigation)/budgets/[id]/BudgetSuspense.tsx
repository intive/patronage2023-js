import Skeleton from "react-loading-skeleton";
import {
  TopWrapperStyled,
  BasicBudgetInfoWrapperStyled,
  BudgetIconStyled,
  BudgetNameWrapperStyled,
  BudgetDescriptionStyled,
  BudgetNameStyled,
  InfoTileWrapperStyled,
} from "./BudgetBasicInformation.styled";
import { InfoTileStyled } from "ui/InfoTile";
import {
  DetailsWrapperStyled,
  DetailsWrapperSuspense,
  StatisticsWrapperStyled,
  SuspensedChart,
  TotalWrapperStyled,
} from "./BudgetDetails.styled";

export const BudgetBasicInformationSuspense = () => {
  return (
    <>
      <TopWrapperStyled>
        <BasicBudgetInfoWrapperStyled>
          <BudgetIconStyled>
            <Skeleton circle height={40} width={40} />
          </BudgetIconStyled>
          <BudgetNameWrapperStyled>
            <BudgetNameStyled>
              <Skeleton height={25} width={150} />
            </BudgetNameStyled>
            <BudgetDescriptionStyled>
              <Skeleton height={15} width={150} />
            </BudgetDescriptionStyled>
          </BudgetNameWrapperStyled>
        </BasicBudgetInfoWrapperStyled>
      </TopWrapperStyled>
      <InfoTileWrapperStyled>
        <InfoTileStyled>
          <Skeleton height={10} width={100} />
          <Skeleton height={20} width={150} />
        </InfoTileStyled>
        <InfoTileStyled>
          <Skeleton height={10} width={50} />
          <Skeleton height={20} width={75} />
        </InfoTileStyled>
        <InfoTileStyled>
          <Skeleton height={10} width={50} />
          <Skeleton height={20} width={75} />
        </InfoTileStyled>
      </InfoTileWrapperStyled>
    </>
  );
};

const TotalDetailsSuspense = () => {
  return (
    <TotalWrapperStyled>
      <Skeleton height={10} width={100} />
      <Skeleton height={30} width={150} />
      <Skeleton height={20} width={50} />
    </TotalWrapperStyled>
  );
};

export const BudgetStatisticsSuspense = () => {
  return (
    <DetailsWrapperSuspense>
      <Skeleton height={10} width={100} />
      <Skeleton height={30} width={150} />
      <Skeleton height={20} width={50} />
    </DetailsWrapperSuspense>
  );
};

const BudgetStatisticsSuspenseMain = () => {
  return (
    <StatisticsWrapperStyled>
      <Skeleton height={10} width={100} />
      <Skeleton height={30} width={150} />
      <Skeleton height={20} width={50} />
    </StatisticsWrapperStyled>
  );
};

export const BudgetDetailsSuspense = () => {
  return (
    <DetailsWrapperStyled>
      <TotalDetailsSuspense />
      <SuspensedChart>
        <Skeleton height={100} />
      </SuspensedChart>
      <BudgetStatisticsSuspenseMain />
    </DetailsWrapperStyled>
  );
};
