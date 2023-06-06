"use client";
import { device } from "lib/media-queries";
import styled from "styled-components";
import { Card } from "ui";

export const CardWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${({ theme }) => theme.background.loggedIn};
  padding: 25px 25px 25px 0px;
`;

export const CardStyled = styled(Card)`
  display: block;
  min-height: 100%;
  width: 100%;
  padding: 14px 10px;
  height: 100%;
  ${device.tablet} {
    padding: 32px 48px;
  }
`;

export const TypoStyled = styled.h1`
  font-family: "Signika", sans-serif;
  font-size: 2.8em;
  color: ${({ theme }) => theme.nav.main};
  text-align: center;
  padding: 0 10px;
  ${device.desktop} {
    font-size: 3.5em;
  }
`;
export const AsideCard = styled(Card)`
  display: none;
  ${device.desktop} {
    &:empty {
      visibility: hidden;
    }
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: max-content;
    min-width: 288px;
    margin-left: 31px;
    padding: 32px;
    position: sticky;
    top: 94px;
  }
`;
