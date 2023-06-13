import styled, { css } from "styled-components";
import { device } from "lib/media-queries";
import { ButtonGroup } from "ui";

interface WrapperProps {
  center?: boolean;
}

export const ButtonGroupStyled = styled(ButtonGroup)`
  max-height: 42px;
  margin-block: 10px;
`;

export const FormWrapperStyle = css`
  height: 578px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media only screen and (min-width: 375px) {
    width: 312px;
  }

  ${device.tablet} {
    margin-top: 10px;
  }

  ${device.desktop} {
    margin-top: 0;
    width: 416px;
  }
`;

export const FormWrapper = styled.div<WrapperProps>`
  ${FormWrapperStyle}
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
`;

export const SwitcherWrapper = styled.div`
  height: 50px;
  margin-bottom: 10px;
`;

export const StyledHeader = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-family: "Signika", sans-serif;
  font-size: 1.5em;
  text-align: center;
`;

export const StyledSubHeader = styled.h3`
  margin-top: 4px;
  font-weight: 400;
  font-size: 1em;
  text-align: center;
  color: ${({ theme }) => theme.secondary};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const CropperStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-block: 10px;
`;

export const CroppSectionButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const CustomSectionWrapper = styled.div`
  height: 100%;
  max-height: 208px;
  margin-bottom: 8px;
`;
