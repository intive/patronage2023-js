"use client";
import styled from "styled-components";

type TextareaProps = {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
} & React.HTMLProps<HTMLTextAreaElement>;

const TextareaStyled = styled.textarea<TextareaProps>`
  width: 100%;
  min-height: 70px;
  font-family: "Inter", sans-serif;
  font-size: 1em;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.textarea.disabled};
  padding: 12px;
  resize: none;

  &:focus {
    border: 0;
    outline: 2px solid ${({ theme }) => theme.textarea.focus};
  }
`;

export const Textarea = ({
  placeholder,
  onChange,
  className,
}: TextareaProps) => {
  return (
    <TextareaStyled
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
  );
};
