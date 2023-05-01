"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../css/pagination.css";
import { Icon } from "ui";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 400px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(32, 41, 50, 0.1);
  overflow: hidden;
`;

const TransactionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  margin: 5px;
  font-size: 12px;
`;

const IconStyled = styled(Icon)`
  font-weight: normal;
`;

type PaginationProps = { data: Array<number>; itemsPerPage: number };

export function Pagination({ data, itemsPerPage }: PaginationProps) {
  const [currentItems, setCurrentItems] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  //itemOffset - index of first element from array that should be displayed
  //endOffset - index of last element from array that should be displayed

  //inside useEffect => endOffset is calculeted to know which rows should be displayed on currentPage.
  //setCurrentItems is called to change currentItems that will be displayed
  //it's just a simulation of data flow; in real project useEffect could be a place for fetch.
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  //onclick function for each page selector (here it's <li> instead of <button>)
  //newOffset is created based on selected page. State changes => useEffect runs.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <Wrapper>
        {currentItems?.map((item) => {
          return (
            <TransactionWrapper>Transaction {item}</TransactionWrapper>
          );
        })}
      </Wrapper>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <IconStyled icon="chevron_right" color="#ccc" iconSize={15} />
        }
        previousLabel={
          <IconStyled icon="chevron_left" color="#ccc" iconSize={15} />
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="container"
        previousClassName="previous"
        nextClassName="next"
        previousLinkClassName="previous-link"
        nextLinkClassName="next-link"
        pageClassName="page"
        activeClassName="page-active"
        breakClassName="break"
      />
    </>
  );
}
