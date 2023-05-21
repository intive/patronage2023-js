"use client";

import { device } from "lib/media-queries";
import styled from "styled-components";

export const ButtonGroupWrapper = styled.div`
  width: 100%;

  ${device.tablet} {
    width: 350px;
    height: 40px;
  }
`;

export const FilterSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`;
