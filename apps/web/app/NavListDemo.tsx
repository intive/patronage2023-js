"use client"

import { NavList } from "ui"
import { NavItemContents } from "ui/NavList";
import styled from "styled-components";

//creating array of objects for NavList props
const navItemContents: Array<NavItemContents> = [
    {
        title: "Bills",
        icon: "payments",
        id: 1
    },
    {
        title: "Subscriptions",
        icon: "subscriptions",
        id: 2
    },
    {
        title: "Savings",
        icon: "savings",
        id: 3
    }
];

//NavListWrapper serving as its parent element - proper presentation
const NavListWrapperStyled = styled.div`
    width:20%;
`

export const NavListDemo = () => {
    return (
        <NavListWrapperStyled>
            <NavList contents={navItemContents}></NavList>
        </NavListWrapperStyled>
    )
}
