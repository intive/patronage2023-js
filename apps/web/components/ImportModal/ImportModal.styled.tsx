import { device } from "lib/media-queries";
import styled, { css } from "styled-components";
import { Button, ErrorMessage, Icon, Separator } from "ui";
import { ColorProps } from "./ImportModal.types";

export const SeparatorTopStyled = styled(Separator)`
  display: block;
  width: 100%;
  margin-bottom: 16px;
`;

export const ModalContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 32px;
  max-width: 500px;
  height: 500px;
`;

export const InformationWindowStyled = styled.div`
  max-width: 500px;
  height: 314px;
  overflow-y: overlay;

  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.textarea.disabled};
    border-radius: 10px;
    width: 6px;
    margin-bottom: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.modal.closeButton};
    border-radius: 10px;
  }
  ${device.tablet} {
    min-width: 500px;
  }
`;

const ImportExportButtonStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  inline-size: 100px;
  font-size: 0.875em;
  overflow-wrap: break-word;
  text-align: center;

  ${device.tablet} {
    padding: 16px 24px;
    font-size: 1.125em;
    inline-size: 150px;
  }
`;

export const ImportButtonStyled = styled(Button)`
  padding: 0;
`;

export const LabelStyled = styled.label`
  ${ImportExportButtonStyles}
  cursor: pointer;
`;

export const LinkStyled = styled.a`
  ${ImportExportButtonStyles};
  text-decoration: none;
`;

export const IconStyled = styled(Icon)`
  font-size: 42px;

  ${device.tablet} {
    font-size: 64px;
  }
`;

export const SpinnerWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
  height: 100%;
`;

export const PStyled = styled.p<ColorProps>`
  color: ${({ color }) => color};
  padding: 4px;
`;

export const TutorialScreenWrapperStyled = styled.div`
  color: ${({ theme }) => theme.main};
  font-weight: 600;
  font-size: 1em;

  ${device.tablet} {
    font-size: 1.125em;
  }
`;

export const SpanStyled = styled.span<ColorProps>`
  color: ${({ color }) => color};
`;

export const ScreenStatusWrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ErrorMessageStyled = styled(ErrorMessage)`
  margin-right: 8px;
  margin-bottom: 8px;
`;
