"use client";

import { useTranslate } from "lib/hooks";
import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import { Icon } from "ui";
import {
  ContainerStyled,
  ListStyled,
  NavigationButtonStyled,
  RowsPerPageContainerStyled,
  SelectStyled,
  PaginationSelectItemStyled,
} from "./Pagination.styled";
import { PaginationElementsList } from "./PaginationElementsList";

type PaginationProps = {
  pageIndex: number;
  numberOfPages: number;
  pageSizeOptions: number[];
  currentPageSize: number;
  onChangePageSize: (newPageSize: number) => void;
  onChangePageIndex: (newPageIndex: number) => void;
} & React.HTMLProps<HTMLDivElement>;

export const Pagination = ({
  pageIndex = 0,
  numberOfPages,
  pageSizeOptions,
  currentPageSize,
  onChangePageSize,
  onChangePageIndex,
}: PaginationProps) => {
  const { t, dict } = useTranslate("Pagination");
  const { hasScrollbar } = useHasScrollBar();

  const isNavigationForwardDisabled = pageIndex === numberOfPages - 1;
  const isNavigationBackwardDisabled = pageIndex === 0;

  // Creates array of numbers from 0 to $numberOfPages
  const generatedPaginationNumbers = Array.from(
    { length: numberOfPages },
    (_, k) => k
  );

  const pageIndexOnChangeHandler = (newPageIndex: number) => {
    if (newPageIndex >= 0 && newPageIndex < numberOfPages) {
      onChangePageIndex(newPageIndex);
    }
  };

  const comboBoxOnChangeHandler = (newPageSize: string) => {
    onChangePageSize(Number(newPageSize));
  };

  return (
    <ContainerStyled>
      <RowsPerPageContainerStyled>
        {t(dict.rowsPerPageText)}
        <SelectStyled
          items={pageSizeOptions.map((option) => ({
            label: option,
            value: option.toString(),
          }))}
          onValueChange={comboBoxOnChangeHandler}
          hasIcon
          label=""
          hasScrollbar={hasScrollbar}
          value={currentPageSize.toString()}
          id="rows-per-page"
          sideOffset={2}
          SelectItem={PaginationSelectItemStyled}
        />
      </RowsPerPageContainerStyled>

      <nav role="navigation" aria-label={t(dict.navigationTableAriaLabel)}>
        <ListStyled>
          <li>
            <NavigationButtonStyled
              onClick={() => pageIndexOnChangeHandler(pageIndex - 1)}
              aria-disabled={isNavigationBackwardDisabled}
              disabled={isNavigationBackwardDisabled}
              aria-label={t(dict.previousPageAriaLabel)}>
              <Icon icon="navigate_before" />
            </NavigationButtonStyled>
          </li>
          <PaginationElementsList
            numberOfPages={numberOfPages}
            generatedPageNumbers={generatedPaginationNumbers}
            pageIndex={pageIndex}
            onPageIndexChange={pageIndexOnChangeHandler}
          />
          <li>
            <NavigationButtonStyled
              onClick={() => pageIndexOnChangeHandler(pageIndex + 1)}
              aria-disabled={isNavigationForwardDisabled}
              disabled={isNavigationForwardDisabled}
              aria-label={t(dict.nextPageAriaLabel)}>
              <Icon icon="navigate_next" />
            </NavigationButtonStyled>
          </li>
        </ListStyled>
      </nav>
    </ContainerStyled>
  );
};
