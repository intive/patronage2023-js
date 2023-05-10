"use client";
import { useTranslate } from "lib/hooks";
import { PageButtonStyled } from "./Pagination.styled";

type PaginationElementsListProps = {
  numberOfPages: number;
  generatedPageNumbers: number[];
  pageIndex: number;
  onPageIndexChange: (newPageIndex: number) => void;
};

export const PaginationElementsList = ({
  numberOfPages,
  generatedPageNumbers,
  pageIndex,
  onPageIndexChange,
}: PaginationElementsListProps) => {
  const { t, dict } = useTranslate("Pagination");

  const showBreakElement = pageIndex < numberOfPages - 3;

  const ariaLabelContent = (pageNumber: number) => {
    if (pageNumber === pageIndex) {
      return `${t(dict.pageAriaLabel)} ${Number(pageNumber + 1)} ${t(
        dict.currentPageAriaLabel
      )}`;
    }
    return `${t(dict.pageAriaLabel)} ${Number(pageNumber + 1)}`;
  };

  const leftSide = (): number[] => {
    if (pageIndex === generatedPageNumbers.length - 2) {
      return generatedPageNumbers.slice(pageIndex - 3, pageIndex);
    }
    if (pageIndex === generatedPageNumbers.length - 1) {
      return generatedPageNumbers.slice(pageIndex - 4, pageIndex - 1);
    }
    if (pageIndex > 2) {
      return generatedPageNumbers.slice(pageIndex - 2, pageIndex + 1);
    }
    return generatedPageNumbers.slice(0, 3);
  };

  const rightSide = (): number[] => {
    if (pageIndex >= generatedPageNumbers.length - 3) {
      return generatedPageNumbers.slice(generatedPageNumbers.length - 2);
    }
    return generatedPageNumbers.slice(generatedPageNumbers.length - 1);
  };

  const onClickJumpAheadHandler = () => {
    if (pageIndex + 3 > numberOfPages - 1) {
      return onPageIndexChange(numberOfPages - 1);
    }
    return onPageIndexChange(pageIndex + 3);
  };

  if (numberOfPages <= 5) {
    return (
      <>
        {generatedPageNumbers.map((pageNumber) => (
          <li key={`page-${pageNumber}`}>
            <PageButtonStyled
              onClick={() => onPageIndexChange(pageNumber)}
              isActive={pageNumber === pageIndex}
              disabled={pageNumber === pageIndex}
              tabIndex={pageNumber === pageIndex ? -1 : 0}
              aria-current={pageNumber === pageIndex ? "page" : false}
              aria-label={ariaLabelContent(pageNumber)}
              aria-disabled={pageNumber === pageIndex}>
              {pageNumber + 1}
            </PageButtonStyled>
          </li>
        ))}
      </>
    );
  }
  return (
    <>
      {leftSide().map((pageNumber) => (
        <li key={`page-${pageNumber}`}>
          <PageButtonStyled
            onClick={() => onPageIndexChange(pageNumber)}
            isActive={pageNumber === pageIndex}
            disabled={pageNumber === pageIndex}
            tabIndex={pageNumber === pageIndex ? -1 : 0}
            aria-current={pageNumber === pageIndex ? "page" : false}
            aria-label={ariaLabelContent(pageNumber)}
            aria-disabled={pageNumber === pageIndex}>
            {pageNumber + 1}
          </PageButtonStyled>
        </li>
      ))}

      {showBreakElement ? (
        <li>
          <PageButtonStyled
            onClick={onClickJumpAheadHandler}
            isActive={false}
            aria-current={false}
            aria-label={t(dict.breakElementAriaLabel)}>
            {"..."}
          </PageButtonStyled>
        </li>
      ) : null}

      {rightSide().map((pageNumber) => (
        <li key={`page-${pageNumber}`}>
          <PageButtonStyled
            onClick={() => onPageIndexChange(pageNumber)}
            isActive={pageNumber === pageIndex}
            disabled={pageNumber === pageIndex}
            tabIndex={pageNumber === pageIndex ? -1 : 0}
            aria-current={pageNumber === pageIndex ? "page" : false}
            aria-label={ariaLabelContent(pageNumber)}
            aria-disabled={pageNumber === pageIndex}>
            {pageNumber + 1}
          </PageButtonStyled>
        </li>
      ))}
    </>
  );
};
