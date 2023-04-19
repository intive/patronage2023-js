import styled from "styled-components";

interface WrapperProps {
  center?: boolean;
}

export const FormWrapper = styled.div<WrapperProps>`
  display: flex;
  height: 542px;
  width: 416px;
  flex-direction: column;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  @media (max-width: 767px) {
    width: 312px;
  }
`;

export const StyledHeader = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-family: "Signika", sans-serif;
  font-size: 1.5em;
  text-align: center;
`;

export const StyledSubHeader = styled.h3`
  margin-top: 4px;
  font-size: 1em;
  text-align: center;
  color: ${({ theme }) => theme.secondary};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
