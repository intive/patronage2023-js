import Skeleton from "react-loading-skeleton";
import {
  BasicInfoWrapper,
  StyledDescription,
  StyledTitle,
  TileWrapper,
  TopSectionWrapper,
} from "./BudgetBasicInformation.styled";
import { InfoTileStyled } from "ui/InfoTile";
import styled from "styled-components";
import {
  DetailsWrapperStyled,
  DetailsWrapperSuspense,
  StatisticsWrapperStyled,
  TotalWrapperStyled,
} from "./BudgetDetails.styled";

export const BudgetBasicInformationSuspense = () => {
  return (
    <BasicInfoWrapper>
      <TopSectionWrapper>
        <Skeleton circle height={40} width={40} />
        <div>
          <StyledTitle>
            <Skeleton height={25} width={150} />
          </StyledTitle>
          <StyledDescription>
            <Skeleton height={15} width={150} />
          </StyledDescription>
        </div>
      </TopSectionWrapper>
      <TileWrapper>
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
      </TileWrapper>
    </BasicInfoWrapper>
  );
};

const TotalDetailsSuspense = () => {
  return (
    <TotalWrapperStyled>
      <Skeleton height={10} width={100} />
      <Skeleton height={30} width={250} />
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
      <Skeleton height={100} />
      <BudgetStatisticsSuspenseMain />
    </DetailsWrapperStyled>
  );
};
