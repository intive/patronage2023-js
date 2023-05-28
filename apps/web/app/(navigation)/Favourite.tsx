"use client";

import { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { usePathname } from "next/navigation";
import { env } from "env.mjs";
import { useTranslate } from "lib/hooks";
import { Icon } from "ui";
import useSuperfetch from "lib/hooks/useSuperfetch";

//props
export interface FavouriteProps {
  isFav: boolean;
  budgetId: string | number;
  activeHref?: string;
  className?: string;
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
  className,
}: FavouriteProps) => {
  const { t, dict } = useTranslate("FavouriteBudget");
  const currentPage = usePathname() || "";
  const fetch = useSuperfetch();
  const theme = useContext(ThemeContext);

  //initial state is what will come from props
  const [isFavourite, setIsFavourite] = useState<boolean>(isFav);

  const active = currentPage === activeHref;

  const setFavHandler = async (event: React.MouseEvent<HTMLElement>) => {
    //to prevent relocating
    event.preventDefault();
    //to prevent closing budget's list
    event.stopPropagation();
    setIsFavourite((prevState) => !prevState);

    fetch(
      `${
        env.NEXT_PUBLIC_API_URL
      }/budgets/${budgetId}/favourite?isFavourite=${!isFavourite}`,
      {
        method: "PUT",
      }
    ).catch((err) => err && setIsFavourite((prevState) => !prevState));
  };

  //filled isFav -> if true, filled, if false, outlined
  return (
    <FavButton
      onClick={setFavHandler}
      active={active}
      aria-label={isFavourite ? t(dict.unfavourite) : t(dict.favourite)}
      className={className}>
      <Icon
        icon="favorite"
        filled={isFavourite}
        color={theme.favouriteBudget.heartColor}
        iconSize={20}
      />
    </FavButton>
  );
};
