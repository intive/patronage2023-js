"use client";
import { StyledSpan } from "components/ImageCropperModal/ImageCropper.styled";
import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Button } from "ui";
import { useTranslate } from "lib/hooks";
import { device } from "lib/media-queries";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.main};
  border-radius: 20px;
  height: 150px;
  width: 100%;
  gap: 10px;
  ${device.tablet} {
    height: 300px;
    margin-block: 10px;
  }
`;

interface DropzoneProps {
  handleDrop: (acceptedFiles: File[]) => void;
}

export default function StyledDropzone({ handleDrop }: DropzoneProps) {
  const { t, dict } = useTranslate("SignUpPage");
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    // Disable click and keydown behavior
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg": [],
    },

    onDrop: handleDrop,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <StyledSpan>{t(dict.profileScreen.dropZone.onOver)}</StyledSpan>
      ) : (
        <>
          <StyledSpan>{t(dict.profileScreen.dropZone.mainText)}</StyledSpan>
          <StyledSpan>{t(dict.profileScreen.dropZone.separator)}</StyledSpan>
          <Button onClick={open}>
            {t(dict.profileScreen.dropZone.buttonText)}
          </Button>
        </>
      )}
    </Container>
  );
}
