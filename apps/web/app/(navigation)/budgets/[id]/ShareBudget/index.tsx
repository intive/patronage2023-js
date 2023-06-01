import { forwardRef, useCallback, useRef, useState } from "react";
import { useDebounce } from "lib/hooks/useDebounce";
import { SearchInput } from "ui/Input/SearchInput";
import { Checkbox, Avatar } from "ui";
import { Spinner } from "ui/NavList/Spinner";
import { ParagraphStyled } from "../BudgetContent/CreateNewBudget.styled";
import {
  AvatarWrapperStyled,
  ContentWrapper,
  EmailStyled,
  LabelStyled,
  ListItemStyled,
  NameAndEmailWrapperStyled,
  NameStyled,
  ShareBudgetWrapperStyled,
  UsersListStyled,
} from "./ShareBudget.styled";
import { useGetUsers } from "lib/hooks/useGetUsers";
import { z } from "zod";
import { useTranslate } from "lib/hooks";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdTimestamp: number;
  createdVia: string;
  avatar: string;
};

type ShareBudgetProps = {
  owner: string;
  budgetUsers: string[];
  setBudgetUsers: (users: string[]) => void;
};

type UsersListItemProps = {
  user: User;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  ref?: (user: HTMLLIElement) => void;
};

const isAvatarValid = (text: string) => {
  const schemaPath = z.string().startsWith("/avatars/");
  const schemaUrl = z.string().url();

  return (
    schemaPath.safeParse(text).success || schemaUrl.safeParse(text).success
  );
};

const UsersListItem = forwardRef<HTMLLIElement, UsersListItemProps>(
  ({ user, onCheckboxChange, checked }, ref) => {
    const { firstName, lastName, avatar, id, email } = user;

    return (
      <ListItemStyled ref={ref} key={id}>
        <LabelStyled htmlFor={`share-users-${id}`}>
          <AvatarWrapperStyled>
            <Avatar
              src={isAvatarValid(avatar) ? avatar : "/avatars/default.svg"}
              username={`${firstName} ${lastName}`}
            />
          </AvatarWrapperStyled>
          <NameAndEmailWrapperStyled>
            <NameStyled>{`${firstName} ${lastName}`}</NameStyled>
            <EmailStyled>{email}</EmailStyled>
          </NameAndEmailWrapperStyled>
        </LabelStyled>
        <div>
          <Checkbox
            label={`share-users-${id}`}
            id={`share-users-${id}`}
            name={id}
            value={id}
            onChange={onCheckboxChange}
            checked={checked}
          />
        </div>
      </ListItemStyled>
    );
  }
);

UsersListItem.displayName = "UsersListItem";

export const ShareBudget = ({
  owner,
  budgetUsers,
  setBudgetUsers,
}: ShareBudgetProps) => {
  const pageSize = 15;

  const { t, dict } = useTranslate("ShareBudget");

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;

    if (checked) {
      setBudgetUsers([...budgetUsers, name]);
    } else {
      const newBudgetUsers = budgetUsers.filter((user) => user !== name);
      setBudgetUsers(newBudgetUsers);
    }
  };

  const isChecked = (user: User) => budgetUsers.includes(user.id);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, isLoading } =
    useGetUsers(debouncedSearch, pageSize);

  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastUserRef = useCallback(
    (user: HTMLLIElement) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((users) => {
        if (users[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (user) intObserver.current.observe(user);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const allUsers = data && data.pages?.flatMap(({ items }) => items);
  const usersWithoutOwner =
    allUsers && allUsers.filter((user) => user.id !== owner);

  const usersToDisplay =
    usersWithoutOwner && usersWithoutOwner.length > 0 ? (
      usersWithoutOwner.map((user) => (
        <UsersListItem
          key={user.id}
          ref={lastUserRef}
          user={user}
          onCheckboxChange={onCheckboxChange}
          checked={isChecked(user)}
        />
      ))
    ) : (
      <ContentWrapper>
        <p>{t(dict.noUsersFound)}</p>
      </ContentWrapper>
    );

  return (
    <ShareBudgetWrapperStyled>
      <ParagraphStyled>{t(dict.inviteMembers)}</ParagraphStyled>
      <SearchInput
        placeholder="Search"
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      <UsersListStyled>
        {isLoading ? (
          <ContentWrapper>
            <Spinner />
          </ContentWrapper>
        ) : (
          usersToDisplay
        )}
      </UsersListStyled>
    </ShareBudgetWrapperStyled>
  );
};
