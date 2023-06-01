import styled, { css } from "styled-components";
import * as AtomicSelect from "@radix-ui/react-select";

export const SelectItemLabelWrapperStyled = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const SelectLabelHiddenInTrigger = styled.span``;

export const SelectTriggerStyled = styled(AtomicSelect.Trigger)<{
  $hasError: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;

  margin-bottom: ${({ $hasError }) => ($hasError ? "0" : "18px")};
  width: 100%;
  color: ${({ theme }) => theme.categorySelect.neutral};
  background-color: ${({ theme }) => theme.categorySelect.background};
  border: solid 2px ${({ theme }) => theme.categorySelect.border};
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: border-color 200ms ease-out;
  position: relative;

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

  ${SelectLabelHiddenInTrigger} {
    display: none;
  }
`;

export const TriggerLabelStyled = styled.div`
  position: absolute;
  margin-top: -56px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.input.labelBackground};
  padding: 0 4px;
`;

export const SelectIconStyled = styled(AtomicSelect.Icon)`
  color: ${({ theme }) => theme.categorySelect.icon};
  height: 1.5em;
`;

export const SelectPortalStyled = styled(AtomicSelect.Portal)`
  z-index: 100;
`;

export const SelectContentStyled = styled(AtomicSelect.Content)`
  border-radius: 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.categorySelect.background};
  border: solid 1px ${({ theme }) => theme.input.borderError};
  cursor: pointer;
`;

export const SelectItemStyled = styled(AtomicSelect.Item)`
  outline-color: ${({ theme }) => theme.input.focus};
  padding: 16px;

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

export const SupportingLabelStyled = styled.div`
  color: ${({ theme }) => theme.categorySelect.error};
  font-weight: 400;
  font-size: 12px;
  margin-left: 14px;
`;