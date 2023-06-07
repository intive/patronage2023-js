import styled from "styled-components";
import { BudgetUser } from "lib/types";
import { device } from "lib/media-queries";
import { Avatar, Tooltip, PersonalCard } from "ui";

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

const WrapperRemainingUsers = styled.div`
  display: flex;
  flex-direction: column;
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
              src={user.avatar}
              username={`${user.firstName} ${user.lastName}`}
              outlined
            />
          }
          name={`${user.firstName} ${user.lastName}`}
          email={user.userEmail}
          image={user.avatar}
        />
      ))}
      {remainingUsers.length > 0 && (
        <Tooltip
          text={
            <WrapperRemainingUsers>{remainingUserNames}</WrapperRemainingUsers>
          }
          position="bottom">
          <StyledCounter>
            <span>{remainingUsers.length}</span>
          </StyledCounter>
        </Tooltip>
      )}
    </StyledWrapper>
  );
};

export default PeopleInBudget;
