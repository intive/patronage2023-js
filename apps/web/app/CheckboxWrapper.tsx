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
  gap: 0.5em;
`;

const TitleStyled = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  font-weight: 500;
  cursor: pointer;
  gap: 0.5em;
`;

export const CheckboxWrapper = ({
  color,
  iconName,
  title,
}: CheckboxWrapperProps) => {
  const id = title.replaceAll(" ", "_") + "_" + iconName;
  return (
    <CheckboxInputTitleWrapper>
      <input type="checkbox" id={id}></input>
      <TitleStyled htmlFor={id}>
        <Icon icon={iconName} iconSize={25} color={color} /> {title}
      </TitleStyled>
    </CheckboxInputTitleWrapper>
  );
};
