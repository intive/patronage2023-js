import styled from "styled-components";
import { BudgetUser } from "lib/types";
import { device } from "lib/media-queries";
import { Avatar, Tooltip, PersonalCard } from "ui";
import isAvatarValid from "lib/validations/avatarValidation";
import { HiddenUsers } from "components/HiddenUsers";

type PeopleInBudgetProps = {
  users: BudgetUser[];
};

const StyledWrapper = styled.div`
  font-size: 48px;
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  line-height: 1em;
  margin-left: 8px;

  ${device.tablet} {
    margin-left: 0px;
  }

  > * + * {
    margin-left: -8px;
  }

  ${device.tv} {
    margin-top: 0;
  }
`;

export const StyledCounter = styled.div`
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
  font-size: 10px;
  padding: 3px;

  ${device.tablet} {
    font-size: 14px;
  }
`;

const PeopleInBudget = ({ users }: PeopleInBudgetProps) => {
  const maxUsersToShow = users.length > 4 ? 3 : users.length;
  const visibleUsers = users.slice(0, maxUsersToShow);
  const remainingUsers = users.slice(maxUsersToShow);

  const remainingUserNames = remainingUsers.map((user) => (
    <PersonalCard
      key={user.id}
      triggerComponent={
        <StyledUser>
          {user.firstName} {user.lastName}
        </StyledUser>
      }
      side="right"
      email={user.userEmail}
      image={user.avatar}
      name={`${user.firstName} ${user.lastName}`}
    />
  ));

  return (
    <StyledWrapper>
      {visibleUsers.map((user) => (
        <PersonalCard
          key={user.id}
          triggerComponent={
            <Avatar
              src={
                isAvatarValid(user.avatar)
                  ? user.avatar
                  : "/avatars/default.svg"
              }
              username={`${user.firstName} ${user.lastName}`}
              outlined
            />
          }
          side="bottom"
          name={`${user.firstName} ${user.lastName}`}
          email={user.userEmail}
          image={user.avatar}
        />
      ))}
      {remainingUsers.length > 0 && (
        <HiddenUsers
          remainingUserNames={remainingUserNames}
          remainingUsers={remainingUsers}
        />
      )}
    </StyledWrapper>
  );
};

export default PeopleInBudget;
