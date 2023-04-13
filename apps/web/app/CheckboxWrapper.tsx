"use client";
import styled from "styled-components";
import { Icon } from "ui";

type CheckboxWrapperProps = {
  color: string;
  title: string;
  iconName: "home" | "subscriptions" | "directions_car" | "shopping_cart";
};

const CheckboxInputTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 15px;
`;
const TitleStyled = styled.h3`
  font-size: 0.9em;
  font-weight: 500;
  font-family: "Inter", sans-serif;
`;

export const CheckboxWrapper = ({
  color,
  iconName,
  title,
}: CheckboxWrapperProps) => {
  return (
    <CheckboxInputTitleWrapper>
      <input type="checkbox"></input>
      <Icon icon={iconName} iconSize={25} color={color} />
      <TitleStyled>{title}</TitleStyled>
    </CheckboxInputTitleWrapper>
  );
};
