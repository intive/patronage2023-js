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
};

export const Accordion = ({ header, content }: AccordionProps) => {
  return (
    <AccordionRoot type="single" collapsible>
      <AccordionItem value="Key">
        <AccordionTriggerHeader>{header}</AccordionTriggerHeader>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
};
