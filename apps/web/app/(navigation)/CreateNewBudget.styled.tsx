import styled from "styled-components";
import { Separator, Textarea } from "ui";
import * as Tabs from "@radix-ui/react-tabs";
import { device } from "lib/media-queries";

type TextareaErrorType = {
  hasError?: boolean;
};

export const TabsStyled = styled(Tabs.Root)`
  width: 311px;
  ${device.tablet} {
    width: 464px;
  }
`;

export const TabsListStyled = styled(Tabs.List)`
  display: flex;
  margin-bottom: 24px;
`;

export const TabsTriggerStyled = styled(Tabs.Trigger)`
  font-size: 14px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.createNewBudget.background};
  color: ${({ theme }) => theme.createNewBudget.inactive};
  width: 50%;
  border: 0;
  cursor: pointer;
  padding: 8px 8px 12px 8px;
  border-bottom: 2px solid white;
  &[data-state="active"] {
    color: ${({ theme }) => theme.createNewBudget.active};
    border-bottom: 2px solid ${({ theme }) => theme.createNewBudget.active};
  }
  &[disabled],
  &[disabled]:hover {
    color: ${({ theme }) => theme.button.secondary.disabled};
    cursor: not-allowed;
  }
  &:hover {
    color: ${({ theme }) => theme.button.secondary.hover};
  }
`;

export const TabsContentStyled = styled(Tabs.Content)``;

export const ParagraphStyled = styled.p`
  font-style: unset;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-left: 3px;
`;

export const IconPickerStyled = styled.div`
  margin-bottom: 24px;
`;

export const InputWrapperFullStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  & > * {
    flex-basis: 85px;
  }
`;

export const InputWrapperHalfStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 210px;

  & > * {
    flex-basis: 85px;
  }
`;

export const InputWrapperFullFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const SeparatorStyled = styled(Separator)`
  display: block;
  width: calc(100% + calc(48px * 2));
  margin-top: 48px;
  margin-left: -48px;
`;

export const SeparatorStyledTop = styled(Separator)`
  display: block;
  width: 100%;
  margin-bottom: 16px;
`;

export const ButtonWrapperStyled = styled.div`
  display: block;
  padding-top: 24px;
`;

export const TextAreaWrapperStyled = styled.div`
  position: relative;
`;

export const TextareaStyled = styled(Textarea)`
  margin-bottom: 36px;
`;

export const TextareaErrorStyled = styled.div<TextareaErrorType>`
  position: absolute;
  top: 70px;
  color: ${({ theme }) => theme.textarea.error};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0 10px;
`;
