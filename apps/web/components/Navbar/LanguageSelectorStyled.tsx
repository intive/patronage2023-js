import styled from "styled-components";
import * as Select from "@radix-ui/react-select";

export const SelectTriggerStyled = styled(Select.Trigger)`
  color: ${({ theme }) => theme.avatar.outline};
  background-color: unset;
  cursor: pointer;
  border: 0;
  padding: 0;
  line-height: 0;
`;

export const SelectContentStyled = styled(Select.Content)`
  overflow: hidden;
  color: ${({ theme }) => theme.datePicker.neutral10};
  background-color: ${({ theme }) => theme.card.background};
  z-index: 10;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.card.border};
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
    0px 2px 4px rgba(32, 37, 50, 0.03);
`;

export const SelectItemStyled = styled(Select.Item)`
  cursor: pointer;
  padding: 15px 20px;
  display: flex;
  border: 2px solid ${({ theme }) => theme.card.background};
  align-items: center;
  gap: 10px;

  :hover {
    background-color: ${({ theme }) => theme.currencySelect.focusBackground};
    outline: 0;
    border: 2px solid ${({ theme }) => theme.card.background};
  }

  :focus {
    outline: 0;
    border: 2px solid ${({ theme }) => theme.input.focus};
    background-color: ${({ theme }) => theme.currencySelect.focusBackground};
    :hover {
      border: 2px solid ${({ theme }) => theme.card.background};
    }
  }
  :first-of-type:focus {
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }
  :last-of-type:focus {
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }
`;

export const StyledSelectorBox = styled.div`
  display: flex;
  gap: 4px;
  border: 2px solid ${({ theme }) => theme.input.neutral};
  padding: 8px;
`;
