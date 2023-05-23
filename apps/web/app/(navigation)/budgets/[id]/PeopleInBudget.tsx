import styled from "styled-components";
import { BudgetFixed } from "lib/types";
import { useSession } from "next-auth/react";
import { Avatar } from "ui";
import { number } from "zod";

type PeopleInBudgetProps = {
  budget: BudgetFixed;
};

const StyledAvatar = styled(Avatar)`
  /* font-size: 3em; */
`;

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
  let remainingUsers = 0;
  if (peopleWithoutLoggedUser.length > 4) {
    shortUserList = peopleWithoutLoggedUser.slice(0, 3);
    remainingUsers = peopleWithoutLoggedUser.length - shortUserList.length;
  }

  return (
    <StyledWrapper>
      {shortUserList.map((user) => (
        <StyledAvatar
          key={user.id}
          src={user.avatar}
          username={`${user.firstName} ${user.lastName}`}
          outlined
          title={`${user.firstName} ${user.lastName}`}
        />
      ))}
      {remainingUsers && (
        <StyledCounter>
          <span>{remainingUsers}</span>
        </StyledCounter>
      )}
    </StyledWrapper>
  );
};

export default PeopleInBudget;
