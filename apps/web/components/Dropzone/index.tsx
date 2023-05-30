"use client";
import { StyledSpan } from "components/ImageCropperModal/ImageCropper.styled";
import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Button } from "ui";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.main};
  border-radius: 20px;
  height: 200px;
  width: 100%;
  gap: 4px;
`;

interface DropzoneProps {
  handleDrop: (acceptedFiles: File[]) => void;
}

export default function StyledDropzone({ handleDrop }: DropzoneProps) {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    // Disable click and keydown behavior
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop: handleDrop,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <StyledSpan>Drop here...</StyledSpan>
      ) : (
        <>
          <StyledSpan>Drop file here</StyledSpan>
          <StyledSpan>or</StyledSpan>
          <Button onClick={open}>Choose a file</Button>
        </>
      )}
    </Container>
  );
}
