import * as Select from "@radix-ui/react-select";
import styled, { css } from "styled-components";

export const SelectTriggerWrapperStyled = styled.div`
  position: relative;
`;

export const SelectTriggerStyled = styled(Select.Trigger)<{
  $hasError: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  margin-bottom: 18px;
  width: 100%;
  height: 56px;
  color: ${({ theme }) => theme.categorySelect.neutral};
  background-color: ${({ theme }) => theme.categorySelect.background};
  border: solid 2px ${({ theme }) => theme.categorySelect.border};
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: border-color 200ms ease-out;

  ${({ $hasError }) =>
    $hasError &&
    css`
      color: ${({ theme }) => theme.categorySelect.error};
      border: solid 2px ${({ theme }) => theme.categorySelect.error};
    `}

  :focus {
    transition: border-color 200ms ease-out;
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }
`;

export const SelectIconStyled = styled(Select.Icon)`
  color: ${({ theme }) => theme.categorySelect.icon};
  margin-top: 4px;
`;

export const SelectPortalStyled = styled(Select.Portal)`
  margin-top: 2px;
  z-index: 100;
`;

export const SelectContentStyled = styled(Select.Content)`
  border-radius: 1em;
  overflow: hidden;
  background-color: ${({ theme }) => theme.categorySelect.background};
  border: solid 1px ${({ theme }) => theme.input.borderError};
  cursor: pointer;
`;

export const SelectItemStyled = styled(Select.Item)`
  outline-color: ${({ theme }) => theme.input.focus};
  padding: 8px 16px;

  &:focus {
    color: ${({ theme }) => theme.input.main};
    background-color: ${({ theme }) => theme.categorySelect.focusBackground};
    &:first-child {
      border-radius: 1em 1em 0 0;
    }
    &:last-child {
      border-radius: 0 0 1em 1em;
    }
    &:hover {
      outline: transparent;
    }
  }
`;

export const CategoryWrapperStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const CategoryNameStyled = styled.p`
  height: 100%;
  padding: 0 16px;
`;

export const SupportingLabelStyled = styled.div<{ hasError: boolean }>`
  position: absolute;
  top: 56px;
  color: ${({ hasError }) =>
    hasError
      ? ({ theme }) => theme.categorySelect.error
      : ({ theme }) => theme.categorySelect.neutral};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0 10px;
`;
