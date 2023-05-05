import styled from "styled-components";
import { Icon } from "../Icon";

interface EditIconInterface {
  onClick: () => void;
}

const EditIconStyled = styled.button<EditIconInterface>`
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.editIcon.background};
  height: 2.5em;
  width: 2.5em;
  border-radius: 8px;
`;

const Wrapper = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.editIcon.main};

  &:hover {
    cursor: pointer;
  }
`;

export const EditIcon = ({ onClick }: EditIconInterface) => {
  return (
    <EditIconStyled onClick={onClick}>
      <Wrapper>
        <Icon icon="edit" />
      </Wrapper>
    </EditIconStyled>
  );
};
