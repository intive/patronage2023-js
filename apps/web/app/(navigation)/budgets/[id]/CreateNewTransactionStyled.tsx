import { device } from "lib/media-queries";
import styled from "styled-components";
import { Separator } from "ui";

export const FormWrapper = styled.div`
  position: relative;
  width: 320px;
  height: calc(100% - 52px);

  & form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  ${device.tablet} {
    width: 464px;
  }
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export const SeparatorStyled = styled(Separator)`
  display: block;
  width: calc(100% + calc(16px * 2));
  margin-left: -16px;

  ${device.tablet} {
    width: calc(100% + calc(48px * 2));
    margin-left: -48px;
  }
`;

export const ButtonWrapperStyled = styled.div`
  margin-top: 24px;
`;

export const DatePickerWrapperStyled = styled.div`
  position: relative;
  width: 50%;
  margin-bottom: 24px;
`;

export const DatePickerErrorStyled = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.textarea.error};
  font-weight: 400;
  font-size: 12px;
  margin: 4px 10px 0 10px;
  top: 55px;
`;

export const ParagraphStyled = styled.p`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-left: 3px;
  padding-top: 56px;
  color: ${({ theme }) => theme.createNewTransaction.paragraph};
`;

export const ContentStyled = styled.div<{ fullHeight?: boolean }>`
  display: grid;
  overflow-y: auto;
  padding-right: ${({ fullHeight }) => fullHeight && "10px"};
  gap: 8px;

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
