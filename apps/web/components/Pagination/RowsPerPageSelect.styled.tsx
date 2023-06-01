import * as Select from "@radix-ui/react-select";
import styled from "styled-components";

export const SelectTriggerStyled = styled(Select.Trigger)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 84px;
  height: 40px;
  color: ${({ theme }) => theme.input.neutral};
  background-color: ${({ theme }) => theme.select.background};
  border: solid 2px ${({ theme }) => theme.input.borderError};
  border-radius: 8px;
  padding: 4px 4px 4px 16px;
  transition: border-color 200ms ease-out;
  font-size: 1em;
  cursor: pointer;

  &:focus {
    transition: border-color 200ms ease-out;
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }
`;

export const SelectIconStyled = styled(Select.Icon)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.select.icon};
`;

export const SelectPortalStyled = styled(Select.Portal)`
  min-width: 84px;
  margin: 2px 0;
  z-index: 3;
`;

export const SelectContentStyled = styled(Select.Content)`
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.select.background};
  border: solid 2px ${({ theme }) => theme.input.borderError};
  cursor: pointer;
`;

export const SelectItemStyled = styled(Select.Item)`
  gap: 4px;
  outline-color: ${({ theme }) => theme.input.focus};
  padding: 8px;
  text-align: center;

  &:focus {
    color: ${({ theme }) => theme.input.main};
    background-color: ${({ theme }) => theme.select.focusBackground};
    outline-offset: -1px;

    &:first-child {
      border-radius: 6px 6px 0 0;
    }
    &:last-child {
      border-radius: 0 0 6px 6px;
    }
  }
`;
