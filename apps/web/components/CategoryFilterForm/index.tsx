"use client";
import { Field, Form } from "houseform";
import { useCategoryMap } from "lib/category-map";
import styled from "styled-components";
import { CategoryIcon, Checkbox } from "ui";
import { categoryFilterAtom } from "store";
import { useSetAtom } from "jotai";
import { CategoryFilterType } from "lib/types";
import { useQueryClient } from "@tanstack/react-query";

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
  const setCategoryFilter = useSetAtom(categoryFilterAtom);
  const categoryMap = useCategoryMap();
  const categoryEntries = Object.entries(categoryMap);
  const queryClient = useQueryClient();

  return (
    <Form
      onSubmit={(values: CategoryFilterType) => {
        const categoryFilterState: string[] = Object.entries(values)
          .filter(([_, isChecked]) => isChecked)
          .map(([categoryKeyName, _]) => categoryKeyName);

        queryClient.invalidateQueries(["datatable"]);
        setCategoryFilter(categoryFilterState);
      }}>
      {({ submit }) => (
        <FormStyled
          onChange={() => {
            submit();
          }}>
          <CheckboxListStyled>
            {categoryEntries.map(([categoryKey, category]) => {
              const { id, name } = category;
              return (
                <Field
                  name={categoryKey}
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
