"use client";

import styled from "styled-components";
import { Card } from "ui";
import { IncomeExpenseIcon } from "ui/IncomeExpenseIcon";

const category = {
  id: 2,
  name: "Subscriptions",
  icon: {
    name: "subscriptions",
    foreground: "#643400",
    background: "#FFF3E5",
  },
};

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

export const IncomeExpenseIconDemo = () => {
  return (
    <CardStyled>
      <Wrapper>
        <IncomeExpenseIcon category={category} />
      </Wrapper>
    </CardStyled>
  );
};

export default IncomeExpenseIconDemo;
