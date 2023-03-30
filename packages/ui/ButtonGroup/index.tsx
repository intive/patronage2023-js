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
            border: 2px solid #b1b1b1;
            color: #1e4c40;
          `
        : css`
            background-color: #1e4c40;
            color: #ffffff;
            border: 2px solid #ffffff;
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
            border-color: #1e4c40;
            z-index: 10;
          `
        : css`
            background-color: #459175;
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
            border-color: #1e4c40;
            z-index: 10;
          `
        : css`
            background-color: #459175;
          `}
  }

  & > label:hover > span:not(.selected) {
    ${({ secondary }) =>
      !secondary &&
      css`
        color: #ffffff;
      `}
  }

  //when input is not checked span inside label is grey
  & > input:not(:checked) + label > span {
    ${({ secondary }) =>
      secondary
        ? css`
            color: #7e7e7e;
          `
        : css`
            color: #b1b1b1;
          `}
  }
`;
