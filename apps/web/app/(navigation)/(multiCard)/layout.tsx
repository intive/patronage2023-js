"use client";
import { CardWrapperStyled, CardStyled } from "../HomePage";
import { LayoutProps } from "app/layout";
import { device } from "lib/media";
import { CheckboxWrapper } from "app/CheckboxWrapper";
import styled from "styled-components";

const RightCardStyled = styled(CardStyled)`
  display: none;
  @media ${device.desktop} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: flex-start;
    flex-basis: 15%;
    min-width: 300px;
    min-height: 250px;
    margin-left: 1%;
  }
`;

//creating imitation of RightCard content
const DescriptionsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 0 20px;
  margin-top: 5%;
`;

const CheckboxesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  width: 100%;
  padding: 20px;
`;

export const H3Styled = styled.h3`
  font-size: 1em;
  font-weight: 500;
  font-family: "Inter", sans-serif;
`;

export default function MultiCardLayout({ children }: LayoutProps) {
  return (
    <CardWrapperStyled>
      <CardStyled>{children}</CardStyled>
      <RightCardStyled>
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
      </RightCardStyled>
    </CardWrapperStyled>
  );
}
