import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select, CategoryIcon } from "ui";
import styled from "styled-components";
import categoryMap from "web/lib/category-map";

export default {
  title: "Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const SelectTemplate: ComponentStory<typeof Select> = ({
  ...args
}) => {
  const [val, setVal] = useState("");

  return (
    <>
      <Wrapper>
        <Select
          {...args}
        />
      </Wrapper>
      <p>{`Selected value is ${val}`}</p>
    </>
  );
};

export const Normal = SelectTemplate.bind({});
Normal.args = {
  label: "Category",
  categoryMap: categoryMap,
  items: [
    {
      label: "Category 1",
      value: "category-1"
    },
    {
      label: "Category 2",
      value: "category-2"
    },
    {
      label: "Category 3",
      value: "category-3"
    },
  ],
  placeholder: "select a value",
  hasIcon: true,
};

const Wrapper = styled.div`
  width: 300px;
`;
