import styled from "styled-components";
import { ReactNode } from "react";
import { Icon, IconType } from "../Icon";

type BudgetIconProps = {
  icon?: IconType;
  children: ReactNode;
};

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

export const BudgetIcon = ({ icon, children }: BudgetIconProps) => {
  return (
    <BudgetIconStyled>
      {icon ? (
        <>
          <Icon icon={icon} iconSize={40} />
          {children}
        </>
      ) : (
        <>{children}</>
      )}
    </BudgetIconStyled>
  );
};
