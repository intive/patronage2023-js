import { env } from "env.mjs";
import { IconType } from "ui/Icon";

export type BudgetType = {
  name: string;
  icon: IconType;
  id: {
    value: string | number;
  };
};
export type ItemType = {
  items: BudgetType[];
  totalCount: number;
};

export type GetBudgetsListType = {
  pageSize: number;
  pageParam: number;
  searchValue: string;
  sortAscending: boolean;
  token: string | undefined;
};

const URL = env.NEXT_PUBLIC_API_URL + "budgets/list";

export const getBudgetsList = async ({
  pageSize,
  pageParam,
  searchValue,
  sortAscending,
  token,
}: GetBudgetsListType): Promise<ItemType> => {
  const options = {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageSize: pageSize,
      pageIndex: pageParam,
      search: searchValue,
      sortDescriptors: [
        {
          columnName: "name",
          sortAscending: sortAscending,
        },
      ],
    }),
  };

  return fetch(URL, options).then((res) => res.ok && res.json());
};
