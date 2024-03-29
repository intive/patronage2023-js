"use client";

import { device } from "lib/media-queries";
import styled from "styled-components";

export const ButtonGroupWrapper = styled.div`
  width: 100%;

  ${device.tablet} {
    width: 380px;
    height: 40px;
  }

  ${device.desktop} {
    width: 430px;
    height: 40px;
  }
`;

export const FilterSearchWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  ${device.desktop} {
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }
`;
