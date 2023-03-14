import { ReactHTMLElement } from "react";
import styled from "styled-components";

type InputProps = {
  secondary?: boolean;
} & React.HTMLProps<HTMLInputElement>;

export const Input = styled.input<InputProps>`
  border: 3px solid green;
  border-radius: 0;
  height: 2em;
  color: ${({ secondary }) => (secondary ? "blue" : "green")};
`;

export const InputPassword = styled(Input)`
  border-color: red;
`;
