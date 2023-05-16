"use client";

import { BudgetType } from "../../services/mutations";
import { Icon } from "ui";
import { SyntheticEvent, useState } from "react";
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
export const Favorite = ({
  ariaLabel,
  budgets,
  isFav,
  budgetId,
  activeHref,
}: FavoriteProps) => {
  const currentPage = usePathname() || "";
  //in use state it will be what will come from prop?
  const [isFavorite, setIsFavorite] = useState(isFav);

  const active = currentPage === activeHref;
 
  const setFav = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsFavorite((prevState) => !prevState);
    const chosenBudget = budgets.find((budget) => budget.id.value === budgetId);
//splice function must be added. NOT UNSHIFT
    isFav === false
      ? favBudgets.push(chosenBudget)
      : favBudgets.unshift(chosenBudget);
    console.log(` YOUR FAV BUDGETS! : ${JSON.stringify(favBudgets)}`);
    return
  };

  //filled isFav = if true, filled, if false, outlined
  return (
    <Wrapper onClick={setFav} active={active}>
      <Icon
        icon="favorite"
        filled={isFavorite}
        color="#B1B1B1"
        iconSize={20}></Icon>
    </Wrapper>
  );
};
