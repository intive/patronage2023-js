"use client";

import { BudgetType } from "../../services/mutations";
import { Icon } from "ui";
import {  useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";

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

let favBudgets: Array<any> = [];
let ariaLabel;

export const Favorite = ({
  budgets,
  isFav,
  budgetId,
  activeHref,
}: FavoriteProps) => {
  const currentPage = usePathname() || "";

  //in use state it will be what will come from prop... I think not, because true or false will come from each of items from fetch. When add to fav/remove from fav, fetch will fire, what will cause change of props, render component and actual data. 
  //initial state is what will come from prop
  const [isFavorite, setIsFavorite] = useState(isFav);
  ariaLabel = isFavorite === false? "Add to favorites" : "Remove from favorites"
  const active = currentPage === activeHref;

  const setFavHandler = (event:React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsFavorite((prevState) => !prevState);


    if (isFavorite === false) {
      const chosenBudget = budgets.find(
        (budget) => budget.id.value === budgetId
      );
      favBudgets.push(chosenBudget);

      console.log(`✨ You added to favorites: ${JSON.stringify(chosenBudget)}`);
      ariaLabel= "Remove from favorites"
    } else {
      const favIndexToRemove = favBudgets.findIndex(
        (favBudget) => favBudget.id === budgetId
      );
     const deletetBudget = favBudgets.splice(favIndexToRemove, 1);
     console.log(`💥 You removed from favorites: ${JSON.stringify(deletetBudget)}`);
      ariaLabel="Add to favorites"
    }
    console.log(`❤️ Your fav budgets! : ${JSON.stringify(favBudgets)}`);
    return;
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
