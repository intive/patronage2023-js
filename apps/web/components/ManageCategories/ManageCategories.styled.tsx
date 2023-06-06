import styled from "styled-components";
import { Button } from "ui";

interface ColorProps {
  color?: string;
}

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  position: relative;
`;

export const CategoryRow = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export const StyledButton = styled.button<ColorProps>`
  cursor: pointer;
  border: none;
  width: 4em;
  height: 4em;
  border-radius: 8px;
  flex-shrink: 0;
  line-height: 0;
  background-color: ${({ color }) => color && color};
  /* make icons more visible */
  ${({ color }) =>
    color && `filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.4));`}
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
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
`;

export const ErrorMessageWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`;

export const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
`;

export const Submit = styled(Button)`
  margin-block: 16px;
`;
