import styled from "styled-components";
import { Budget, BudgetFixed } from "lib/types";
import { useSession } from "next-auth/react";
import { Avatar } from "ui";

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
    margin-left: -0.17em;
  }
`;

const PeopleInBudget = ({ budget }: PeopleInBudgetProps) => {
  const { data: session } = useSession();
  console.log(session);

  const loggedUser = session?.user.id;
  console.log("logged user: " + loggedUser)

  const people = budget.budgetUsers;
  console.log("people: " + people);

  const withoutloggedUser = people.filter(user => user.id !== loggedUser);
  console.log(withoutloggedUser);

  return (
    <StyledWrapper>
      {people.map((user) => (
        <StyledAvatar
          key={user.id}
          src={user.avatar}
          username={`${user.firstName} ${user.lastName}`}
          outlined
        />
      ))}
    </StyledWrapper>
  );
};

export default PeopleInBudget;
