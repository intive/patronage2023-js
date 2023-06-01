"use client";
import { useCategoryMap, useTranslate } from "lib/hooks";
import { Checkbox } from "ui";
import { categoryFilterAtom } from "store";
import { useAtom } from "jotai";
import {
  CategoryIconStyled,
  CategoryTitleStyled,
  CheckboxLabelContentStyled,
  CheckboxListStyled,
  StyledAccordion,
  StyledButton,
} from "./CategoryFilter.styled";

export const CategoryFilter = () => {
  const categoryMap = useCategoryMap();
  const [categoryFilterAtomState, setCategoryFilterAtom] =
    useAtom(categoryFilterAtom);
  const categoryEntries = Object.entries(categoryMap);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;

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

const MobileFilter = () => {
  const { t, dict } = useTranslate("AsideCard");
  return (
    <>
      <StyledButton onClick={() => {}}>
        {t(dict.categories.settings)}
      </StyledButton>
      <CategoryFilter />
    </>
  );
};

export const MobileCategorySearch = () => {
  const { t, dict } = useTranslate("AsideCard");

  return (
    <StyledAccordion
      header={t(dict.categories.title)}
      content={<MobileFilter />}
    />
  );
};
