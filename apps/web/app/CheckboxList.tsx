"use client";
import categoryMap from "lib/category-map";
import styled from "styled-components";
import { CategoryIcon, Checkbox } from "ui";

const CheckboxListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
  gap: 8px;
  padding: 8px 0;
  list-style: none;
`;

const CategoryTitleStyled = styled.span`
  font-size: 0.875em;
`;

const CheckboxLabelContentStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CategoryIconStyled = styled(CategoryIcon)`
  width: 32px;
  height: 32px;
`;

export const CheckboxList = () => {
  const categories = Object.values(categoryMap);
  return (
    <CheckboxListStyled>
      <>
        {categories.map((category) => {
          const { id, name } = category;
          return (
            <li key={`aside-checkbox-list-item-${id}`}>
              <Checkbox
                label={`category-filter-${name}`}
                id={`category-filter-${id}`}
                name={`category-filter-${name}`}
                onChange={(e) => {
                  console.log(e.currentTarget.checked, " ", name);
                }}>
                <CheckboxLabelContentStyled>
                  <CategoryIconStyled small category={category} />
                  <CategoryTitleStyled>{name}</CategoryTitleStyled>
                </CheckboxLabelContentStyled>
              </Checkbox>
            </li>
          );
        })}
      </>
    </CheckboxListStyled>
  );
};
