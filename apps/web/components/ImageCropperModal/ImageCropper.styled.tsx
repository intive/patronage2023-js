import { device } from "lib/media-queries";
import styled from "styled-components";

export const CropperWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CropperImage = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

export const StyledSpan = styled.span`
  font-family: "Signika", sans-serif;
  font-size: 1.4em;
  color: ${({ theme }) => theme.nav.main};

  ${device.tablet} {
    font-size: 1.5em;
  }
`;
