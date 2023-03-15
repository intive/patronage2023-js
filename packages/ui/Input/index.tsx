import * as React from "react";
import styled, { css } from "styled-components";

export const Input = ({
    label,
}: InputProps) => {
  return (
    <Wrapper>
        <StyledInput/>
        <StyledLabel>{label}</StyledLabel>
    </Wrapper>  
  );
};

export type InputProps = {
    label: string;
} & React.HTMLProps<HTMLInputElement>;

const Wrapper = styled.div`
    position: relative;
`;

const StyledLabel = styled.label`
    position: absolute;
    color: #515151;
    font-weight: 400;
    font-size: 16px;
    left: 10px;
    top: 10px;
    transition: all 200ms linear;
`;

const StyledInput = styled.input`
    border: solid 2px #E1E1E1; 
    border-radius: 8px;
    padding: 10px;
    transition: border-color 200ms ease-out;

    :focus {
        outline: none;
        border-color: #64BA95;
        
        + label {
            transform: translateY(-16px);
            font-size: 12px;
            font-weight: 600;
            background-color: white;
            padding-left: 4px;
            padding-right: 4px;
        }
    }
`;