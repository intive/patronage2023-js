import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CategorySelector } from "ui";
import styled from "styled-components";
import categoryMap from "web/lib/category-map";

export default {
  title: "Category Selector",
  component: CategorySelector,
} as ComponentMeta<typeof CategorySelector>;

const CategorySelectorTemplate: ComponentStory<typeof CategorySelector> = ({
  ...args
}) => {
  const [val, setVal] = useState("");

  return (
    <>
      <Wrapper>
        <CategorySelector
          {...args}
          onValueChange={(newVal) => setVal(newVal)}
        />
      </Wrapper>
      <p>{`Selected value is ${val}`}</p>
    </>
  );
};
export const Select = CategorySelectorTemplate.bind({});
Select.args = {
  label: "Category",
  categoryMap: categoryMap,
};

const CategorySelectorWithErrorTemplate: ComponentStory<
  typeof CategorySelector
> = ({ ...args }) => {
  const [val, setVal] = useState("");

  return (
    <>
      <Wrapper>
        <CategorySelector
          {...args}
          onValueChange={(newVal) => setVal(newVal)}
          errors={val ? [] : ["Please select the category"]}
        />
      </Wrapper>
      <p>{`Selected value is ${val}`}</p>
    </>
  );
};
export const WithError = CategorySelectorWithErrorTemplate.bind({});
WithError.args = {
  label: "Category",
  categoryMap: categoryMap,
};

const Wrapper = styled.div`
  width: 300px;
`;
