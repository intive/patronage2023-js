"use client"

import styled from "styled-components";
import { Card } from "ui";
import "../css/global.css";

const CardWrapperStyled = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:#E5E5E5;
    height:100%;
`
const TypoStyled = styled.h1`
    align-self: flex-start;
    margin-top:23%;
    font-family: "Inter", sans-serif;
    font-size: 3.5em;
    color: #1E4C40;
`
export default function WelcomePage() {
    return (
        <CardWrapperStyled>
            <Card className="card-styled">
                <TypoStyled>Welcome to Inbudget</TypoStyled>
            </Card>
        </CardWrapperStyled>
    )
}
