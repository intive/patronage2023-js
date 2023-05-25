import styled from "styled-components";
import { Icon, IconType } from "../Icon";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

interface NavBudgetIcon {
  onClick: () => void;
  icon: IconType;
  className?: string;
}

const NavBudgetIconStyled = styled.button<NavBudgetIcon>`
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.editIcon.background};
  height: 3em;
  width: 3em;
  border-radius: 8px;
  flex-shrink: 0;
  line-height: 0;
`;

export const NavBudgetIcon = ({ onClick, icon, className }: NavBudgetIcon) => {
  const theme = useContext(ThemeContext);
  return (
    <NavBudgetIconStyled onClick={onClick} icon={icon} className={className}>
      <Icon icon={icon} color={theme.editIcon.main} />
    </NavBudgetIconStyled>
  );
};
