"use client"

import styled from "styled-components"
import { Card } from "ui";

const TypoStyled = styled.h1`
    display:flex;
    align-self: flex-start;
    margin-top:23%;
    font-family: "Inter", sans-serif;
    font-size: 3.5em;
    color: #1E4C40;
`
const CardWrapperStyled = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:#E5E5E5;
    height:94vh;
`
export default function WelcomePage() {
    return (
        <CardWrapperStyled>
            <Card minWidth="70%" minHeight="95%">
                <TypoStyled>Welcome to Inbudget</TypoStyled>
            </Card>
        </CardWrapperStyled>
    )
}