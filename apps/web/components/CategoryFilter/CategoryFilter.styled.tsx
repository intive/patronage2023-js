import styled, { css } from "styled-components";
import { Accordion, CategoryIcon, Separator } from "ui";
import { device } from "lib/media-queries";

interface Props {
  limit?: boolean;
}

export const CheckboxListStyled = styled.ul<Props>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  gap: 8px;
  padding: 8px 0;
  list-style: none;

  ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 8px;
  }

  ${device.desktop} {
    display: flex;
    gap: 8px;
  }

  ${({ limit }) =>
    limit &&
    css`
      justify-content: flex-start;
      margin-top: 10px;
      height: 200px;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        background-color: ${({ theme }) => theme.textarea.disabled};
        border-radius: 10px;
        width: 6px;
        margin-bottom: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.modal.closeButton};
        border-radius: 10px;
      }
    `}
`;

export const CategoryTitleStyled = styled.span`
  font-size: 0.875em;

  ${device.tablet} {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 130px;
  }
`;

export const CheckboxLabelContentStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CategoryIconStyled = styled(CategoryIcon)`
  width: 32px;
  height: 32px;
`;

export const StyledAccordion = styled(Accordion)`
  flex-basis: 100%;
  ${device.desktop} {
    display: none;
  }
`;

export const StyledButton = styled.button`
  background-color: transparent;
  border-width: 0;
  padding: 0;
  color: inherit;
  margin: 0.7em 2em 0 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.8em;
  align-self: end;
`;

export const StyledSeparator = styled(Separator)`
  width: 100%;
`;
