"use client";

import * as Popover from "@radix-ui/react-popover";
import styled from "styled-components";
import { ButtonStyled } from "ui";
import {
  PopoverContentStyled,
  PopoverIconStyled,
  CardStyled,
  StyledButton,
  PopoverCloseStyled,
} from "./ImportModal.styled";

type InstructionPopoverProps = {
  children: React.ReactNode;
};

const Arrow = styled(Popover.Arrow)`
  margin-bottom: 12px;
`;

export const InstructionPopover = ({ children }: InstructionPopoverProps) => (
  <Popover.Root modal={false}>
    <Popover.Trigger asChild>
      <ButtonStyled
        variant="secondary"
        as={StyledButton}
        aria-label="Show instruction">
        <PopoverIconStyled icon="question_mark" />
      </ButtonStyled>
    </Popover.Trigger>
    <Popover.Portal>
      <PopoverContentStyled sideOffset={5}>
        <CardStyled>{children}</CardStyled>
        <PopoverCloseStyled aria-label="Close" />
      </PopoverContentStyled>
    </Popover.Portal>
  </Popover.Root>
);
