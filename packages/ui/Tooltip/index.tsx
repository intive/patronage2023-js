"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";
import styled from "styled-components";

type TooltipProps = {
  children: ReactNode;
  text: ReactNode;
  position?: "top" | "right" | "bottom" | "left";
};

const StyledTooltipContent = styled(RadixTooltip.Content)`
  background-color: ${({ theme }) => theme.tooltip.backgroundColor};
  padding: 10px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.tooltip.border};
  font-size: 12px;
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
    0px 2px 4px rgba(32, 37, 50, 0.03);
`;

export const Tooltip = ({ children, text, position }: TooltipProps) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <StyledTooltipContent side={position} sideOffset={3}>
            {text}
          </StyledTooltipContent>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
