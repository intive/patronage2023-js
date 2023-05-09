"use client";
import { ReactElement } from "react";
import styled from "styled-components";
import { LinkComponent } from "ui";

type FormFooterProps = {
  basicText: string;
  linkText: string;
  href:string;
};

const FormFooterStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  line-height: 150%;
  margin-top: 42px;
`;

const TextStyled = styled.span`
  color: ${({ theme }) => theme.formfooter.text};
`;

export const FormFooter = ({ basicText, linkText,href }: FormFooterProps) => {
  return (
    <FormFooterStyled>
      <TextStyled>{basicText}</TextStyled>
      <LinkComponent href={href}>{linkText}</LinkComponent>
    </FormFooterStyled>
  );
};
