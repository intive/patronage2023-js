"use client";
import { ReactNode } from "react";
import styled, { css } from "styled-components";
import "material-symbols";
import React from "react";

export const ButtonGroup = ({ options, secondary }: GroupProps) => {
  return (
    <ButtonGroupStyled options={options} secondary={secondary}>
      {options.map(({ component, onSelect }, index) => {
        return (
          <>
            <input
              type={"radio"}
              id={`button-${index}`}
              key={`input-${index}`}
              onClick={onSelect}
              name={"button-group"}
            />
            <label key={`index-${index}`} htmlFor={`button-${index}`}>
              {component}
            </label>
          </>
        );
      })}
    </ButtonGroupStyled>
  );
};

interface InputProps {
  component: ReactNode;
  onSelect: () => void;
}

type GroupProps = {
  options: InputProps[];
  secondary?: boolean;
} & React.HTMLProps<HTMLDivElement>;

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

  & > input {
    display: none;
  }

  & > input:checked + label {
    ${({ secondary }) =>
      secondary
        ? css`
            border-color: ${({ theme }) => theme.buttonGroup.secondary.main};
            z-index: 10;
          `
        : css`
            background-color: ${({ theme }) =>
              theme.buttonGroup.primary.backgroundAction};
          `}
  }

  //label on hover
  & > label:hover {
    ${({ secondary }) =>
      secondary
        ? css`
            border-color: ${({ theme }) => theme.buttonGroup.secondary.main};
            z-index: 10;
          `
        : css`
            background-color: ${({ theme }) =>
              theme.buttonGroup.primary.backgroundAction};
          `}
  }

  & > label:hover > span {
    ${({ secondary }) =>
      !secondary &&
      css`
        color: ${({ theme }) => theme.buttonGroup.primary.main} !important;
      `}
  }

  //when input is not checked span inside label is grey
  & > input:not(:checked) + label > span {
    ${({ secondary }) =>
      secondary
        ? css`
            color: ${({ theme }) => theme.buttonGroup.secondary.uncheckedColor};
          `
        : css`
            color: ${({ theme }) => theme.buttonGroup.primary.uncheckedColor};
          `}
  }
`;
