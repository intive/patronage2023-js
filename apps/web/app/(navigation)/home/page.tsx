"use client"

import styled from "styled-components";
import { Card } from "ui";

const CardWrapperStyled = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:#E5E5E5;
    height:100%;
`
const CardStyled = styled(Card)`
    min-width: 95%;
    min-height: 95%;
`
export const TypoStyled = styled.h1`
    font-family: "Signika", sans-serif;
    font-size: 3.5em;
    color: #1E4C40;
`
export default function WelcomePage() {
    return (
        <CardWrapperStyled>
            <CardStyled>
                <TypoStyled>Welcome to Inbudget</TypoStyled>
            </CardStyled>
        </CardWrapperStyled>
    )
}
