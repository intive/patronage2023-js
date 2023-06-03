"use client";
import styled from "styled-components";
import { device } from "lib/media-queries";
import { Select } from "ui";
import { SelectItemStyled } from "ui/Select/Select.styles";

export const ContainerStyled = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
  width: 100%;
  height: auto;
  padding-top: 32px;
  ${device.tablet} {
    justify-content: space-between;
  }
`;

export const RowsPerPageContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const SelectStyled = styled(Select)`
  padding: 5px 4px 5px 16px;
  margin-bottom: 0;
  min-width: 84px;
`;

export const PaginationSelectItemStyled = styled(SelectItemStyled)`
  padding: 8px 16px;
  min-width: 84px;
  text-align: center;
`;

export const ListStyled = styled.ul`
  display: flex;
  li {
    list-style-type: none;
  }
  ${device.tablet} {
    gap: 8px;
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
