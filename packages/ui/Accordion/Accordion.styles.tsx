import * as Accordion from "@radix-ui/react-accordion";
import styled from "styled-components";
import React from "react";

export const AccordionRoot = styled(Accordion.Root)`
  width: 100%;
`;
export const AccordionItem = styled(Accordion.Item)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  align-content: center;
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
  cursor: pointer;
  width: 100%;
  font-family: unset;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  background-color: transparent;
  border-width: 0;
  padding: 0;
`;

export const AccordionTriggerHeader = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <AccordionHeader className="AccordionHeader">
      <AccordionTrigger
        className={`AccordionTrigger ${className}`}
        {...props}
        ref={forwardedRef}>
        {children}
      </AccordionTrigger>
    </AccordionHeader>
  )
);

AccordionTriggerHeader.displayName = `AccordionTriggerHeader`;
export const AccordionContent = styled(Accordion.Content)`
  color: ${({ theme }) => theme.accordion.content};
`;
