import * as Accordion from "@radix-ui/react-accordion";
import styled, { css } from "styled-components";
import React from "react";
import { Icon } from "ui/Icon";

type StylingDivProps = {
  maxHeight: string | undefined;
};

export const AccordionRoot = styled(Accordion.Root)`
  width: 100%;
`;
export const AccordionItem = styled(Accordion.Item)`
  color: ${({ theme }) => theme.accordion.main};
  border: solid 2px ${({ theme }) => theme.accordion.borderInactive};
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 200ms ease-out;

  &[data-state="open"],
  &:hover {
    border: solid 2px ${({ theme }) => theme.accordion.main};
  }
`;
export const AccordionHeader = styled(Accordion.Header)`
  cursor: pointer;
`;
export const AccordionTrigger = styled(Accordion.Trigger)`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  font-family: unset;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  background-color: transparent;
  border-width: 0;
  padding: 0;
  color: ${({ theme }) => theme.accordion.main};

  & > .iconStyles {
    color: ${({ theme }) => theme.accordion.main};
    rotate: 90deg;
  }

  &[data-state="open"] > .iconStyles {
    transform: rotate(180deg);
  }
`;

export const AccordionContent = styled(Accordion.Content)`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.accordion.content};
`;

export const StylingDiv = styled.div<StylingDivProps>`
  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight}px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        background-color: ${({ theme }) => theme.textarea.disabled};
        border-radius: 10px;
        width: 6px;
        margin-bottom: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.modal.closeButton};
        border-radius: 10px;
      }
    `};
`;

export const AccordionTriggerHeader = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <AccordionHeader className="AccordionHeader">
      <AccordionTrigger
        className={`AccordionTrigger ${className}`}
        {...props}
        ref={forwardedRef}>
        {children}
        <Icon icon={"chevron_right"} className={"iconStyles"} />
      </AccordionTrigger>
    </AccordionHeader>
  )
);

AccordionTriggerHeader.displayName = `AccordionTriggerHeader`;
