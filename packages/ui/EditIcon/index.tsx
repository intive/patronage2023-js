import styled from "styled-components";
import { Icon, IconType } from "../Icon";

interface EditIconInterface {
  onClick: () => void;
}

const EditIconStyled = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 2.5em;
  width: 2.5em;
  border-radius: 8px;
  background-color: #f7f7f7;
  color: #7e7e7e;

  &:hover {
    cursor: pointer;
  }
`;

export const EditIcon = ({ onClick }: EditIconInterface) => {
  return (
    <EditIconStyled onClick={onClick}>
      <Icon icon="edit" />
    </EditIconStyled>
  );
};
