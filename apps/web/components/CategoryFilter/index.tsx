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
    console.log(categoryEntries);
    if (checked) {
      setCategoryFilterAtom((prev) => [...prev, name]);
    } else {
      setCategoryFilterAtom((prev) =>
        prev.filter((category) => category !== name)
      );
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
              checked={categoryFilterAtomState.includes(categoryKey)}
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
