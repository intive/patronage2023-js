"use client"

import { NavList } from "ui"
import { NavItemContents } from "ui/NavList";
import styled from "styled-components";
import { useState } from "react";

//creating array of objects for NavList props
const dummyNavItemContents: Array<NavItemContents> = [
    {
        title: "Bills",
        icon: "payments",
        id: 1,
        active: false,
    },
    {
        title: "Subscriptions",
        icon: "subscriptions",
        id: 2,
        active: false,
    },
    {
        title: "Savings",
        icon: "savings",
        id: 3,
        active: false,
    }
];

//NavListWrapper serving as its parent element - proper presentation
const NavListWrapperStyled = styled.div`
    width:20%;
`

export const NavListDemo = () => {

    const [navItemContents, setNavItemContents] = useState(dummyNavItemContents)
    return (
        <NavListWrapperStyled>
            <NavList contents={navItemContents} setNavItemContents={setNavItemContents}></NavList>
        </NavListWrapperStyled>
    )
}
