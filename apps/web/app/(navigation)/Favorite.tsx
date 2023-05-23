"use client";

import { BudgetType } from "../../services/mutations";
import { Icon } from "ui";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

//props
interface FavoriteProps {
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

export const Favorite = ({
  budgets,
  isFav,
  budgetId,
  activeHref,
}: FavoriteProps) => {
  const currentPage = usePathname() || "";
  const { data: session } = useSession();

  //initial state is what will come from prop
  const [isFavorite, setIsFavorite] = useState(isFav);
  ariaLabel = isFavorite ? "Remove from favorites" : "Add to favorites";
  const active = currentPage === activeHref;

  useEffect(() => {
    fetch(
      `https://inbudget-patronage-api-dev.azurewebsites.net/budgets/${budgetId}/favourite?isFavourite=${isFavorite}`,
      {
        method: "PUT",
        headers: {
          accept: "text/plain",
          Authorization: "Bearer " + session!.user.accessToken,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.status === 400) {
        setIsFavorite((prevState) => !prevState);
      }
    });
  }, [isFavorite]);

  //function for modify isFav
  // const changeFavHandler = async (isFav: boolean) => {
  //   const response = await fetch(
  //     `https://inbudget-patronage-api-dev.azurewebsites.net/budgets/${budgetId}/favourite?isFavourite=${isFav}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         accept: "text/plain",
  //         Authorization: "Bearer " + session!.user.accessToken,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  // };

  const setFavHandler = (event: React.MouseEvent<HTMLElement>) => {
    //to prevent relocating
    event.preventDefault();
    //to prevent closing budget's list
    event.stopPropagation();

    setIsFavorite((prevState) => !prevState);
    console.log(isFavorite);
  };

  //filled isFav = if true, filled, if false, outlined
  return (
    <Wrapper onClick={setFavHandler} active={active} aria-label={ariaLabel}>
      <Icon
        icon="favorite"
        filled={isFavorite}
        color="#ef4e4e"
        iconSize={20}></Icon>
    </Wrapper>
  );
};
