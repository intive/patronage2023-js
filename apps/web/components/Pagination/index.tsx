"use client";

import { useTranslate } from "lib/hooks";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Icon } from "ui";
import {
  ContainerStyled,
  PaginateContainerStyled,
  RowsPerPageContainerStyled,
} from "./Pagination.styled";
import { RowsPerPageSelect } from "./RowsPerPageSelect";

export type PaginationStateType = {
  rowsPerPage: number;
  currentPage: number;
};

type PaginationProps = {
  numberOfPages: number;
  pageSizeOptions: number[];
  onChangePaginationState: (status: PaginationStateType) => void;
} & React.HTMLProps<HTMLDivElement>;

export const Pagination = ({
  numberOfPages,
  pageSizeOptions,
  onChangePaginationState,
}: PaginationProps) => {
  const [rowsPerPageValue, setRowsPerPageValue] = useState(
    (pageSizeOptions[0] || "10").toString()
  );
  const [currentPageValue, setCurrentPageValue] = useState(0);
  const { t, dict } = useTranslate("Pagination");

  const handleButtonClick = ({ selected }: { selected: number }) => {
    onChangePaginationState({
      rowsPerPage: Number(rowsPerPageValue),
      currentPage: selected,
    });
    setCurrentPageValue(selected);
  };

  const handleComboBoxChange = (value: string) => {
    onChangePaginationState({
      rowsPerPage: Number(value),
      currentPage: currentPageValue,
    });
    setRowsPerPageValue(value);
  };

  const navPreviousIcon = <Icon icon="navigate_before" />;
  const navNextIcon = <Icon icon="navigate_next" />;

  return (
    <ContainerStyled>
      <RowsPerPageContainerStyled>
        {t(dict.rowsPerPageText)}
        <RowsPerPageSelect
          value={rowsPerPageValue}
          id="rows-per-page"
          label="select-rows-per-page"
          onValueChange={handleComboBoxChange}
          pageSizeOptions={pageSizeOptions}
        />
      </RowsPerPageContainerStyled>
      <PaginateContainerStyled>
        <ReactPaginate
          breakLabel="..."
          nextLabel={navNextIcon}
          onPageChange={handleButtonClick}
          pageRangeDisplayed={3}
          pageCount={numberOfPages}
          previousLabel={navPreviousIcon}
          renderOnZeroPageCount={null}
          breakClassName="break-me"
          containerClassName="pagination"
          activeClassName="active-item"
          pageClassName="item"
          pageLinkClassName="link"
          disabledClassName="disabled-buttons"
          previousClassName="next-previous-buttons"
          nextClassName="next-previous-buttons"
          previousLinkClassName="next-previous-links"
          nextLinkClassName="next-previous-links"
        />
      </PaginateContainerStyled>
    </ContainerStyled>
  );
};
