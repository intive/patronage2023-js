import * as Select from "@radix-ui/react-select";
import styled from "styled-components";

export const SelectRootStyled = styled(Select.Root)`
  position: relative;
`;

export const SelectTriggerStyled = styled(Select.Trigger)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  margin-bottom: 18px;
  width: 100%;
  height: 56px;
  color: ${({ theme }) => theme.input.neutral};
  background-color: ${({ theme }) => theme.categorySelect.background};
  border: solid 2px ${({ theme }) => theme.input.borderError};
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: border-color 200ms ease-out;

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
  padding: 16px;
  gap: 8px;

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
  padding: 16px;
`;
