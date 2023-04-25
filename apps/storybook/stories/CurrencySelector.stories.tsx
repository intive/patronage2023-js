import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CurrencySelect } from "ui";
import styled from "styled-components";

export default {
    title: "Currency Select",
    component: CurrencySelect,
} as ComponentMeta<typeof CurrencySelect>;

const CurrencySelectTemplate: ComponentStory<typeof CurrencySelect> = ({...args }) => (
    <StyledDiv><CurrencySelect {...args}/></StyledDiv>
);

export const Select = CurrencySelectTemplate.bind({});
Select.args = {
    label: "Currency"
};

const StyledDiv = styled.div`
  width: 206px;  
`;
