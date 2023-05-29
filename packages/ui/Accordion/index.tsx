import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTriggerHeader,
} from "./Accordion.styles";
import React from "react";

type AccordionProps = {
  header: string;
  content: React.ReactNode | string;
  className?: string;
};

export const Accordion = ({ header, content, className }: AccordionProps) => {
  return (
    <AccordionRoot type="single" className={className} collapsible>
      <AccordionItem value="Key">
        <AccordionTriggerHeader>{header}</AccordionTriggerHeader>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
};
