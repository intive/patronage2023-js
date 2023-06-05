"use client";

import * as Popover from "@radix-ui/react-popover";
import { ButtonStyled } from "ui";
import {
  PopoverContentStyled,
  PopoverIconStyled,
  CardStyled,
  StyledButton,
} from "./ImportModal.styled";

type InstructionPopoverProps = {
  children: React.ReactNode;
};

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
        <Popover.Close aria-label="Close" style={{ opacity: "0" }} />
        <Popover.Arrow />
      </PopoverContentStyled>
    </Popover.Portal>
  </Popover.Root>
);
