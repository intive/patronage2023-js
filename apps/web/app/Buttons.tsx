"use client";
import "material-symbols";
import 'material-icons/iconfont/material-icons.css';
import styled from "styled-components";
import {NavItem,NavList } from "ui";

//creating dummy data for proper display on web
type ObjectType = {
  title: string;
  active: boolean;
};

type DataType = Array<ObjectType>;
const settingsData:DataType= [{title:"Edit profileeeeeeeeeeeeeeeeeeeeeeeeeeeeee",active:true},{title:"Change password",active:false},{title:"Language",active:false}];


const SpanStyled = styled.span`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
width:100%;
`

export default function Buttons() {
  return (
    <>
      <NavItem active={false}><SpanStyled>Edit profile</SpanStyled></NavItem>
      <NavItem active={true}><SpanStyled>Change password</SpanStyled></NavItem>

      <NavList>
      {settingsData.map((settingData,i) => {
            return(
                <NavItem active={true} key={i++}>
                 <SpanStyled>{settingData.title}</SpanStyled>
                </NavItem>
                )
            }
        )}
      </NavList>
    </>
  );
}
