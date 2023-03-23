import styled from "styled-components";
import { Icon } from "../Icon";

type ErrorMessageProps = {
  message: string;
  onClose: () => void;
};

export const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <ErrorMessageStyled>
      <IconAndMessageWrapperStyled>
        <Icon icon="error" iconSize={20} />
        <MessageStyled>{message}</MessageStyled>
      </IconAndMessageWrapperStyled>
      <CloseButtonStyled onClick={onClose}>
        <Icon icon="close" iconSize={20} />
      </CloseButtonStyled>
    </ErrorMessageStyled>
  );
};

const ErrorMessageStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  background-color: #fceeed;
  color: #922b26;
  border: 2px solid #922b26;
  border-radius: 8px;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const IconAndMessageWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MessageStyled = styled.span`
  padding: 0 10px;
  font-size: 16px;

  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

const CloseButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
`;
