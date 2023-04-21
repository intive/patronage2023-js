"use client";

import styled from "styled-components";
import { Card } from "ui";
import { IncomeExpenseIcon } from "ui/IncomeExpenseIcon";

const category = {
  id: 2,
  name: "Subscriptions",
  icon: {
    name: "play",
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

export const IncomeExpenseIconDemo = () => {
  return (
    <CardStyled>
      <IncomeExpenseIcon category={category} />
    </CardStyled>
  );
};

export default IncomeExpenseIconDemo;
