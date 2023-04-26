"use client";
import { device } from "lib/media";
import styled from "styled-components";
import Link from "next/link";
import { Card } from "ui";

export const CardWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #e5e5e5;
  padding: 25px 25px 25px 0px;
`;

export const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
  padding: 32px 48px;
`;

export const LinkStyled = styled(Link)`
  font-family: "Signika", sans-serif;
  font-size: 1.3em;
  font-weight: 600;
  color: #1e4c40;
  margin-top: 35px;
  padding: 10px;
  @media ${device.desktop} {
    font-size: 2.3em;
  }
`;

export const TypoStyled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 2.8em;
  color: #1e4c40;
  text-align: center;
  padding: 0 10px;
  @media ${device.desktop} {
    font-size: 3.5em;
  }
`;
