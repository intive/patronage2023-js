"use client";
import { useTranslate } from "lib/hooks";
import { useEffect, useState } from "react";
import { InputStyled, SetPageButtonStyled } from "./NewVersion.styled";

type PaginationElementsListProps = {
  numberOfPages: number;
  generatedNumbers: number[];
  currentPage: number;
  onCurrentPageUpdate: (value: number) => void;
};

export const PaginationElementsListFourth = ({
  numberOfPages,
  generatedNumbers,
  currentPage,
  onCurrentPageUpdate,
}: PaginationElementsListProps) => {
  const [inputValue, setInputValue] = useState("...");
  const [newPage, setNewPage] = useState(0);
  const { t, dict } = useTranslate("Pagination");

  useEffect(() => {
    setInputValue(newPage === 0 ? "..." : newPage.toString());
    const timeOutId = setTimeout(() => {
      onChangeInputHandler(newPage);
    }, 350);
    return () => clearTimeout(timeOutId);
  }, [newPage]);

  const ariaLabelContent = (pageNumber: number) => {
    if (pageNumber === -1) {
      return "Page input";
    }
    if (pageNumber === currentPage) {
      return `${t(dict.pageText)} ${Number(pageNumber + 1)} ${t(
        dict.currentPageText
      )}`;
    }
    return `${t(dict.pageText)} ${Number(pageNumber + 1)}`;
  };

  const leftSide = (): number[] => {
    if (currentPage === generatedNumbers.length - 1) {
      return generatedNumbers.slice(currentPage - 3, currentPage - 1);
    }
    if (currentPage === generatedNumbers.length - 2) {
      return generatedNumbers.slice(currentPage - 2, currentPage);
    }
    if (currentPage > 1) {
      return generatedNumbers.slice(currentPage - 1, currentPage + 1);
    }
    return generatedNumbers.slice(0, 2);
  };

  const rightSide = (): number[] => {
    if (currentPage === 0) {
      return generatedNumbers.slice(currentPage + 2, currentPage + 4);
    }
    if (currentPage < generatedNumbers.length - 2) {
      return generatedNumbers.slice(currentPage + 1, currentPage + 3);
    }
    return generatedNumbers.slice(generatedNumbers.length - 2);
  };

  const onChangeInputHandler = (newPageNumber: number) => {
    if (newPageNumber > 0 && newPageNumber <= generatedNumbers.length) {
      onCurrentPageUpdate(newPageNumber - 1); // because we index from 0 (the first element for the user is 1)
    }
  };

  if (numberOfPages <= 5) {
    return (
      <>
        {generatedNumbers.map((pageNumber) => (
          <li key={`page-${pageNumber}`}>
            <SetPageButtonStyled
              onClick={() => onCurrentPageUpdate(pageNumber)}
              isActive={pageNumber === currentPage}
              disabled={pageNumber === currentPage}
              tabIndex={pageNumber === currentPage ? -1 : 0}
              aria-current={pageNumber === currentPage ? "page" : false}
              aria-label={ariaLabelContent(pageNumber)}
              aria-disabled={pageNumber === currentPage}>
              {pageNumber + 1}
            </SetPageButtonStyled>
          </li>
        ))}
      </>
    );
  }

  return (
    <>
      {leftSide().map((pageNumber) => (
        <li key={`page-${pageNumber}`}>
          <SetPageButtonStyled
            onClick={() => onCurrentPageUpdate(pageNumber)}
            isActive={pageNumber === currentPage}
            disabled={pageNumber === currentPage}
            tabIndex={pageNumber === currentPage ? -1 : 0}
            aria-current={pageNumber === currentPage ? "page" : false}
            aria-label={ariaLabelContent(pageNumber)}
            aria-disabled={pageNumber === currentPage}>
            {pageNumber + 1}
          </SetPageButtonStyled>
        </li>
      ))}

      <li>
        <InputStyled
          type="number"
          min={1}
          max={numberOfPages}
          step=".01"
          onChange={(e) => setNewPage(Number(e.currentTarget.value))}
          onBlur={() => setInputValue("...")}
          aria-current={false}
          aria-label={ariaLabelContent(-1)}
          placeholder={inputValue}
          value={inputValue}
        />
      </li>

      {rightSide().map((pageNumber) => (
        <li key={`page-${pageNumber}`}>
          <SetPageButtonStyled
            onClick={() => onCurrentPageUpdate(pageNumber)}
            isActive={pageNumber === currentPage}
            disabled={pageNumber === currentPage}
            tabIndex={pageNumber === currentPage ? -1 : 0}
            aria-current={pageNumber === currentPage ? "page" : false}
            aria-label={ariaLabelContent(pageNumber)}
            aria-disabled={pageNumber === currentPage}>
            {pageNumber + 1}
          </SetPageButtonStyled>
        </li>
      ))}
    </>
  );
};
