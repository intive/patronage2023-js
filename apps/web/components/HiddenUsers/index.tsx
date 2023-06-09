import styled from "styled-components";
import { Tooltip } from "ui";
import { ReactNode } from "react";
import { StyledCounter } from "app/(navigation)/budgets/[id]/BudgetBasinInformation/PeopleInBudget";
import { BudgetUser } from "lib/types";
import { device } from "lib/media-queries";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverArrow,
  PopoverContent,
  WrapperPopover,
} from "ui/PersonalCard/PersonalCard.styles";

interface HiddenUsersInterface {
  remainingUserNames: ReactNode;
  remainingUsers: BudgetUser[];
}

const WrapperRemainingUsers = styled.div`
  display: flex;
  flex-direction: column;
`;

const TooltipWrapper = styled.div`
  display: none;
  ${device.tablet} {
    display: block;
  }
`;

export const HiddenUsers = ({
  remainingUserNames,
  remainingUsers,
}: HiddenUsersInterface) => {
  return (
    <>
      <TooltipWrapper>
        <Tooltip
          text={
            <WrapperRemainingUsers>{remainingUserNames}</WrapperRemainingUsers>
          }
          position="bottom">
          <StyledCounter>
            <span>{remainingUsers.length}</span>
          </StyledCounter>
        </Tooltip>
      </TooltipWrapper>
      <WrapperPopover>
        <PopoverRoot>
          <PopoverTrigger asChild>
            <StyledCounter>
              <span>{remainingUsers.length}</span>
            </StyledCounter>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent side="right">
              {
                <WrapperRemainingUsers>
                  {remainingUserNames}
                </WrapperRemainingUsers>
              }
              <PopoverArrow />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </WrapperPopover>
    </>
  );
};
