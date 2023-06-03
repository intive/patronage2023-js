import { Avatar, Button, Checkbox, Modal } from "ui";
import {
  AvatarWrapperStyled,
  ContentWrapper,
  EmailStyled,
  LabelStyled,
  ListItemStyled,
  NameAndEmailWrapperStyled,
  NameStyled,
  SeparatorAndButtonWrapperStyled,
  ShareBudgetWrapperStyled,
  UsersListStyled,
} from "./ShareBudget.styled";
import {
  ButtonWrapperStyled,
  ParagraphStyled,
  SeparatorStyled,
  SeparatorStyledTop,
} from "../BudgetContent/CreateNewBudget.styled";
import { SearchInput } from "ui/Input/SearchInput";
import { Spinner } from "ui/NavList/Spinner";
import { useTranslate } from "lib/hooks";
import { forwardRef, useCallback, useRef, useState } from "react";
import { useDebounce } from "lib/hooks/useDebounce";
import { z } from "zod";
import { useGetUsers } from "lib/hooks/useGetUsers";
import { BudgetFixed } from "lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import useSuperfetch from "lib/hooks/useSuperfetch";

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
  budget: BudgetFixed;
  onClose: () => void;
};

type UsersListItemProps = {
  user: User;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
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

export const ShareBudget = ({ budget, onClose }: ShareBudgetProps) => {
  const pageSize = 15;
  const { t, dict } = useTranslate("ShareBudget");

  const initBudgetUsers = budget.budgetUsers.map((user) => user.id);
  const [budgetUsers, setBudgetUsers] = useState(initBudgetUsers);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const [errorMsg, setErrorMsg] = useState("");

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

  // getting users list
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
    allUsers && allUsers.filter((user) => user.id !== budget.userId);

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

  // sending users to BE
  const fetch = useSuperfetch();
  const queryClient = useQueryClient();

  // temporary just for current version of query
  const filteredUsers = budgetUsers.filter(
    (user) => !initBudgetUsers.includes(user)
  );

  const updateBudgetUsersMutation = useMutation({
    mutationFn: (budgetUsers: string[]) => {
      return fetch(`${env.NEXT_PUBLIC_API_URL}budgets/${budget.id}/users`, {
        method: "POST",
        body: budgetUsers,
      });
    },
    onError: () => {
      // setErrorMsg(t(dict.errors.errorDefault));
      return;
    },
    onSettled: (data) => {
      switch (data!.httpStatus) {
        case 200:
          queryClient.invalidateQueries({ queryKey: ["budgets"] });
          onClose();
          break;
        case 400:
          // setErrMsg(t(dict.errors.error400));
          break;
        case 401:
          // setErrMsg(t(dict.errors.error401));
          break;
        default:
          // setErrMsg(t(dict.errors.errorDefault));
          return;
      }
    },
  });

  return (
    <Modal header={"Share budget"} onClose={onClose} fullHeight>
      <SeparatorStyledTop />
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
      <SeparatorAndButtonWrapperStyled>
        <SeparatorStyled />
        <ButtonWrapperStyled>
          <Button
            onClick={() => {
              filteredUsers.length > 0
                ? updateBudgetUsersMutation.mutate(filteredUsers)
                : onClose();
            }}>
            {"Share"}
          </Button>
        </ButtonWrapperStyled>
      </SeparatorAndButtonWrapperStyled>
    </Modal>
  );
};
