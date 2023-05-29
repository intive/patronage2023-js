import styled from "styled-components";

export const ListItemStyled = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 16px 0;
`;

export const LabelStyled = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const AvatarWrapperStyled = styled.div`
  display: flex;
  font-size: 48px;
  margin: 0 16px 0 8px;
`;

export const UsersListStyled = styled.ul`
  width: 100%;
  overflow-y: auto;
  margin-top: 24px;
  padding-right: 8px;

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
