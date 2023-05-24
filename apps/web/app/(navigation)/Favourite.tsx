"use client";

import { useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { env } from "env.mjs";
import { useTranslate } from "lib/hooks";
import { Icon } from "ui";

//props
interface FavouriteProps {
  isFav: boolean;
  budgetId: string | number;
  activeHref: string;
}

type Active = {
  active: boolean;
};

const FavButton = styled.button<Active>`
  display: ${({ active }) => active && "none"};
  margin-left: 50px;
  z-index: 1;
  border: none;
  background: none;
  cursor: pointer;
`;

export const Favourite = ({
  isFav,
  budgetId,
  activeHref,
}: FavouriteProps) => {
  const { t, dict } = useTranslate("FavouriteBudget");
  const currentPage = usePathname() || "";
  const { data: session } = useSession();

  //initial state is what will come from props
  const [isFavourite, setIsFavourite] = useState<boolean>(isFav);

  const active = currentPage === activeHref;

  const setFavHandler = async (event: React.MouseEvent<HTMLElement>) => {
    //to prevent relocating
    event.preventDefault();
    //to prevent closing budget's list
    event.stopPropagation();

    fetch(
      `${
        env.NEXT_PUBLIC_API_URL
      }/budgets/${budgetId}/favourite?isFavourite=${!isFavourite}`,
      {
        method: "PUT",
        headers: {
          accept: "text/plain",
          Authorization: `Bearer ${session!.user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      setIsFavourite((prevState) => !prevState);
      if (response.status === 400 || response.status === 401) {
        setIsFavourite((prevState) => !prevState);
      }
    });
  };

  //filled isFav -> if true, filled, if false, outlined
  return (
    <FavButton
      onClick={setFavHandler}
      active={active}
      aria-label={isFavourite ? t(dict.unfavourite) : t(dict.favourite)}>
      <Icon
        icon="favorite"
        filled={isFavourite}
        color="#ef4e4e"
        iconSize={20}></Icon>
    </FavButton>
  );
};
