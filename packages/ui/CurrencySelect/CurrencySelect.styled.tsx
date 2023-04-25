import * as Select from "@radix-ui/react-select";
import styled, { css } from "styled-components";
import { SelectTriggerProps, StyledErrorProps } from ".";

export const SelectRoot = styled(Select.Root)`
  position: relative;
`;

export const SelectTrigger = styled(Select.Trigger)<SelectTriggerProps>`
  position: relative;
  color: ${({ theme }) => theme.input.neutral};
  background-color: ${({ theme }) => theme.currencySelect.background};
  border: solid 2px ${({ theme }) => theme.input.borderError};
  border-radius: 8px;
  font-size: 1em;
  width: 100%;
  height: 56px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding-top: 1em;
  padding-left: 13px;
  padding-right: 10px;
  transition: border-color 200ms ease-out;

  & label {
    position: absolute;
    transform: translateY(-24px);
    font-size: 12px;
    font-weight: 600;
    background-color: ${({ theme }) => theme.input.labelBackground};
    padding-left: 4px;
    padding-right: 4px;
  }

  :focus {
    transition: border-color 200ms ease-out;
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }
`;

export const SelectIcon = styled(Select.Icon)`
  color: ${({ theme }) => theme.currencySelect.icon};
  margin-top: -2px;
`;

export const SelectPortal = styled(Select.Portal)`
  margin-top: 2px;
  z-index: 100;
`;

export const SelectContent = styled(Select.Content)`
  border-radius: 1em;
  overflow: hidden;
  background-color: ${({ theme }) => theme.currencySelect.background};
  border: solid 1px ${({ theme }) => theme.input.borderError};
  cursor: pointer;
`;

export const SelectItem = styled(Select.Item)`
  outline-color: ${({ theme }) => theme.input.focus};
  padding: 16px;
  gap: 8px;

  &:focus {
    color: ${({ theme }) => theme.input.main};
    background-color: ${({ theme }) => theme.currencySelect.focusBackground};
    &:first-child {
      border-radius: 1em 1em 0 0;
    }
    &:last-child {
      border-radius: 0 0 1em 1em;
    }
  }
`;

export const StyledTag = styled.span`
  color: ${({ theme }) => theme.currencySelect.tag};
  margin-right: 8px;
  ${SelectItem}:focus & {
    color: ${({ theme }) => theme.currencySelect.tagFocus};
  }
`;

export const StyledCurrencyLabel = styled.span`
  ${SelectTrigger} & {
    display: none;
  }
`;
