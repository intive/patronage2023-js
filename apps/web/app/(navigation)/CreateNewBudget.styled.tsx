import styled from "styled-components";
import { Separator, Textarea } from "ui";
import * as Tabs from "@radix-ui/react-tabs";
import { device } from "lib/media-queries";

type TextareaErrorType = {
  hasError?: boolean;
};

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

export const ParagraphStyled = styled.p`
  font-style: unset;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-left: 3px;
  :first-of-type {
    padding-top: 24px;
  }
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

export const InputWrapperHalfStyledCurrency = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 210px;
  height: 56px;
  margin-bottom: 29px;
`;

export const CurrencyTagStyled = styled.span`
  color: ${({ theme }) => theme.currencySelect.tag};
  margin-right: 8px;
`

export const InputWrapperFullFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const SeparatorStyled = styled(Separator)`
  display: block;
  width: calc(100% + calc(48px * 2));
  margin-left: -48px;
`;

export const SeparatorStyledTop = styled(Separator)`
  display: block;
  width: 100%;
  margin-bottom: 16px;
`;

export const ButtonWrapperStyled = styled.div`
  display: block;
  margin-top: 24px;
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

export const DatePickerWrapperStyled = styled.div`
  position: relative;
`;

export const DatePickerErrorStyled = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.textarea.error};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0 10px;
  top: 55px;
`;

export const TabsStyled = styled(Tabs.Root)`
  width: 311px;
  min-height: calc(100% - 48px);
  & form {
    height: calc(100% - 64px);
    display: grid;
    grid-template-rows: auto 64px [end];
  }
  ${device.tablet} {
    width: 464px;
  }
  ${device.desktop} {
    form {
      height: calc(100% - 80px);
    }
  }
`;

export const ContentStyled = styled.div`
  display: grid;
  overflow-y: scroll;
  grid-row-start: 1;
  grid-row-end: 2;
  padding: 10px;

  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.textarea.Neutral2};
    border-radius: 10px;
    width: 6px;
    margin-bottom: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.modal.closeButton};
    border-radius: 10px;
  }
`;

export const ErrorMessageWrapper = styled.div`
  position: absolute;
  z-index: 5;
  top: 125px;
  width: 315px;
  ${device.tablet} {
    top: 120px;
    width: 465px;
  }
`;
