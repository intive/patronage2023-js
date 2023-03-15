import styled, { css } from "styled-components";
import * as React from "react";

export type SpanProps = {
  textSize?: number;
  children: React.ReactNode;
} & React.HTMLProps<HTMLSpanElement>;

export const SpanStyled = styled.span<SpanProps>`
  ${({ textSize }) =>
    textSize &&
    css`
      font-size: ${textSize}px;
    `}
`;

export const Span = ({ textSize, children }: SpanProps) => {
  return <SpanStyled textSize={textSize}>{children}</SpanStyled>;
};
