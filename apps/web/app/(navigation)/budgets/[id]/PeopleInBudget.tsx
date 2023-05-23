"use client";

import styled from "styled-components";
import { BudgetFixed, BudgetUser } from "lib/types";
import { useSession } from "next-auth/react";
import { Avatar, Tooltip } from "ui";

type PeopleInBudgetProps = {
  budget: BudgetFixed;
};

const StyledWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  font-size: 48px;
  line-height: 1em;

  > * + * {
    margin-left: -8px;
  }
`;

const StyledCounter = styled.div`
  border: 2px solid ${({ theme }) => theme.avatar.outline};
  background-color: #7e7e7e;
  color: white;
  border: 2px solid #ffffff;
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

const PeopleInBudget = ({ budget }: PeopleInBudgetProps) => {
  const { data: session } = useSession();

  const loggedUser = session?.user.id;
  const peopleWithoutLoggedUser = budget.budgetUsers.filter(
    (user) => user.id !== loggedUser
  );

  let shortUserList = peopleWithoutLoggedUser;
  let remainingUsers: BudgetUser[] = [];
  if (peopleWithoutLoggedUser.length > 4) {
    shortUserList = peopleWithoutLoggedUser.slice(0, 3);
    remainingUsers = peopleWithoutLoggedUser.slice(3);
  }

  console.log(remainingUsers);

  const remainingUserNames = remainingUsers
    .map((user) => <div key={user.id}>{user.firstName} {user.lastName}</div>)

  return (
    <StyledWrapper>
      {shortUserList.map((user) => (
        <Tooltip key={user.id} text={`${user.firstName} ${user.lastName}`} position="bottom">
          <Avatar
            src={user.avatar}
            username={`${user.firstName} ${user.lastName}`}
            outlined
          />
        </Tooltip>
      ))}
      {remainingUsers.length && (
        <Tooltip text={remainingUserNames}>
          <StyledCounter>
            <span>{remainingUsers.length}</span>
          </StyledCounter>
        </Tooltip>
      )}
    </StyledWrapper>
  );
};

export default PeopleInBudget;
