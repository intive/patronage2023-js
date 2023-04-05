"use client";

import styled from "styled-components";

const TextAreaStyled = styled.textarea`
  width: 80%;
  height: auto;
  min-height: 70px;
  font-family: "Inter", sans-serif;
  font-size: 1em;
  border-radius: 10px;
  border: 2px solid #ccc;
  padding: 12px;
  resize: none;

  &:focus {
    outline: 2px solid #52a785;
  }
`;

export const Textarea = () => {
  return <TextAreaStyled placeholder="Description" />;
};
