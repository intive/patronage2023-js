"use client"

import { NavList } from "ui"
import { NavItemContents } from "ui/NavList";
import styled from "styled-components";

//creating array of objects for NavList props
export const dummyNavItemContents: Array<NavItemContents> = [
    {
        title: "Bills",
        icon: "payments",
        href: "/",
        id: 1,
    },
    {
        title: "Subscriptions",
        icon: "subscriptions",
        href: "#",
        id: 2,
    },
    {
        title: "Savings",
        icon: "savings",
        href: "#",
        id: 3,
    }
];

//NavListWrapper serving as its parent element - proper presentation
const NavListWrapperStyled = styled.div`
    width:20%;
`

export default function NavListDemo() {
    return (
        <>
            <NavListWrapperStyled>
                <NavList contents={dummyNavItemContents}></NavList>
            </NavListWrapperStyled>
        </>
    )
}
