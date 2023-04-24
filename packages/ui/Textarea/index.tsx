"use client";
import styled, { css } from "styled-components";

type TextareaProps = {
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  hasError?: boolean;
  value?: string;
  id?: string;
  name?: string;
} & React.HTMLProps<HTMLTextAreaElement>;

type LabelProps = {
  hasError?: boolean;
} & React.HTMLProps<HTMLLabelElement>;

const Wrapper = styled.div`
  position: relative;
`;

const TextareaStyled = styled.textarea<TextareaProps>`
  width: 100%;
  min-height: 70px;
  font-size: 1em;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.textarea.disabled};
  padding: 14px;
  resize: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.textarea.focus};
  }

  &:focus,
  &:not(:placeholder-shown) {
    + label {
      transform: translateY(-18px);
      background-color: ${({ theme }) => theme.input.labelBackground};
      font-size: 12px;
      font-weight: 600;
      padding-left: 4px;
      padding-right: 4px;
    }
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${({ theme }) => theme.input.error};
      caret-color: ${({ theme }) => theme.input.error};

      :focus {
        border-color: ${({ theme }) => theme.input.error};
      }
    `}
`;

const StyledLabel = styled.label<LabelProps>`
  position: absolute;
  left: 14px;
  top: 11px;
  font-weight: 400;
  line-height: 150%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 32px);
  transition: all 200ms linear;
  color: ${({ hasError }) =>
    hasError
      ? ({ theme }) => theme.input.error
      : ({ theme }) => theme.input.neutral};
  cursor: text;
`;

export const Textarea = ({
  label,
  onChange,
  className,
  hasError,
  value,
  id,
  name,
}: TextareaProps) => {
  return (
    <Wrapper>
      <TextareaStyled
        id={id || name}
        placeholder=" "
        onChange={onChange}
        className={className}
        hasError={hasError}
        value={value}
      />
      <StyledLabel htmlFor={id || name} hasError={hasError}>
        {label}
      </StyledLabel>
    </Wrapper>
  );
};
