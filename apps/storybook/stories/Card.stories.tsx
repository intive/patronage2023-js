import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Card } from "ui";

export default {
	title: "Card",
	component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = ({ children, ...args }) => (
	<Card {...args}>{children}</Card>
);

const TemplateWithParent: ComponentStory<typeof Card> = ({
	children,
	...args
}) => (
	<div
		style={{ width: "500px", height: "300px", backgroundColor: "lightblue" }}>
		<Card {...args}>{children}</Card>
	</div>
);

export const BasicCard = Template.bind({});
BasicCard.args = {
	padding: "20px",
	margin: "",
	children: <img src="form_img.png" alt="" height={350} />,
};

export const CardInParentElement = TemplateWithParent.bind({});
CardInParentElement.args = {
	horizontalFit: false,
	verticalFit: false,
	padding: "",
	margin: "",
	children: <img src="form_img.png" alt="" height={200} />,
};
