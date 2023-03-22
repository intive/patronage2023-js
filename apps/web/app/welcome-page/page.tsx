"use client"

import styled from "styled-components"

export type CardImitationProps = React.HTMLProps<HTMLDivElement>;

const CardImitationStyled = styled.div<CardImitationProps>`
    display:flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-color: white;
    width:80%;
    height:50rem;
    box-shadow: 0px 2px 6px rgba(32, 41, 50, 0.1);
    border-radius: 16px;
    font-family: "Inter", sans-serif;
`
export default function WelcomePage() {
    //here, components that build WelcomePage
    //side nav item
    //text
    // instead of home and users, bell icon and avatar
    return( 
        <>
            <CardImitationStyled>
                <h1>Welcome to Inbudget</h1>
            </CardImitationStyled>
        </>
    )
}