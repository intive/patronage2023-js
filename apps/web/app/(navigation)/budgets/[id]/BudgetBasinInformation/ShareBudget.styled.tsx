import { device } from "lib/media-queries";
import styled from "styled-components";
import { Separator } from "ui";

export const ListItemStyled = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

export const LabelStyled = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 90%;
  overflow: hidden;
`;

export const AvatarWrapperStyled = styled.div`
  display: flex;
  font-size: 48px;
  margin: 0 16px 0 8px;
`;

export const NameAndEmailWrapperStyled = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const NameStyled = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EmailStyled = styled.p`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
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
  flex-grow: 1;
  width: 311px;
  overflow-y: hidden;

  ${device.tablet} {
    width: 464px;
  }
`;

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SeparatorAndButtonWrapperStyled = styled.div`
  width: 100%;
`;
