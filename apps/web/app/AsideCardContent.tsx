"use client";
import styled from "styled-components";
import { LinkComponent } from "ui";
import { CheckboxList } from "./CheckboxList";

//creating imitation of RightCard content
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

//it stands for component that will be passed into MultiCardLayout in AsideCard
//did not yet applied dictionary because it's a dummy component only for initial presentation
export const AsideCardContent = () => {
  return (
    <>
      <CardHeaderStyled>
        <CardTitleStyled>Categories</CardTitleStyled>
        <CardSettingsLink href={"/"}>Manage</CardSettingsLink>
      </CardHeaderStyled>
      <CheckboxList />
    </>
  );
};
