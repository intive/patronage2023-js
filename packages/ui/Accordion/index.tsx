import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTriggerHeader,
  StylingDiv,
} from "./Accordion.styles";
import React from "react";

type AccordionProps = {
  header: string;
  content: React.ReactNode | string;
  maxHeight?: string;
  className?: string;
};

export const Accordion = ({
  header,
  content,
  maxHeight,
  className,
}: AccordionProps) => {
  return (
    <AccordionRoot type="single" className={className} collapsible>
      <AccordionItem value={header}>
        <AccordionTriggerHeader>{header}</AccordionTriggerHeader>
        <AccordionContent asChild>
          <StylingDiv maxHeight={maxHeight}>{content}</StylingDiv>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
};
