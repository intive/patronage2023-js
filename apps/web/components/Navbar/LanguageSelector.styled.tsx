import styled from "styled-components";
import { Select } from "ui";

export const SelectStyled = styled(Select)`
  background-color: unset;
  border: 0;
  padding: 0;
  line-height: 0;
  margin-bottom: 0;
  width: auto;

  &:focus,
  &[data-state="open"] {
    outline: revert;
  }
`;
