import * as React from "react";
import styled, { css } from "styled-components";

export const Separator = ({ label, className }: SeparatorProps) => {
  return (
    <SeparatorStyled className={className} label={label}>
      {label && <LabelStyled>{label}</LabelStyled>}
    </SeparatorStyled>
  );
};

export type SeparatorProps = {
  label?: string;
} & React.HTMLProps<HTMLDivElement>;

const SeparatorStyled = styled.div<SeparatorProps>`
  text-align: center;
  position: relative;
  margin: 48px 0;

  ::before {
    content: " ";
    height: 1px;
    background-color: ${({ label }) => (label ? "#9e9e9e" : "#E1E1E1")};
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
  }
`;

const LabelStyled = styled.span`
  color: #7E7E7E;
  padding: 4px 9px;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  background-color: white;
  display: inline-block;
  max-width: 70%;
`;
