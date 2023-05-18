import styled from "styled-components";
import { CategoryIcon } from "ui";

export const FormStyled = styled.form`
  width: 100%;
  height: 100%;
`;

export const CheckboxListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
  gap: 8px;
  padding: 8px 0;
  list-style: none;
`;

export const CategoryTitleStyled = styled.span`
  font-size: 0.875em;
`;

export const CheckboxLabelContentStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const CategoryIconStyled = styled(CategoryIcon)`
  width: 32px;
  height: 32px;
`;
