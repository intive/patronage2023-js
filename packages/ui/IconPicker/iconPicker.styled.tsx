import styled from "styled-components";
import { Card } from "../Card";

export const IconPickerStyled = styled.div`
  display: flex;
  width: 314px;
  height: 112px;
  gap: 2px;
  z-index: 10;
`;

export const IconAndButtonWrapperStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 112px;
  width: 112px;
  border-radius: 50%;
  background-color: #f7f7f7;
`;

export const EditButtonStyled = styled.button`
  position: absolute;
  left: 84px;
  top: 84px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: #1e4c40;
  color: white;
  cursor: pointer;
`;

export const IconsSelectorStyled = styled(Card)`
  display: grid;
  place-items: stretch;
  grid-template-columns: repeat(3, 64px);
  grid-template-rows: repeat(3, 64px);
  width: fit-content;
  height: fit-content;
  padding: 4px;
`;

export const SelectIconButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;

  &:hover {
    border-radius: 12px;
    background-color: #f1f8f6;
  }
`;
