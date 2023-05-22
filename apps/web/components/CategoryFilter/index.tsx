"use client";
import { useCategoryMap } from "lib/hooks";
import { Checkbox } from "ui";
import { categoryFilterAtom } from "store";
import { useAtom } from "jotai";
import {
  CategoryIconStyled,
  CategoryTitleStyled,
  CheckboxLabelContentStyled,
  CheckboxListStyled,
} from "./CategoryFilter.styled";

export const CategoryFilter = () => {
  const categoryMap = useCategoryMap();
  const [categoryFilterAtomState, setCategoryFilterAtom] =
    useAtom(categoryFilterAtom);
  const categoryEntries = Object.entries(categoryMap);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;

    if (checked) {
      setCategoryFilterAtom([...categoryFilterAtomState, name]);
    } else {
      const newState = [
        ...categoryFilterAtomState.filter(
          (category) => !category.includes(name)
        ),
      ];
      setCategoryFilterAtom(newState);
    }
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
