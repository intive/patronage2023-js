"use client";
import styled from "styled-components";
import { CheckboxWrapper } from "./CheckboxWrapper";

//creating imitation of RightCard content
const dummyContents = [
  { title: "Home spendings", iconName: "home", color: "#1E4C40", id: 1 },
  {
    title: "Subscriptions",
    iconName: "subscriptions",
    color: "#643400",
    id: 2,
  },
  { title: "Car", iconName: "directions_car", color: "#003150", id: 3 },
  { title: "Grocery", iconName: "shopping_cart", color: "#5A092F", id: 4 },
];

const DescriptionsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  margin-top: 15px;
`;
export const H3Styled = styled.h3`
  font-size: 0.9em;
  font-weight: 500;
  font-family: "Inter", sans-serif;
`;
const CheckboxesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  width: 100%;
  padding: 20px;
`;

//it stands for dummy component that will be passed into MultiCardLayout in AsideCard
//did not yet applied dictionary because it's a dummy component only for initial presentation
//red mark because of icon types
export const DummyAsideCardContent = () => {
  return (
    <>
      <DescriptionsWrapper>
        <H3Styled>Categories</H3Styled>
        <H3Styled>Manage</H3Styled>
      </DescriptionsWrapper>
      <CheckboxesWrapper>
        {dummyContents.map((content) => {
          return (
            <CheckboxWrapper
              title={content.title}
              iconName={content.iconName}
              color={content.color}
              key={content.id}
            />
          );
        })}
      </CheckboxesWrapper>
    </>
  );
};
