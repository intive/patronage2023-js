"use client";

import styled from "styled-components";
import Link from "next/link";
import { Card } from "ui";

export const CardWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #e5e5e5;
  padding: 2%;
`;
export const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;
export const LinkStyled = styled(Link)`
  font-family: "Signika", sans-serif;
  font-size: 2.3em;
  font-weight: 600;
  color: #1e4c40;
`;
export const TypoStyled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 3.5em;
  color: #1e4c40;
`;
