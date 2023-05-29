import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select, CategoryIcon } from "ui";
import styled from "styled-components";
import categoryMap from "web/lib/category-map";

export default {
  title: "Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const SelectTemplate: ComponentStory<typeof Select> = ({ ...args }) => {
  const [val, setVal] = useState<string | undefined>(args.value);

  return (
    <>
      <Wrapper>
        <Select
          {...args}
          onValueChange={(newVal) => setVal(newVal)}
          value={val}
        />
      </Wrapper>
      <p>{`Selected value is ${val}`}</p>
    </>
  );
};

const Wrapper = styled.div`
  width: 300px;
`;

const CategoryWrapperStyled = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryNameStyled = styled.p`
  height: 100%;
  padding: 0 16px;
`;

export const Normal = SelectTemplate.bind({});
Normal.args = {
  label: "Category",
  items: [
    {
      label: "Category 1",
      value: "category-1",
    },
    {
      label: "Category 2",
      value: "category-2",
    },
    {
      label: "Category 3",
      value: "category-3",
    },
  ],
  hasIcon: true,
};

export const Categories = SelectTemplate.bind({});
Categories.args = {
  label: "Categories",
  items: [
    {
      label: (
        <CategoryWrapperStyled>
          <CategoryIcon small category={categoryMap.HomeSpendings} />
          <CategoryNameStyled>Category name 1</CategoryNameStyled>
        </CategoryWrapperStyled>
      ),
      value: "category-1",
    },
    {
      label: (
        <CategoryWrapperStyled>
          <CategoryIcon small category={categoryMap.Subscriptions} />
          <CategoryNameStyled>Category name 2</CategoryNameStyled>
        </CategoryWrapperStyled>
      ),
      value: "category-2",
    },
    {
      label: (
        <CategoryWrapperStyled>
          <CategoryIcon small category={categoryMap.Grocery} />
          <CategoryNameStyled>Category name 3</CategoryNameStyled>
        </CategoryWrapperStyled>
      ),
      value: "category-3",
    },
  ],
  hasIcon: true,
  value: "category-3",
};

export const WithError = SelectTemplate.bind({});
WithError.args = {
  label: "Category",
  items: [
    {
      label: "Category 1",
      value: "category-1",
    },
    {
      label: "Category 2",
      value: "category-2",
    },
    {
      label: "Category 3",
      value: "category-3",
    },
  ],
  hasIcon: true,
  error: "Select something!",
};

