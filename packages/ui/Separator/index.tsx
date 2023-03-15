import * as React from "react";
import styled, { css } from "styled-components";

export const Separator = ({ label, className }: SeparatorProps) => {
  return (
    <SeparatorStyled className={className}>
      <LabelStyled>{label}</LabelStyled>
    </SeparatorStyled>
  );
};

export type SeparatorProps = {
  label: string;
} & React.HTMLProps<HTMLDivElement>;

export const SeparatorStyled = styled.div`
  text-align: center;
  position: relative;
  margin: 48px 0;

  ::before {
    content: " ";
    height: 1px;
    background-color: #9e9e9e;
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
  }
`;

export const LabelStyled = styled.span`
  color: #9e9e9e;
  padding: 4px 9px;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  background-color: white;
  display: inline-block;
  max-width: 70%;
`;
