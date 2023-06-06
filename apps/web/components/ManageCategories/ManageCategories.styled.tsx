import styled from "styled-components";

interface ColorProps {
  color?: string;
}

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  height: 100%;
`;

export const CategoryRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledButton = styled.button<ColorProps>`
  cursor: pointer;
  border: none;
  height: 2.5em;
  width: 2.5em;
  border-radius: 8px;
  flex-shrink: 0;
  line-height: 0;
  background-color: ${({ theme, color }) =>
    color ? color : theme.dropdownMenu.border};
  /* make icons more visible */
  ${({ color }) =>
    color && `filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.4));`}
`;

export const Input = styled.input`
  padding: 8px;
  width: 200px;
  border-radius: 4px;
  border: none;
  outline: 2px solid ${({ theme }) => theme.dropdownMenu.border};
`;

export const Submit = styled(StyledButton)`
  width: fit-content;
  background: ${({ theme }) => theme.main};
  color: white;
  padding: 8px;
  margin-block: 10px;
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
