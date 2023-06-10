"use client";
import { useCategoryMap, useTranslate } from "lib/hooks";
import { Checkbox, Separator } from "ui";
import { categoryFilterAtom } from "store";
import { useAtom } from "jotai";
import {
  CategoryIconStyled,
  CategoryTitleStyled,
  CheckboxLabelContentStyled,
  CheckboxListStyled,
  StyledAccordion,
  StyledButton,
  StyledSeparator,
} from "./CategoryFilter.styled";
import { budgetCategories, categoryModalAtom } from "store/store";
import ManageCategories from "components/ManageCategories";

export const CategoryFilter = () => {
  const categoryMap = useCategoryMap();
  const [categoryFilterAtomState, setCategoryFilterAtom] =
    useAtom(categoryFilterAtom);
  const [userCategories] = useAtom(budgetCategories);
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
    <>
      <CheckboxListStyled>
        {categoryEntries.map(([categoryKey, category]) => {
          const { categoryId, name } = category;
          return (
            <li key={`aside-checkbox-list-field-${categoryId}`}>
              <Checkbox
                label={`category-filter-${name}`}
                id={`category-filter-${categoryId}`}
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
      <StyledSeparator />
      <CheckboxListStyled>
        {Object.values(userCategories).map((category) => {
          const { categoryId, name } = category;
          return (
            <li key={`aside-checkbox-list-field-${categoryId}`}>
              <Checkbox
                label={`category-filter-${name}`}
                id={`category-filter-${categoryId}`}
                name={name}
                checked={categoryFilterAtomState.includes(name!)}
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
    </>
  );
};

const MobileFilter = () => {
  const [_, setModal] = useAtom(categoryModalAtom);
  const { t, dict } = useTranslate("AsideCard");
  return (
    <>
      <StyledButton onClick={() => setModal(true)}>
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
      content={
        <>
          <MobileFilter />
          <ManageCategories />
        </>
      }
    />
  );
};
