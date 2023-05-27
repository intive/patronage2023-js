import styled from "styled-components";

export const UsersListStyled = styled.ul`
  width: 100%;
  overflow-y: auto;
  margin-top: 24px;

  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.textarea.Neutral2};
    border-radius: 10px;
    width: 6px;
    margin-bottom: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.modal.closeButton};
    border-radius: 10px;
  }
`;

export const ShareBudgetWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;
