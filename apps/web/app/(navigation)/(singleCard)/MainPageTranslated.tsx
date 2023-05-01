"use client";

import styled from "styled-components";
import { Pagination } from "app/(navigation)/Pagination";

//simulation of transaction's data
const items: number[] = [];
for (let i = 1; i <= 100; i++) {
  items.push(i);
}

export const MainPageTranslated = () => {
  const ContentWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <ContentWrapperStyled>
      <Pagination data={items} itemsPerPage={10} />
    </ContentWrapperStyled>
  );
};
