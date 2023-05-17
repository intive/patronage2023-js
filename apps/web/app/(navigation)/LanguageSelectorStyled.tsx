import styled from "styled-components";
import * as Select from "@radix-ui/react-select";

export const ContentStyled = styled(Select.Content)`
  color: black;
  background-color: white;
  z-index: 40000;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
    0px 2px 4px rgba(32, 37, 50, 0.03);
`;

export const SelectTriggerStyled = styled(Select.Trigger)`
  background-color: unset;
  border: 0;
  padding: 0;
`;
