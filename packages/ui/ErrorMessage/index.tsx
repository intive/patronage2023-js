import styled from "styled-components";
import { Icon } from "../Icon";

type ErrorMessageProps = {
  message: string;
  onClose: () => void;
};

export const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <ErrorMessageStyled>
      <MessageWrapperStyled>
        <Icon icon="error" iconSize={20} />
        <MessageStyled>{message}</MessageStyled>
      </MessageWrapperStyled>
      <CloseButtonStyled onClick={onClose}>
        <Icon icon="close" />
      </CloseButtonStyled>
    </ErrorMessageStyled>
  );
};

const ErrorMessageStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 20px;
  background-color: #fceeed;
  color: #ab322c;
  border-radius: 8px;
`;

const MessageWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MessageStyled = styled.span`
  padding: 0 10px;
`;

const CloseButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
`;
