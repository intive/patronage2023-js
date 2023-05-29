import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { env } from "env.mjs";
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

// type APIResponse = {
//   items: User[];
//   totalCount: number;
// };

const UsersListItem = ({
  user,
  onCheckboxChange,
  checked,
}: UsersListItemProps) => {
  const { firstName, lastName, avatar, id } = user;
  return (
    <ListItemStyled>
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
};

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

  const mockUsers = [
    {
      firstName: "Howard",
      lastName: "Wolovitz",
      avatar: "/avatars/1.svg",
      id: "1",
    },
    {
      firstName: "Anna",
      lastName: "Kozik",
      avatar: "/avatars/2.svg",
      id: "2",
    },
    {
      firstName: "Jan",
      lastName: "Kowalski",
      avatar: "/avatars/3.svg",
      id: "3",
    },
    {
      firstName: "Julia",
      lastName: "Nowak",
      avatar: "/avatars/4.svg",
      id: "4",
    },
  ];
  const { data: session } = useSession();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(500);
  // const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const {
    data: allUsers,
    // isError,
    // isLoading,
    // refetch,
    // error,
  } = useQuery({
    queryKey: ["user", itemsPerPage, currentPage, debouncedSearch],
    queryFn: async () => {
      return fetch(`${env.NEXT_PUBLIC_API_URL}user/list`, {
        body: JSON.stringify({
          pageSize: itemsPerPage,
          pageIndex: currentPage,
          search: searchValue,
          sortDescriptors: [
            {
              columnName: "firstName",
              sortAscending: true,
            },
          ],
        }),
        headers: {
          Authorization: "Bearer " + session!.user.accessToken,
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`${res.status}`);
        })
        .then((json) => json.items);
    },
    enabled: !!session,
  });

  const usersWithoutOwner =
    allUsers && allUsers.filter((user: User) => user.id !== owner);

  return (
    <ShareBudgetWrapperStyled>
      <ParagraphStyled>Invite existing members</ParagraphStyled>
      <SearchInput placeholder="Search" />
      <UsersListStyled>
        {usersWithoutOwner &&
          usersWithoutOwner.map((user: User) => (
            <UsersListItem
              key={user.id}
              user={user}
              onCheckboxChange={onCheckboxChange}
              checked={isChecked(user)}
            />
          ))}
        {/* {mockUsers.map((user: User) => (
          <UsersListItem
            key={user.id}
            user={user}
            onCheckboxChange={onCheckboxChange}
            checked={isChecked(user)}
          />
        ))} */}
      </UsersListStyled>
    </ShareBudgetWrapperStyled>
  );
};
