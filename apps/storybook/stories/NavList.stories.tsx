import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NavItem,NavList} from "ui";
import styled from "styled-components";

//creating dummy data for proper display on storybook 
type ObjectType = {
  title: string;
  active: boolean;
};

type DataType = Array<ObjectType>;
const settingsData:DataType= [{title:"Edit profileeeeeeeeeeeeeeeeeeeeeeeeeeeeee",active:true},{title:"Change password",active:false},{title:"Language",active:false}];

export default {
  title: "Nav List",
  component: NavList,
  parameters: {
    docs: {
      description: {
        component: 'Navigation list that positions its children vertically at full width. ',
      },
    },
  },
} as ComponentMeta<typeof NavList>;

const Template: ComponentStory<typeof NavList> = ({ children, ...args }) => (
  <NavList {...args}>{children}</NavList>
);

const SpanStyled = styled.span`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
width:100%;
`
export const Regular = Template.bind({});
Regular.args = {
  children: (
    <>
    {settingsData.map((settingData,i) => {
            return(
                <NavItem active={false} key={i++}>
                 <SpanStyled>{settingData.title}</SpanStyled>
                </NavItem>
                )
            }
        )}
    </>
  ),
}

//list with one active listItem, just to show in storybook
export const OneElementActive = Template.bind({});
OneElementActive.args = {
    children: (
        <>
        {settingsData.map((settingData,i) => {
                return(
                    <NavItem active={settingData.active} key={i++}>
                      <SpanStyled>{settingData.title}</SpanStyled>
                    </NavItem>
                    )
                }
            )}
        </>
      )
};


OneElementActive.parameters = {
  docs: {
    description: {
      story: 'Imitation of component\'s behavior - when item has been clicked, it changes its color, background color and adds an icon on the right.',
    },
  },
};