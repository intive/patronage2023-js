"use client";
import { Pagination } from "components";
import { PaginationStatusType } from "components/Pagination";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 600px;
`;

const pageSizeOptions = [10, 15, 20, 30, 50];

const onChangePaginationStatus = (status: PaginationStatusType) => {
  console.log(status);
};

export default function PaginationDemo() {
  return (
    <Wrapper>
      <Pagination
        pageSizeOptions={pageSizeOptions}
        onChangePaginationStatus={onChangePaginationStatus}
        currentPage={1}
        currentPageSize={10}
        numberOfPages={6}
      />
    </Wrapper>
  );
}
