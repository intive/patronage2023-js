import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";

import { BudgetIcon } from "ui";

export default {
  title: "BudgetIcon",
  component: BudgetIcon,
} as ComponentMeta<typeof BudgetIcon>;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  min-height: 80px;
`;

const BudgetIconWrapper = styled.div`
  display: flex;
  min-width: 80px;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.budgetIcon.main};
`;

const Description = styled.span`
  font-size: 12px;
  color: "#626262";
`;

const Info = styled.div`
  display: flex;
  flex-grow: 1;
`;
const TitleDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 20px;
`;

const BudgetIconComponent: ComponentStory<typeof BudgetIcon> = ({
  ...args
}) => {
  return (
    <Wrapper>
      <BudgetIconWrapper>
        <BudgetIcon {...args} />
      </BudgetIconWrapper>
      <Info>
        <TitleDescriptionWrapper>
          <Title>Bills</Title>
          <Description>This is a description of Bills budget.</Description>
        </TitleDescriptionWrapper>
      </Info>
    </Wrapper>
  );
};

export const BudgetIconWithBudgetNameAndDescription = BudgetIconComponent.bind(
  {}
);
BudgetIconWithBudgetNameAndDescription.args = {
  icon: "wallet",
};
