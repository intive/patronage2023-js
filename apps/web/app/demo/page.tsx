"use client";
import { Pagination } from "components";
import { useState } from "react";
import styled from "styled-components";
import { Card } from "ui";

const data = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100,
];

const data2 = [...data];

const pageSizeOptions = [10, 15, 20, 30, 50];

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 64px;
  margin-bottom: 32px;
`;

const StyledCardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 64px;
  margin-bottom: 32px;
  background-color: Gainsboro;
`;

const TextInfoStyled = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  padding-bottom: 16px;
`;

const StyledInnerCard = styled(Card)`
  width: 1100px;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const GreenH2Styled = styled.h3`
  color: forestgreen;
  line-height: 26px;
`;
const RedH2Styled = styled.h3`
  color: firebrick;
  line-height: 26px;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding: 16px;
  @media only screen and (min-width: 768px) {
    margin: 32px;
  }
`;

export default function PaginationDemo() {
  const [currentState, setCurrentState] = useState({
    pageIndex: 0,
    pageSize: pageSizeOptions[0],
  });

  const onChangePageIndex = (newPageIndex: number) => {
    setCurrentState((prev) => ({
      ...prev,
      pageIndex: newPageIndex,
    }));
    console.log(currentState);
  };
  const onChangePageSize = (newPageSize: number) => {
    setCurrentState((prev) => ({
      ...prev,
      pageSize: newPageSize,
      pageIndex: 0,
    }));
    console.log(currentState);
  };

  return (
    <StyledWrapper>
      <StyledInnerCard>
        <StyledCardWrapper>
          <StyledCard>
            <TextInfoStyled>
              <h2
                style={{
                  marginBottom: "10px",
                }}>{`My pagination with jumping ... "v1"`}</h2>
              <ul>
                <li>
                  <GreenH2Styled>+ No width size jumps</GreenH2Styled>
                </li>
                <li>
                  <GreenH2Styled>
                    + We can jump 3 pages forward using the 3 dots button
                  </GreenH2Styled>
                </li>
                <li>
                  <GreenH2Styled>
                    + We can jump 2 pages backward by clicking the page button
                    at the left edge
                  </GreenH2Styled>
                </li>
                <li>
                  <RedH2Styled>
                    - No input field to go to a specific page
                  </RedH2Styled>
                </li>
              </ul>
            </TextInfoStyled>

            <Pagination
              pageSizeOptions={pageSizeOptions}
              pageIndex={currentState.pageIndex}
              numberOfPages={Math.ceil(data2.length / currentState.pageSize)}
              currentPageSize={currentState.pageSize}
              onChangePageIndex={onChangePageIndex}
              onChangePageSize={onChangePageSize}
            />
          </StyledCard>
        </StyledCardWrapper>
      </StyledInnerCard>
    </StyledWrapper>
  );
}
