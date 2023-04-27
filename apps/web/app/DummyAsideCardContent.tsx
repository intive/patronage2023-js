"use client";
import styled from "styled-components";
import { CheckboxWrapper } from "./CheckboxWrapper";

//creating imitation of RightCard content
const DescriptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const CheckboxesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  width: 100%;
`;

export const H3Styled = styled.h3`
  font-size: 0.9em;
  font-weight: 600;
`;

//it stands for component that will be passed into MultiCardLayout in AsideCard
//did not yet applied dictionary because it's a dummy component only for initial presentation
export const DummyAsideCardContent = () => {
  return (
    <>
      <DescriptionsWrapper>
        <H3Styled>Categories</H3Styled>
        <H3Styled>Manage</H3Styled>
      </DescriptionsWrapper>
      <CheckboxesWrapper>
        <CheckboxWrapper
          title="Home spendings"
          iconName="home"
          color="#1E4C40"
        />
        <CheckboxWrapper
          title="Subscriptions"
          iconName="subscriptions"
          color="#643400"
        />
        <CheckboxWrapper
          title="Car"
          iconName="directions_car"
          color="#003150"
        />
        <CheckboxWrapper
          title="Grocery"
          iconName="shopping_cart"
          color="#5A092F"
        />
      </CheckboxesWrapper>
    </>
  );
};
