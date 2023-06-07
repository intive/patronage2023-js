import styled from "styled-components";
import { Separator, Textarea } from "ui";
import { device } from "lib/media-queries";

type TextareaErrorType = {
  hasError?: boolean;
};

export const ParagraphStyled = styled.p`
  font-style: unset;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-left: 3px;
  :first-of-type {
    padding-top: 24px;
  }
  color: ${({ theme }) => theme.modal.paragraph};
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
  color: ${({ theme }) => theme.select.tag};
`;

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

export const FormWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 68px);
  width: 311px;

  & form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  ${device.tablet} {
    height: calc(100% - 84px);
    width: 464px;
  }
`;

export const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-right: 10px;

  height: 100%;

  ${device.tablet} {
  }

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
