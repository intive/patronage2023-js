import * as React from "react";
import styled, { css } from "styled-components";

export const Input = ({
    label,
    hasError=false,
}: InputProps) => {
  return (
    <Wrapper>
        <StyledInput placeholder=" " hasError={hasError}/>
        <StyledLabel hasError={hasError}>{label}</StyledLabel>
    </Wrapper>  
  );
};

type StyledInputProps = {
    hasError: boolean;
} & React.HTMLProps<HTMLInputElement>;

type StyledLabelProps = {
    hasError: boolean;
} & React.HTMLProps<HTMLLabelElement>;

export type InputProps = {
    label: string;
} & StyledInputProps;

const Wrapper = styled.div`
    position: relative;
`;

const StyledLabel = styled.label<StyledLabelProps>`
    font-family: Arial, sans-serif;
    position: absolute;
    color: ${({ hasError }) => (hasError ? "#B3261E" : "#515151")};
    font-weight: 400;
    font-size: 16px;
    left: 10px;
    top: 10px;
    transition: all 200ms linear;
`;

const StyledInput = styled.input<StyledInputProps>`
    border: solid 2px #E1E1E1;
    border-radius: 8px;
    padding: 10px;
    caret-color: #515151;
    transition: border-color 200ms ease-out;
    
    :focus {
        outline: none;
        border-color: #64BA95;
    }

    :focus,
    :not(:placeholder-shown) {
        + label {
            transform: translateY(-16px);
            font-size: 12px;
            font-weight: 600;
            background-color: white;
            padding-left: 4px;
            padding-right: 4px;
        }
    }

    ${({ hasError }) =>
    hasError &&
    css`
        border-color: #B3261E!important;
    `}
`;