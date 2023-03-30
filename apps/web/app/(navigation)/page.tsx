"use client"

import type { Metadata } from "next";
import Link from "next/link";
import styled from "styled-components";
import { Card } from "ui";
import "../css/global.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

const CardWrapperStyled = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height:100%;
    background-color:#E5E5E5;
`
const LinkStyled = styled(Link)`
    align-self: flex-start;
    margin-top:23%;
    font-family: "Signika", sans-serif;
    font-size: 3.5em;
    font-weight: 600;
    color: #1E4C40;
    text-decoration: none;
`
export default function CreateAccountPage() {
    return (
        <CardWrapperStyled>
            <Card className="card-styled">
                <LinkStyled href="/home">Create my free account!</LinkStyled>
            </Card>
        </CardWrapperStyled>
    )
}
