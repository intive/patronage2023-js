"use client";
import { CardWrapperStyled, CardStyled } from "../HomePage";
import { Icon } from "ui";
import { LayoutProps } from "app/layout";
import { device } from "lib/media";
import styled from "styled-components";

const RightCardStyled = styled(CardStyled)`
  display: none;
  @media ${device.desktop} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: flex-start;
    flex-basis: 15%;
    min-width: 200px;
    min-height: 25%;
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
  margin-top: 2%;
`;

const ChecksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  width: 100%;
  padding: 20px;
`;
const CheckboxInputTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

const H3Styled = styled.h3`
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
        <ChecksWrapper>
          <CheckboxInputTitleWrapper>
            <input type="checkbox"></input>
            <Icon icon="home" iconSize={25} color="#1E4C40" />
            <H3Styled>Home spendings</H3Styled>
          </CheckboxInputTitleWrapper>
          <CheckboxInputTitleWrapper>
            <input type="checkbox"></input>
            <Icon icon="subscriptions" iconSize={25} color="#643400" />
            <H3Styled>Subscriptions</H3Styled>
          </CheckboxInputTitleWrapper>
          <CheckboxInputTitleWrapper>
            <input type="checkbox"></input>
            <Icon icon="directions_car" iconSize={25} color="#003150" />
            <H3Styled>Car</H3Styled>
          </CheckboxInputTitleWrapper>
          <CheckboxInputTitleWrapper>
            <input type="checkbox"></input>
            <Icon icon="shopping_cart" iconSize={25} color="#5A092F" />
            <H3Styled>Grocery</H3Styled>
          </CheckboxInputTitleWrapper>
        </ChecksWrapper>
      </RightCardStyled>
    </CardWrapperStyled>
  );
}
