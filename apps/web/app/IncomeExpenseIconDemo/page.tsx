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
`;

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
`;

const SmallWrapper = styled.div`
  width: 32px;
  height: 32px;
`;

export const IncomeExpenseIconDemo = () => {
  return (
    <CardStyled>
      <Wrapper>
        <IncomeExpenseIcon category={mockedCategories[0]} />
      </Wrapper>
      <SmallWrapper>
        <IncomeExpenseIcon category={mockedCategories[0]} />
      </SmallWrapper>
    </CardStyled>
  );
};

export default IncomeExpenseIconDemo;
