"use client";
import { Field, Form } from "houseform";
import categoryMap from "lib/category-map";
import styled from "styled-components";
import { CategoryIcon, Checkbox } from "ui";

const FormStyled = styled.form`
  width: 100%;
  height: 100%;
`;

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

export const CategoryFilterForm = () => {
  const categories = Object.values(categoryMap);
  return (
    <Form
      onSubmit={(values) => {
        console.log(values);
      }}>
      {({ submit }) => (
        <FormStyled
          onChange={() => {
            submit();
          }}>
          <CheckboxListStyled>
            {categories.map((category) => {
              const { id, name } = category;
              return (
                <Field
                  name={name}
                  initialValue={false}
                  key={`aside-checkbox-list-field-${id}`}>
                  {({ value, setValue }) => (
                    <li>
                      <Checkbox
                        label={`category-filter-${name}`}
                        checked={value}
                        id={`category-filter-${id}`}
                        name={`category-filter-${name}`}
                        onChange={(e) => {
                          setValue(e.currentTarget.checked);
                        }}>
                        <CheckboxLabelContentStyled>
                          <CategoryIconStyled small category={category} />
                          <CategoryTitleStyled>{name}</CategoryTitleStyled>
                        </CheckboxLabelContentStyled>
                      </Checkbox>
                    </li>
                  )}
                </Field>
              );
            })}
          </CheckboxListStyled>
        </FormStyled>
      )}
    </Form>
  );
};
