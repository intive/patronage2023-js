import { device } from "lib/media-queries";
import styled from "styled-components";
import { Separator } from "ui";

export const FormWrapper = styled.div`
  width: 320px;

  ${device.tablet} {
    width: 464px;
  }
`;

export const SeparatorStyled = styled(Separator)`
  display: block;
  width: calc(100% + calc(48px * 2));
  margin-left: -48px;
`;

export const ButtonWrapperStyled = styled.div`
  display: block;
  margin-top: 24px;
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

export const ParagraphStyled = styled.p`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-left: 3px;
  padding-top: 56px;
  color: #515151;
`;
