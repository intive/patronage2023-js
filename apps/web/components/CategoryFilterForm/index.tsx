"use client";
import { Field, Form } from "houseform";
import { useCategoryMap } from "lib/hooks";
import { Checkbox } from "ui";
import { categoryFilterAtom } from "store";
import { useSetAtom } from "jotai";
import { CategoryFilterType } from "lib/types";
import { useQueryClient } from "@tanstack/react-query";
import {
  CategoryIconStyled,
  CategoryTitleStyled,
  CheckboxLabelContentStyled,
  CheckboxListStyled,
  FormStyled,
} from "./CategoryFilterForm.styled";

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
