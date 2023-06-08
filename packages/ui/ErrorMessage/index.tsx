import styled from "styled-components";
import { Icon } from "../Icon";

type ErrorMessageProps = {
  message: string;
  onClose: () => void;
} & React.HTMLProps<HTMLDivElement>;

export const ErrorMessage = ({
  message,
  onClose,
  className,
}: ErrorMessageProps) => {
  return (
    <ErrorMessageStyled className={className}>
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
  background-color: ${({ theme }) => theme.errorMessage.background};
  color: ${({ theme }) => theme.errorMessage.main};
  border: 2px solid ${({ theme }) => theme.errorMessage.main};
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
