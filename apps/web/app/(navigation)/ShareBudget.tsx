import { forwardRef, useCallback, useRef, useState } from "react";
import { useDebounce } from "lib/hooks/useDebounce";
import { SearchInput } from "ui/Input/SearchInput";
import { Checkbox, Avatar } from "ui";
import { ParagraphStyled } from "./CreateNewBudget.styled";
import {
  AvatarWrapperStyled,
  LabelStyled,
  ListItemStyled,
  ShareBudgetWrapperStyled,
  UsersListStyled,
} from "./ShareBudget.styled";
import { useGetUsers } from "lib/hooks/useGetUsers";

type User = {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  createdTimestamp?: number;
  createdVia?: string;
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

const avatars = [
  "/avatars/1.svg",
  "/avatars/2.svg",
  "/avatars/3.svg",
  "/avatars/4.svg",
  "/avatars/5.svg",
  "/avatars/6.svg",
  "/avatars/7.svg",
  "/avatars/8.svg",
];

const UsersListItem = forwardRef<HTMLLIElement, UsersListItemProps>(
  ({ user, onCheckboxChange, checked }, ref) => {
    const { firstName, lastName, avatar, id } = user;

    return (
      <ListItemStyled ref={ref} key={id}>
        <LabelStyled htmlFor={`share-users-${id}`}>
          <AvatarWrapperStyled>
            <Avatar
              src={avatars.includes(avatar) ? avatar : "/unsetAvatar.svg"}
              username={`${firstName} ${lastName}`}
            />
          </AvatarWrapperStyled>
          <p>{`${firstName} ${lastName}`}</p>
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

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const pageSize = 15;

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } = useGetUsers(
    debouncedSearch,
    pageSize
  );

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

  const users =
    data &&
    data.pages?.flatMap(({ items }) =>
      items.map((user) => {
        return user.id !== owner ? (
          <UsersListItem
            ref={lastUserRef}
            user={user}
            onCheckboxChange={onCheckboxChange}
            checked={isChecked(user)}
          />
        ) : (
          <></>
        );
      })
    );

  return (
    <ShareBudgetWrapperStyled>
      <ParagraphStyled>Invite existing members</ParagraphStyled>
      <SearchInput placeholder="Search" />
      <UsersListStyled>{users}</UsersListStyled>
    </ShareBudgetWrapperStyled>
  );
};
