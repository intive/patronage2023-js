"use client";
import styled from "styled-components";
import { LinkComponent } from "ui";
import { CategoryFilterForm } from "components";

const CardHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

const CardTitleStyled = styled.h3`
  font-size: 0.875em;
  font-weight: 600;
  color: #7e7e7e; // Neutrals/Gray/6
`;

const CardSettingsLink = styled(LinkComponent)`
  font-size: 0.875em;
  text-decoration: none;
`;

export const AsideCardContent = () => {
  return (
    <>
      <CardHeaderStyled>
        <CardTitleStyled>Categories</CardTitleStyled>
        <CardSettingsLink href={"/"}>Manage</CardSettingsLink>
      </CardHeaderStyled>
      <CategoryFilterForm />
    </>
  );
};
