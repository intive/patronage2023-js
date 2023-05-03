"use client";
import { Pagination } from "components";
import { PaginationStateType } from "components/Pagination";
import { PaginationTwo } from "components/Pagination/NewVersion";
import { ShowItemsDemo } from "components/Pagination/ShowItemsDemo";
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
const data3 = [...data];
const data4 = [...data];
const data5 = [...data];

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
    currentPageOne: 0,
    currentPageTwo: 0,
    currentPageThree: 0,
    currentPageFour: 0,
    currentPageFive: 0,
    rowsPerPageOne: pageSizeOptions[0],
    rowsPerPageTwo: pageSizeOptions[0],
    rowsPerPageThree: pageSizeOptions[0],
    rowsPerPageFour: pageSizeOptions[0],
    rowsPerPageFive: pageSizeOptions[0],
  });

  const onChangePaginationState = ({
    rowsPerPage,
    currentPage,
  }: PaginationStateType) => {
    console.log({ rowsPerPage, currentPage });
  };

  const onChangeSetState = (version: number) => {
    return ({ rowsPerPage, currentPage }: PaginationStateType) => {
      if (version === 1) {
        setCurrentState((prev) => ({
          ...prev,
          rowsPerPageOne: rowsPerPage,
          currentPageOne: currentPage,
        }));
      }
      if (version === 2) {
        setCurrentState((prev) => ({
          ...prev,
          rowsPerPageTwo: rowsPerPage,
          currentPageTwo: currentPage,
        }));
      }
      if (version === 3) {
        setCurrentState((prev) => ({
          ...prev,
          rowsPerPageThree: rowsPerPage,
          currentPageThree: currentPage,
        }));
      }
      if (version === 4) {
        setCurrentState((prev) => ({
          ...prev,
          rowsPerPageFour: rowsPerPage,
          currentPageFour: currentPage,
        }));
      }
      if (version === 5) {
        setCurrentState((prev) => ({
          ...prev,
          rowsPerPageFive: rowsPerPage,
          currentPageFive: currentPage,
        }));
      }
      console.log(currentState);
    };
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
                }}>{`Pagination from "react-paginate"`}</h2>
              <ul>
                <li>
                  <GreenH2Styled>+ Easy to implement</GreenH2Styled>
                </li>
                <li>
                  <GreenH2Styled>+ Less code</GreenH2Styled>
                </li>
                <li>
                  <RedH2Styled>
                    - Not enough settings for 3 dots adjustment
                  </RedH2Styled>
                </li>
                <li>
                  <RedH2Styled>
                    {`- We can't replace the 3 dots or give them a specific behavior`}
                  </RedH2Styled>
                </li>
                <li>
                  <RedH2Styled>
                    - Width size jumps when changing pages!
                  </RedH2Styled>
                </li>
                <li>
                  <RedH2Styled>
                    {`- If we want to use styled components for styling we have to refer to .classes`}
                  </RedH2Styled>
                </li>
                <li>
                  <RedH2Styled>
                    {`- We can't set a specific current page`}
                  </RedH2Styled>
                </li>
              </ul>
            </TextInfoStyled>

            <StyledCard>
              <ShowItemsDemo
                itemsPerPage={currentState.rowsPerPageOne}
                data={data}
                currentPage={currentState.currentPageOne}
              />
            </StyledCard>
            <Pagination
              pageSizeOptions={pageSizeOptions}
              onChangePaginationState={onChangeSetState(1)}
              numberOfPages={Math.ceil(
                data.length / currentState.rowsPerPageOne
              )}
            />
          </StyledCard>

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

            <StyledCard>
              <ShowItemsDemo
                itemsPerPage={currentState.rowsPerPageTwo}
                data={data2}
                currentPage={currentState.currentPageTwo}
              />
            </StyledCard>
            <PaginationTwo
              pageSizeOptions={pageSizeOptions}
              currentPage={currentState.currentPageTwo}
              numberOfPages={Math.ceil(
                data2.length / currentState.rowsPerPageTwo
              )}
              onChangePaginationState={onChangeSetState(2)}
              tempVersionNumber={1}
            />
          </StyledCard>

          <StyledCard>
            <TextInfoStyled>
              <h2
                style={{
                  marginBottom: "10px",
                }}>{`My pagination with input field "v2"`}</h2>
              <ul>
                <li>
                  <GreenH2Styled>+ No width size jumps</GreenH2Styled>
                </li>
                <li>
                  <GreenH2Styled>
                    + We can specify the specific page we want to go to
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
                    {`- Can't jump 2 or 3 pages forward by clicking a single element`}
                  </RedH2Styled>
                </li>
              </ul>
            </TextInfoStyled>
            <StyledCard>
              <ShowItemsDemo
                itemsPerPage={currentState.rowsPerPageThree}
                data={data3}
                currentPage={currentState.currentPageThree}
              />
            </StyledCard>
            <PaginationTwo
              pageSizeOptions={pageSizeOptions}
              currentPage={currentState.currentPageThree}
              numberOfPages={Math.ceil(
                data3.length / currentState.rowsPerPageThree
              )}
              onChangePaginationState={onChangeSetState(3)}
              tempVersionNumber={2}
            />
          </StyledCard>

          <StyledCard>
            <TextInfoStyled>
              <h2
                style={{
                  marginBottom: "10px",
                }}>{`My pagination with input field "v3"`}</h2>
              <ul>
                <li>
                  <GreenH2Styled>+ No width size jumps</GreenH2Styled>
                </li>
                <li>
                  <GreenH2Styled>
                    + We can specify the specific page we want to go to
                  </GreenH2Styled>
                </li>
                <li>
                  <GreenH2Styled>+ Compatible with Figma design</GreenH2Styled>
                </li>
                <li>
                  <RedH2Styled>
                    {`- Can't jump 2 or 3 pages forward or backward by clicking a single element`}
                  </RedH2Styled>
                </li>
              </ul>
            </TextInfoStyled>

            <StyledCard>
              <ShowItemsDemo
                itemsPerPage={currentState.rowsPerPageFour}
                data={data4}
                currentPage={currentState.currentPageFour}
              />
            </StyledCard>
            <PaginationTwo
              pageSizeOptions={pageSizeOptions}
              currentPage={currentState.currentPageFour}
              numberOfPages={Math.ceil(
                data4.length / currentState.rowsPerPageFour
              )}
              onChangePaginationState={onChangeSetState(4)}
              tempVersionNumber={3}
            />
          </StyledCard>

          <StyledCard>
            <TextInfoStyled>
              <h2
                style={{
                  marginBottom: "10px",
                }}>{`My pagination with input field "v4"`}</h2>
              <ul>
                <li>
                  <GreenH2Styled>{`+ Variation of "v3"`}</GreenH2Styled>
                </li>
                <li>
                  <GreenH2Styled>{`+ Can jump 2 pages forward`}</GreenH2Styled>
                </li>
                <li>
                  <RedH2Styled>
                    {`- Can't jump 2 or 3 pages backward or to the last page by clicking a single element`}
                  </RedH2Styled>
                </li>
              </ul>
            </TextInfoStyled>

            <StyledCard>
              <ShowItemsDemo
                itemsPerPage={currentState.rowsPerPageFive}
                data={data5}
                currentPage={currentState.currentPageFive}
              />
            </StyledCard>
            <PaginationTwo
              pageSizeOptions={pageSizeOptions}
              currentPage={currentState.currentPageFive}
              numberOfPages={Math.ceil(
                data5.length / currentState.rowsPerPageFive
              )}
              onChangePaginationState={onChangeSetState(5)}
              tempVersionNumber={4}
            />
          </StyledCard>
        </StyledCardWrapper>
      </StyledInnerCard>
    </StyledWrapper>
  );
}
