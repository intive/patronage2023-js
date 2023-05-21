"use client";
import { useCategoryMap } from "lib/hooks";
import { Checkbox } from "ui";
import { categoryFilterAtom } from "store";
import { useSetAtom } from "jotai";
import { CategoryFilterType } from "lib/types";
import {
  CategoryIconStyled,
  CategoryTitleStyled,
  CheckboxLabelContentStyled,
  CheckboxListStyled,
} from "./CategoryFilter.styled";
import { useState } from "react";

export const CategoryFilter = () => {
  const categoryMap = useCategoryMap();
  const setCategoryFilterAtom = useSetAtom(categoryFilterAtom);
  const categoryEntries = Object.entries(categoryMap);

  const categoryFilterInit: CategoryFilterType = Object.keys(
    categoryMap
  ).reduce(
    (acc, category): CategoryFilterType => ({
      ...acc,
      [category]: false,
    }),
    {} as CategoryFilterType
  );

  const [categoryFilterInner, setCategoryFilterInner] =
    useState<CategoryFilterType>(categoryFilterInit);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    const newFilterState = {
      ...categoryFilterInner,
      [name as keyof CategoryFilterType]: checked,
    };

    const categoryFilterState: string[] = Object.entries(newFilterState)
      .filter(([_, isChecked]) => isChecked)
      .map(([categoryKeyName, _]) => categoryKeyName);

    setCategoryFilterAtom(categoryFilterState);
    setCategoryFilterInner(newFilterState);
  };

  return (
    <CheckboxListStyled>
      {categoryEntries.map(([categoryKey, category]) => {
        const { id, name } = category;
        return (
          <li key={`aside-checkbox-list-field-${id}`}>
            <Checkbox
              label={`category-filter-${name}`}
              id={`category-filter-${id}`}
              name={categoryKey}
              onChange={onCheckboxChange}>
              <CheckboxLabelContentStyled>
                <CategoryIconStyled small category={category} />
                <CategoryTitleStyled>{name}</CategoryTitleStyled>
              </CheckboxLabelContentStyled>
            </Checkbox>
          </li>
        );
      })}
    </CheckboxListStyled>
  );
};
