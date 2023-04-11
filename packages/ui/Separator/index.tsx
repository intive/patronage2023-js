import * as React from "react";
import styled from "styled-components";

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
  margin: 0;

  ::before {
    content: " ";
    height: 1px;
    background-color: ${({ label }) =>
      label
        ? ({ theme }) => theme.separator.withText
        : ({ theme }) => theme.separator.withoutText};
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const LabelStyled = styled.span`
  color: #7e7e7e;
  padding: 4px 9px;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  background-color: white;
  display: inline-block;
  max-width: 70%;
  position: relative;
  z-index: 1;
`;
