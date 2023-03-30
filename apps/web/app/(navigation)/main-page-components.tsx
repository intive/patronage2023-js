"use client"

import Link from "next/link";
import styled from "styled-components";
import { Card } from "ui";

export const CardWrapperStyled = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height:100%;
    background-color:#E5E5E5;
`
export const CardStyled = styled(Card)`
    min-width: 95%;
    min-height: 95%;
`
export const LinkStyled = styled(Link)`
    align-self: flex-start;
    margin-top:23%;
    font-family: "Signika", sans-serif;
    font-size: 3.5em;
    font-weight: 600;
    color: #1E4C40;
    text-decoration: none;
`
