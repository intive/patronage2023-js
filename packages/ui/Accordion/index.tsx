import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
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
        <AccordionHeader>
          <AccordionTrigger>{header}</AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
};
