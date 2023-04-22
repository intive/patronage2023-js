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
  {
    id: 2,
    name: "Subscriptions",
    icon: {
      name: "subscriptions",
      foreground: "#643400",
      background: "#FFF3E5",
    },
  },
  {
    id: 3,
    name: "Car",
    icon: {
      name: "directions_car",
      foreground: "#003150",
      background: "#E0F3FF",
    },
  },
  {
    id: 4,
    name: "Grocery",
    icon: {
      name: "shopping_cart",
      foreground: "#5A092F",
      background: "#FDE7F1",
    },
  },
];

const Page = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  margin: 50px;
`;

const CardStyled = styled(Card)`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
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

export default function IncomeExpenseIconDemo() {
  return (
    <Page>
      <CardStyled>
        <h2>Big</h2>
        {mockedCategories.map((category) => {
          return (
            <Wrapper key={category.id}>
              <IncomeExpenseIcon category={category} />
              <span>{category.name}</span>
            </Wrapper>
          );
        })}
      </CardStyled>

      <CardStyled>
        <h2>Small</h2>
        {mockedCategories.map((category) => {
          return (
            <SmallWrapper key={category.id}>
              <IncomeExpenseIcon category={category} small />
              <span>{category.name}</span>
            </SmallWrapper>
          );
        })}
      </CardStyled>
    </Page>
  );
}
