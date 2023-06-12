"use client";
import styled from "styled-components";
import { LinkComponent } from "ui";

type FormFooterProps = {
  basicText: string;
  linkText: string;
  href: string;
};

const FormFooterStyled = styled.div`
  font-size: 16px;
  line-height: 150%;
  margin-top: 42px;
`;

const TextStyled = styled.span`
  color: ${({ theme }) => theme.formFooter.text};
`;

export const FormFooter = ({ basicText, linkText, href }: FormFooterProps) => {
  return (
    <FormFooterStyled>
      <TextStyled>{`${basicText} `}</TextStyled>
      <LinkComponent href={href}>{linkText}</LinkComponent>
    </FormFooterStyled>
  );
};
