import styled from "styled-components";
import { Card } from "../Card";

type IconPickerStyledProps = {
  ref: React.Ref<any> | null;
};

export const IconPickerStyled = styled.div<IconPickerStyledProps>`
  position: relative;
  justify-content: flex-start;
  width: 112px;
  height: 112px;
  gap: 2px;
  z-index: 1;
  cursor: pointer;
`;

export const IconAndButtonWrapperStyled = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 112px;
  width: 112px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.iconPicker.background};
  color: ${({ theme }) => theme.iconPicker.main};
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
  background-color: ${({ theme }) => theme.iconPicker.main};
  color: ${({ theme }) => theme.iconPicker.edit};
  cursor: pointer;

  &:focus {
    outline-color: ${({ theme }) => theme.iconPicker.outline};
  }
`;

export const IconsSelectorStyled = styled(Card)`
  position: absolute;
  top: 0;
  left: 114px;
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
  color: ${({ theme }) => theme.iconPicker.main};
  border: none;
  cursor: pointer;

  &:hover,
  &:focus {
    border-radius: 12px;
    background-color: ${({ theme }) => theme.iconPicker.hover};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.iconPicker.outline};
  }
`;
