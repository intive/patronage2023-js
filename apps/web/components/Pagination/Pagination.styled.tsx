"use client";
import styled from "styled-components";

export const ContainerStyled = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
  width: 100%;
  height: auto;
  padding-top: 32px;
`;

export const RowsPerPageContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const ListStyled = styled.ul`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  li {
    list-style-type: none;
  }
`;

export const NavigationButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.pagination.text};
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.pagination.border};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.pagination.hover};
    border-color: ${({ theme }) => theme.pagination.hover};
    outline: none;
  }

  &:focus {
    color: ${({ theme }) => theme.pagination.hover};
    border-color: ${({ theme }) => theme.pagination.hover};
    outline: none;
  }

  &:disabled {
    color: ${({ theme }) => theme.pagination.border};
    border-color: ${({ theme }) => theme.pagination.border};
    cursor: not-allowed;
  }
`;

type PageButtonType = {
  isActive?: boolean;
};

export const PageButtonStyled = styled.button<PageButtonType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.pagination.active : theme.pagination.text};
  border: transparent;
  background: transparent;
  border-radius: 4px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;

  &:hover,
  &:focus {
    border: 2px solid ${({ theme }) => theme.pagination.hover};
    outline: none;
  }

  &:disabled {
    border: none;
    outline: none;
    cursor: default;
  }
`;

type InputStyledType = {
  isActive?: boolean;
};

export const InputStyled = styled.input<InputStyledType>`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1em;
  font-weight: 600;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.pagination.active : theme.pagination.text};
  border: none;
  cursor: pointer;

  &:focus,
  &:hover {
    border: 2px solid
      ${({ isActive, theme }) =>
        isActive ? theme.pagination.active : theme.pagination.text};
  }

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: none;
  }
`;
