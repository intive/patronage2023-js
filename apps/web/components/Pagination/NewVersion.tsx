"use client";

import { useTranslate } from "lib/hooks";
import { useState } from "react";
import { Icon } from "ui";
import {
  ContainerStyled,
  ListStyled,
  NavigationButtonStyled,
  RowsPerPageContainerStyled,
} from "./NewVersion.styled";
import { PaginationElementsList } from "./PaginationElementsList";
import { PaginationElementsListFourth } from "./PaginationElementsListFourth";
import { PaginationElementsListSecond } from "./PaginationElementsListSecond";
import { PaginationElementsListThird } from "./PaginationElementsListThird";
import { RowsPerPageSelect } from "./RowsPerPageSelect";

export type PaginationStateType = {
  rowsPerPage: number;
  currentPage: number;
};

type PaginationProps = {
  currentPage: number;
  numberOfPages: number;
  pageSizeOptions: number[];
  onChangePaginationState: (status: PaginationStateType) => void; // Function for lifting pagination state up
  tempVersionNumber: number;
} & React.HTMLProps<HTMLDivElement>;

export const PaginationTwo = ({
  currentPage = 0,
  numberOfPages,
  onChangePaginationState,
  pageSizeOptions,
  tempVersionNumber,
}: PaginationProps) => {
  const [rowsPerPage, setRowsPerPage] = useState(
    (pageSizeOptions[0] || "10").toString()
  );
  const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);

  const { t, dict } = useTranslate("Pagination");
  const nextPageAriaLabel = t(dict.next);
  const previousPageAriaLabel = t(dict.previous);

  // Creates array of numbers from 0 to $numberOfPages
  const generatedPaginationNumbers = Array.from(
    { length: numberOfPages },
    (_, k) => k
  );

  const currentPageUpdateHandler = (newPageNumber: number) => {
    if (newPageNumber >= 0 && newPageNumber < numberOfPages) {
      onChangePaginationState({
        rowsPerPage: Number(rowsPerPage),
        currentPage: newPageNumber,
      });
      setCurrentPageNumber(newPageNumber);
    }
  };

  const comboBoxOnChangeHandler = (newRowsNumber: string) => {
    onChangePaginationState({
      rowsPerPage: Number(newRowsNumber),
      currentPage: currentPageNumber,
    });
    setRowsPerPage(newRowsNumber);
    setCurrentPageNumber(0);
  };

  const isNavigationForwardDisabled = currentPageNumber === numberOfPages - 1;
  const isNavigationBackwardDisabled = currentPageNumber === 0;

  return (
    <ContainerStyled>
      <RowsPerPageContainerStyled>
        {t(dict.rowsPerPageText)}
        <RowsPerPageSelect
          value={rowsPerPage}
          id="rows-per-page"
          label="select-rows-per-page"
          onValueChange={comboBoxOnChangeHandler}
          pageSizeOptions={pageSizeOptions}
        />
      </RowsPerPageContainerStyled>

      <nav role="navigation" aria-label="Table navigation">
        <ListStyled>
          <li>
            <NavigationButtonStyled
              onClick={() => currentPageUpdateHandler(currentPageNumber - 1)}
              aria-disabled={isNavigationBackwardDisabled}
              disabled={isNavigationBackwardDisabled}
              aria-label={previousPageAriaLabel}>
              <Icon icon="navigate_before" />
            </NavigationButtonStyled>
          </li>

          {tempVersionNumber === 1 && (
            <PaginationElementsList
              numberOfPages={numberOfPages}
              generatedNumbers={generatedPaginationNumbers}
              currentPage={currentPageNumber}
              onCurrentPageUpdate={currentPageUpdateHandler}
            />
          )}

          {tempVersionNumber === 2 && (
            <PaginationElementsListSecond
              numberOfPages={numberOfPages}
              generatedNumbers={generatedPaginationNumbers}
              currentPage={currentPageNumber}
              onCurrentPageUpdate={currentPageUpdateHandler}
            />
          )}

          {tempVersionNumber === 3 && (
            <PaginationElementsListThird
              numberOfPages={numberOfPages}
              generatedNumbers={generatedPaginationNumbers}
              currentPage={currentPageNumber}
              onCurrentPageUpdate={currentPageUpdateHandler}
            />
          )}

          {tempVersionNumber === 4 && (
            <PaginationElementsListFourth
              numberOfPages={numberOfPages}
              generatedNumbers={generatedPaginationNumbers}
              currentPage={currentPageNumber}
              onCurrentPageUpdate={currentPageUpdateHandler}
            />
          )}

          <li>
            <NavigationButtonStyled
              onClick={() => currentPageUpdateHandler(currentPageNumber + 1)}
              aria-disabled={isNavigationForwardDisabled}
              disabled={isNavigationForwardDisabled}
              aria-label={nextPageAriaLabel}>
              <Icon icon="navigate_next" />
            </NavigationButtonStyled>
          </li>
        </ListStyled>
      </nav>
    </ContainerStyled>
  );
};
