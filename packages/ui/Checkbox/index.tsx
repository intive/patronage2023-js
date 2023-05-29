"use client";

import styled, { css } from "styled-components";

const CheckboxWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const LabelStyled = styled.label`
  width: fit-content;
  cursor: pointer;
`;

const CheckmarkStyled = styled.span<InputCheckmarkProps>`
  box-sizing: border-box;
  position: relative;
  border-radius: 3px;
  border: 3px solid ${({ theme }) => theme.checkbox.inactive};
  ${({ sizeBig }) =>
    sizeBig
      ? css`
          height: 25px;
          width: 25px;
        `
      : css`
          height: 19px;
          width: 19px;
        `}

  &:after {
    content: "";
    display: none;
    transform: rotate(135deg);
    width: 3px;

    ${({ sizeBig }) =>
      sizeBig
        ? css`
            top: 7px;
            left: 4px;
            height: 8px;
          `
        : css`
            top: 5px;
            left: 3px;
            height: 6px;
          `}
  }

  &:before {
    content: "";
    display: none;
    transform: rotate(45deg);
    width: 3px;

    ${({ sizeBig }) =>
      sizeBig
        ? css`
            top: 2px;
            left: 10px;
            height: 13px;
          `
        : css`
            top: 1px;
            left: 7px;
            height: 10px;
          `}
  }
`;

const InputStyled = styled.input<CheckboxProps>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  z-index: 1;

  ${({ sizeBig }) =>
    sizeBig
      ? css`
          height: 25px;
          width: 25px;
        `
      : css`
          height: 19px;
          width: 19px;
        `}

  &:checked ~ ${CheckmarkStyled} {
    border: 3px solid ${({ theme }) => theme.checkbox.main};
    &:after,
    &:before {
      display: block;
      position: absolute;
      box-sizing: border-box;
      border-radius: 16px;
      border: 1px solid ${({ theme }) => theme.checkbox.main};
      background: ${({ theme }) => theme.checkbox.main};
    }
  }

  &:focus ~ ${CheckmarkStyled} {
    border: 3px solid ${({ theme }) => theme.checkbox.main};
  }
`;

type InputCheckmarkProps = {
  sizeBig?: boolean;
};
export type CheckboxProps = InputCheckmarkProps &
  React.HTMLProps<HTMLInputElement>;

export const Checkbox = ({
  label,
  name,
  id,
  value,
  onChange,
  onFocus,
  children,
  checked,
  className,
  sizeBig,
}: CheckboxProps) => {
  return (
    <CheckboxWrapperStyled className={className}>
      <InputStyled
        label={label}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        checked={checked}
        type="checkbox"
        sizeBig={sizeBig}
      />
      <CheckmarkStyled sizeBig={sizeBig} />

      {children && <LabelStyled htmlFor={id}>{children}</LabelStyled>}
    </CheckboxWrapperStyled>
  );
};
