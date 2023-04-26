"use client";

import { useState } from "react";
import styled, { css } from "styled-components";
import { Icon } from "ui";
import { RowsPerPageSelect } from "./RowsPerPageSelect";

export type PaginationStatusType = {
  rowsPerPage: number;
  currentPage: number;
};

type PaginationProps = {
  currentPage: number;
  currentPageSize: number;
  numberOfPages: number;
  pageSizeOptions: number[];
  onChangePaginationStatus: (status: PaginationStatusType) => void;
} & React.HTMLProps<HTMLDivElement>;

type NavigationButtonType = {
  isRight: boolean;
};

type SetPageButtonType = {
  isActive?: boolean;
};

const ContainerStyled = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 112px;
  padding: 32px 56px 40px 56px;
  flex-wrap: wrap;
  gap: 32px;
`;

const RowsPerPageContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const ButtonsListStyled = styled.div`
  display: flex;
  gap: 8px;
`;

const NavigationButtonStyled = styled.button<NavigationButtonType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.pagination.text};
  border: 2px solid ${({ theme }) => theme.pagination.border};
  border-radius: 4px;
  cursor: pointer;

  ${({ isRight }) =>
    isRight &&
    css`
      transform: rotate(180deg);
    `}

  &:hover {
    color: ${({ theme }) => theme.pagination.hover};
    border-color: ${({ theme }) => theme.pagination.hover};
    outline: none;
  }

  &:focus {
    color: ${({ theme }) => theme.pagination.hover};
    border-color: ${({ theme }) => theme.pagination.hover};
    outline: none;
  }

  &:disabled {
    color: ${({ theme }) => theme.pagination.border};
    border-color: ${({ theme }) => theme.pagination.border};
    cursor: not-allowed;
  }
`;

const SetPageButtonStyled = styled.button<SetPageButtonType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.pagination.active : theme.pagination.text};
  border: transparent;
  background: transparent;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;

  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.pagination.hover};
    outline: none;
  }

  &:disabled {
    border: none;
    outline: none;
    cursor: default;
  }
`;

export const Pagination = ({
  currentPage = 1,
  currentPageSize,
  numberOfPages,
  pageSizeOptions,
  onChangePaginationStatus,
}: PaginationProps) => {
  const [rowsValue, setRowsValue] = useState<string>(
    currentPageSize.toString()
  );

  const selectPage = (newPageNumber: number) => {
    onChangePaginationStatus({
      rowsPerPage: Number(rowsValue),
      currentPage: newPageNumber,
    });
  };

  const isNavigationForwardDisabled = currentPage >= numberOfPages;
  const isNavigationBackwardDisabled = currentPage === 1;

  return (
    <ContainerStyled>
      <RowsPerPageContainerStyled>
        {"Rows per page"}
        <RowsPerPageSelect
          value={rowsValue}
          id="rowsPerPage"
          label="rowsPerPage"
          onValueChange={(value) => {
            setRowsValue(value);
            onChangePaginationStatus({
              rowsPerPage: Number(value),
              currentPage,
            });
          }}
          pageSizeOptions={pageSizeOptions}
        />
      </RowsPerPageContainerStyled>
      <ButtonsListStyled>
        <NavigationButtonStyled
          isRight={false}
          disabled={isNavigationBackwardDisabled}>
          <Icon icon="navigate_before"></Icon>
        </NavigationButtonStyled>
        {/* <SetPageButtonStyled isActive={true}>1</SetPageButtonStyled> */}
        {/* <SetPageButtonStyled onClick={() => selectPage(3)}>
          2
        </SetPageButtonStyled>
        <SetPageButtonStyled>3</SetPageButtonStyled>
        <SetPageButtonStyled>4</SetPageButtonStyled>
        <SetPageButtonStyled>5</SetPageButtonStyled> */}
        {[...Array(numberOfPages)].map((_: undefined, i: number) => (
          <SetPageButtonStyled
            onClick={() => selectPage(i + 1)}
            key={i}
            isActive={i + 1 === currentPage}
            disabled={i + 1 === currentPage}>
            {i + 1}
          </SetPageButtonStyled>
        ))}
        <NavigationButtonStyled
          isRight={true}
          onClick={() => selectPage(currentPage + 1)}
          disabled={isNavigationForwardDisabled}>
          <Icon icon="navigate_before"></Icon>
        </NavigationButtonStyled>
      </ButtonsListStyled>
    </ContainerStyled>
  );
};
