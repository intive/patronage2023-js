import { device } from "lib/media-queries";
import styled, { css } from "styled-components";
import { Button, Icon, Separator } from "ui";
import { ModalContentProps } from ".";

export const SeparatorTopStyled = styled(Separator)`
  display: block;
  width: 100%;
  margin-bottom: 16px;
`;

export const ModalContentStyled = styled.div<ModalContentProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;

  ${({ isError }) =>
    isError
      ? css`
          max-width: 500px;
          max-height: 500px;
        `
      : css`
          min-width: 500px;
          min-height: 500px;
        `}

  ${device.tablet} {
    min-width: 500px;
    min-height: 500px;
  }
`;

export const ErrorWindowStyled = styled.div`
  max-width: 500px;
  max-height: 314px;
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
    min-height: 314px;
  }
`;

export const ImportButtonStyled = styled(Button)`
  width: fit-content;
  padding: 0;
`;

export const LabelStyled = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  aspect-ratio: 1 / 1;
  padding: 16px 24px;
  inline-size: 150px;
  overflow-wrap: break-word;
  cursor: pointer;

  input[type="file"] {
    display: none;
  }
`;

export const PStyled = styled.p`
  padding: 2px;
`;

export const IconStyled = styled(Icon)`
  font-size: 42px;

  ${device.tablet} {
    font-size: 64px;
  }
`;
