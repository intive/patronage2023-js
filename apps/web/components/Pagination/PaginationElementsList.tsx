"use client";
import { useTranslate } from "lib/hooks";
import { SetPageButtonStyled } from "./NewVersion.styled";

type PaginationElementsListProps = {
  numberOfPages: number;
  generatedNumbers: number[];
  currentPage: number;
  onCurrentPageUpdate: (value: number) => void;
};

export const PaginationElementsList = ({
  numberOfPages,
  generatedNumbers,
  currentPage,
  onCurrentPageUpdate,
}: PaginationElementsListProps) => {
  const { t, dict } = useTranslate("Pagination");

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
      return generatedNumbers.slice(currentPage - 3, currentPage);
    }
    if (currentPage > 2) {
      return generatedNumbers.slice(currentPage - 2, currentPage + 1);
    }
    return generatedNumbers.slice(0, 3);
  };

  const rightSide = (): number[] => {
    return generatedNumbers.slice(generatedNumbers.length - 1);
  };

  const onClickJumpAheadHandler = () => {
    if (currentPage + 3 > numberOfPages - 1) {
      return onCurrentPageUpdate(numberOfPages - 1);
    }
    return onCurrentPageUpdate(currentPage + 3);
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
        <SetPageButtonStyled
          onClick={onClickJumpAheadHandler}
          isActive={false}
          aria-current={false}
          aria-label={"jump 3 pages ahead"}>
          {"..."}
        </SetPageButtonStyled>
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
