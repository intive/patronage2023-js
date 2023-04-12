"use client";

import { Fragment, ReactNode } from "react";
import styled, { css } from "styled-components";

interface InputProps {
  component: ReactNode;
  onSelect: () => void;
  defaultChecked?: boolean;
  id: string;
}

type GroupProps = {
  options: InputProps[];
  secondary?: boolean;
} & React.HTMLProps<HTMLDivElement>;

export const ButtonGroup = ({ options, secondary }: GroupProps) => {
  return (
    <ButtonGroupStyled options={options} secondary={secondary}>
      {options.map(({ component, onSelect, defaultChecked, id }, index) => {
        return (
          <Fragment key={id}>
            <input
              type={"radio"}
              id={`button-${index}`}
              onClick={onSelect}
              name={"button-group"}
              defaultChecked={defaultChecked}
            />
            <label htmlFor={`button-${index}`}>{component}</label>
          </Fragment>
        );
      })}
    </ButtonGroupStyled>
  );
};

const ButtonGroupStyled = styled.div<GroupProps>`
  display: flex;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  border-radius: 100px;
  height: 100%;

  & > label {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 8px 24px;
    position: relative;

    ${({ secondary }) =>
      secondary
        ? css`
            border: 2px solid
              ${({ theme }) => theme.buttonGroup.secondary.border};
            color: ${({ theme }) => theme.buttonGroup.secondary.main};
          `
        : css`
            background-color: ${({ theme }) =>
              theme.buttonGroup.primary.background};
            color: ${({ theme }) => theme.buttonGroup.primary.main};
            border: 2px solid ${({ theme }) => theme.buttonGroup.primary.main};
          `}

    width: 100%;
    // Add a negative margin to overlap the borders
    margin: -1px;
  }

  /* apply first and last border radius */
  & > label:first-of-type {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  & > label:last-of-type {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  & > input:checked + label,
  & > input:focus + label {
    ${({ secondary }) =>
      secondary
        ? css`
            border-color: ${({ theme }) => theme.buttonGroup.secondary.main};
            z-index: 1;
          `
        : css`
            background-color: ${({ theme }) =>
              theme.buttonGroup.primary.backgroundAction};
          `}
  }

  //hide input without losing accessibility
  & > input {
    height: 0;
    width: 0;
    opacity: 0;
    position: absolute;
  }

  //label on hover
  & > label:hover {
    ${({ secondary }) =>
      secondary
        ? css`
            border-color: ${({ theme }) => theme.buttonGroup.secondary.main};
            z-index: 1;
          `
        : css`
            background-color: ${({ theme }) =>
              theme.buttonGroup.primary.backgroundAction};
          `}
  }

  & > label:hover > span:not(.selected) {
    ${({ secondary }) =>
      !secondary &&
      css`
        color: ${({ theme }) => theme.buttonGroup.primary.main};
      `}
  }

  //when input is not checked span inside label is grey
  & > input:not(:checked) + label > span {
    ${({ secondary }) =>
      secondary
        ? css`
            color: ${({ theme }) => theme.buttonGroup.secondary.notSelected};
          `
        : css`
            color: ${({ theme }) => theme.buttonGroup.primary.notSelected};
          `}
  }
`;
