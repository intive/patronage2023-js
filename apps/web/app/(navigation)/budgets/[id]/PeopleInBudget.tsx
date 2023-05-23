import styled from "styled-components";
import { BudgetFixed } from "lib/types";
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
  console.log(session);

  const loggedUser = session?.user.id;
  console.log("logged user: " + loggedUser);

  const people = budget.budgetUsers;
  console.log("people: " + people);

  const withoutloggedUser = people.filter((user) => user.id !== loggedUser);
  console.log(withoutloggedUser);

  return (
    <StyledWrapper>
      {people.map((user) => (
        <StyledAvatar
          key={user.id}
          src={user.avatar}
          username={`${user.firstName} ${user.lastName}`}
          outlined
          title={`${user.firstName} ${user.lastName}`}
        />
      ))}
      <StyledCounter title="uygyuguyguyg">
        <span>5</span>
      </StyledCounter>
    </StyledWrapper>
  );
};

export default PeopleInBudget;
