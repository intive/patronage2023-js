"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { env } from "env.mjs";
import { BudgetType } from "../../services/mutations";
import { Icon } from "ui";
import { useTranslate } from "lib/hooks";

//props
interface FavouriteProps {
  ariaLabel?: string;
  budgets: BudgetType[];
  isFav: boolean;
  budgetId: string | number;
  activeHref: string;
}

type Active = {
  active: boolean;
};

const Wrapper = styled.div<Active>`
  display: ${({ active }) => active && "none"};
  margin-left: 50px;
  z-index: 1;
`;

let ariaLabel;

export const Favourite = ({ isFav, budgetId, activeHref }: FavouriteProps) => {
  const { t, dict } = useTranslate("FavouriteBudget");
  const currentPage = usePathname() || "";
  const { data: session } = useSession();

  //initial state is what will come from props
  const [isFavourite, setIsFavourite] = useState<boolean>(isFav);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  ariaLabel = isFavourite ? t(dict.unfavourite) : t(dict.favourite);
  const active = currentPage === activeHref;

  useEffect(() => {
    if (isFetching) {
      fetch(
        `${env.NEXT_PUBLIC_API_URL}/budgets/${budgetId}/favourite?isFavourite=${isFavourite}`,
        {
          method: "PUT",
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${session!.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        if (response.status === 400 || response.status === 401) {
          setIsFavourite((prevState) => !prevState);
        }
        setIsFetching(false);
      });
    }
  }, [isFetching]);

  const setFavHandler = (event: React.MouseEvent<HTMLElement>) => {
    //to prevent relocating
    event.preventDefault();
    //to prevent closing budget's list
    event.stopPropagation();

    setIsFavourite((prevState) => !prevState);
    setIsFetching(true);
  };

  //filled isFav -> if true, filled, if false, outlined
  return (
    <Wrapper onClick={setFavHandler} active={active} aria-label={ariaLabel}>
      <Icon
        icon="favorite"
        filled={isFavourite}
        color="#ef4e4e"
        iconSize={20}></Icon>
    </Wrapper>
  );
};
