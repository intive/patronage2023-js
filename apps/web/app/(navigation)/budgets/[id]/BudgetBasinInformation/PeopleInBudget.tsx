import styled from "styled-components";
import { BudgetUser } from "lib/types";
import { device } from "lib/media-queries";
import isAvatarValid from "lib/validations/avatarValidation";
import { Avatar, Tooltip } from "ui";

type PeopleInBudgetProps = {
  users: BudgetUser[];
};

const StyledWrapper = styled.div`
  font-size: 48px;
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  line-height: 1em;

  > * + * {
    margin-left: -8px;
  }

  ${device.tv} {
    margin-top: 0;
  }
`;

const StyledCounter = styled.div`
  border: 2px solid ${({ theme }) => theme.avatar.outline};
  background-color: ${({ theme }) => theme.avatar.aggregator};
  color: ${({ theme }) => theme.avatar.outline};
  border: 2px solid ${({ theme }) => theme.avatar.outline};
  border-radius: 50%;
  width: 1em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 12px;
    font-weight: 600;
  }
`;

const StyledUser = styled.div`
  padding: 3px;
`;

const PeopleInBudget = ({ users }: PeopleInBudgetProps) => {
  const maxUsersToShow = users.length > 4 ? 3 : users.length;
  const visibleUsers = users.slice(0, maxUsersToShow);
  const remainingUsers = users.slice(maxUsersToShow);

  const remainingUserNames = remainingUsers.map((user) => (
    <StyledUser key={user.id}>
      {user.firstName} {user.lastName}
    </StyledUser>
  ));

  return (
    <StyledWrapper>
      {visibleUsers.map((user) => (
        <Tooltip
          key={user.id}
          text={`${user.firstName} ${user.lastName}`}
          position="bottom">
          <Avatar
            src={
              isAvatarValid(user.avatar) ? user.avatar : "/avatars/default.svg"
            }
            username={`${user.firstName} ${user.lastName}`}
            outlined
          />
        </Tooltip>
      ))}
      {remainingUsers.length > 0 && (
        <Tooltip text={remainingUserNames} position="bottom">
          <StyledCounter>
            <span>{remainingUsers.length}</span>
          </StyledCounter>
        </Tooltip>
      )}
    </StyledWrapper>
  );
};

export default PeopleInBudget;
