import styled, { css } from "styled-components";
import * as AtomicSelect from "@radix-ui/react-select";

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
  max-height: 56px;
  color: ${({ theme }) => theme.select.neutral};
  background-color: ${({ theme }) => theme.select.background};
  border: solid 2px ${({ theme }) => theme.select.border};
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: border-color 200ms ease-out;
  position: relative;

  :focus {
    transition: border-color 200ms ease-out;
    outline: none;
    border-color: ${({ theme }) => theme.input.focus};
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      color: ${({ theme }) => theme.select.error};
      border: solid 2px ${({ theme }) => theme.select.error};

      &:focus {
        border: solid 2px ${({ theme }) => theme.select.error};
      }
    `}

  ${SelectLabelHiddenInTrigger} {
    display: none;
  }
`;

export const SupportingLabelStyled = styled.div`
  color: ${({ theme }) => theme.select.error};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0 10px;
`;

export const TriggerLabelStyled = styled.div`
  position: absolute;
  margin-top: -56px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.input.labelBackground};
  padding: 0 4px;
  line-height: 1;
`;

export const SelectIconStyled = styled(AtomicSelect.Icon)`
  color: ${({ theme }) => theme.select.icon};
  height: 1.5em;
`;

export const SelectPortalStyled = styled(AtomicSelect.Portal)`
  z-index: 100;
`;

const ScrollButtons = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const SelectScrollUpButtonStyled = styled(AtomicSelect.ScrollUpButton)`
  ${ScrollButtons}
`;
export const SelectScrollDownButtonStyled = styled(
  AtomicSelect.ScrollDownButton
)`
  ${ScrollButtons}
`;

export const SelectContentStyled = styled(AtomicSelect.Content)`
  border-radius: 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.select.background};
  border: solid 1px ${({ theme }) => theme.input.borderError};
  cursor: pointer;
  z-index: 100;
  max-height: var(--radix-select-content-available-height);
`;

export const SelectItemStyled = styled(AtomicSelect.Item)`
  outline-color: ${({ theme }) => theme.input.focus};
  padding: 16px;

  &:focus {
    color: ${({ theme }) => theme.input.main};
    background-color: ${({ theme }) => theme.select.focusBackground};
    &:first-child {
      border-radius: 1em 1em 0 0;
    }
    &:last-child {
      border-radius: 0 0 1em 1em;
    }
    &:hover {
      outline: transparent;
    }
    * {
      color: inherit;
    }
  }
`;

export const SelectItemLabelWrapperStyled = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
