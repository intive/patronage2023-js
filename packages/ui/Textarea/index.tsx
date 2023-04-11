"use client";
import styled from "styled-components";

type TextareaProps = {
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
} & React.HTMLProps<HTMLTextAreaElement>;

const Wrapper = styled.div`
  position: relative;
`;

const TextareaStyled = styled.textarea<TextareaProps>`
  width: 100%;
  min-height: 70px;
  font-family: "Inter", sans-serif;
  font-size: 1em;
  border-radius: 10px;
  border: 0;
  outline: 2px solid ${({ theme }) => theme.textarea.disabled};
  padding: 12px;
  resize: none;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.textarea.focus};
  }

  &:focus,
  &:not(:placeholder-shown) {
    + label {
      transform: translateY(-22px);
      background-color: ${({ theme }) => theme.input.labelBackground};
      font-size: 12px;
      font-weight: 600;
      padding-left: 4px;
      padding-right: 4px;
    }
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  left: 14px;
  top: 11px;
  font-weight: 400;
  font-size: 13px;
  line-height: 150%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 32px);
  transition: all 200ms linear;
  transition-delay: 0.25s;
  cursor: text;
`;

export const Textarea = ({ label, onChange, className }: TextareaProps) => {
  return (
    <Wrapper>
      <TextareaStyled
        placeholder=" "
        onChange={onChange}
        className={className}
      />
      <StyledLabel>{label}</StyledLabel>
    </Wrapper>
  );
};