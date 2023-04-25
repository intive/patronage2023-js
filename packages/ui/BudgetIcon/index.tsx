import styled from "styled-components";
import { Icon, IconType } from "../Icon";

type BudgetIconProps = {
  icon?: IconType;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

const BudgetIconStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.budgetIcon.background};
  color: ${({ theme }) => theme.budgetIcon.main};
`;

const IconExtended = styled(Icon)`
  font-size: 2em;
`;

export const BudgetIcon = ({ icon, className, children }: BudgetIconProps) => {
  return (
    <BudgetIconStyled className={className}>
      {icon ? <IconExtended icon={icon} /> : children}
    </BudgetIconStyled>
  );
};
