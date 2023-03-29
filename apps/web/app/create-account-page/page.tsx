"use client"

import styled from "styled-components"
import { Card } from "ui";
import Link from "next/link"
import "../css/body.css"

const LinkStyled = styled(Link)`
    display:flex;
    align-self: flex-start;
    margin-top:23%;
    font-family: "Inter", sans-serif;
    font-size: 3.5em;
    font-weight: 600;
    color: #1E4C40;
    text-decoration: none;
`
const CardWrapperStyled = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:#E5E5E5;
    height:100%;
`
export default function CreateAccountPage() {
    return (
        <CardWrapperStyled>
            <Card minWidth="95%" minHeight="95%">
                <LinkStyled href="/welcome-page">Create my free account!</LinkStyled>
            </Card>
        </CardWrapperStyled>
    )
}
