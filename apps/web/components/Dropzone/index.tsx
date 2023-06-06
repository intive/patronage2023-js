"use client";
import { StyledSpan } from "components/ImageCropperModal/ImageCropper.styled";
import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Button } from "ui";
import { useTranslate } from "lib/hooks";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e1e1e1;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  gap: 10px;
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
          <Button onClick={open} variant="secondary">
            {t(dict.profileScreen.dropZone.buttonText)}
          </Button>
        </>
      )}
    </Container>
  );
}
