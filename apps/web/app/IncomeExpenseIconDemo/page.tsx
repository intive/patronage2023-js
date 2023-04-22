"use client";

import styled from "styled-components";
import { Card } from "ui";
import { IncomeExpenseIcon } from "ui/IncomeExpenseIcon";

const mockedCategories = [
  {
    id: 1,
    name: "Home spendings",
    icon: {
      name: "home",
      foreground: "#1E4C40",
      background: "#F1FBF6",
    },
  },
];

const CardStyled = styled(Card)`
  width: 500px;
  margin: 0 auto;
  margin-top: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;
  padding: 40px;
`;

const Wrapper = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SmallWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 0.5rem;
`;

export const IncomeExpenseIconDemo = () => {
  return (
    <CardStyled>
      <Wrapper>
        <IncomeExpenseIcon category={mockedCategories[0]} />
        <span>Home spendings</span>
      </Wrapper>

      <SmallWrapper>
        <IncomeExpenseIcon category={mockedCategories[0]} small />
        <span>Home spendings</span>
      </SmallWrapper>
    </CardStyled>
  );
};

export default IncomeExpenseIconDemo;
