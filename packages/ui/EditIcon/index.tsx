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
  flex-shrink: 0;
  line-height: 0;
`;

export const EditIcon = ({ onClick }: EditIconInterface) => {
  const theme = useContext(ThemeContext);
  return (
    <EditIconStyled onClick={onClick}>
        <Icon icon="edit" color={theme.editIcon.main}/>
    </EditIconStyled>
  );
};
