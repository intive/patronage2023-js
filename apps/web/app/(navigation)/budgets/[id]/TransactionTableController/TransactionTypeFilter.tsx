import { useTranslate } from "lib/hooks";
import { ButtonGroupWrapper } from "./TransactionsFilterSearchStyled";
import { ButtonGroup } from "ui";

type TransactionTypeFilterProps = {
  onSelect: (type: "Income" | "Expense" | null) => void;
};

export const TransactionTypeFilter = ({
  onSelect,
}: TransactionTypeFilterProps) => {
  const { t, dict } = useTranslate("BudgetsPage");

  const buttonGroupOptions = [
    {
      component: t(dict.buttonGroupLabels.all),
      onSelect: () => onSelect(null),
      id: "all",
      defaultChecked: true,
    },
    {
      component: t(dict.buttonGroupLabels.income),
      onSelect: () => onSelect("Income"),
      id: "income",
    },
    {
      component: t(dict.buttonGroupLabels.expenses),
      onSelect: () => onSelect("Expense"),
      id: "expenses",
    },
  ];

  return (
    <ButtonGroupWrapper>
      <ButtonGroup options={buttonGroupOptions} secondary />
    </ButtonGroupWrapper>
  );
};
