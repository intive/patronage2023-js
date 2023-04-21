import styled from "styled-components";

type Tcategory = {
  id: number;
  name: string;
  icon: {
    name: string;
    foreground: string;
    background: string;
  };
};

type IncomeExpenseIconProps = {
  category: Tcategory;
};

export const IncomeExpenseIcon = ({ category }: IncomeExpenseIconProps) => {
  return (
    <div>
      <p>id: {category.id}</p>
      <p>name: {category.name}</p>
      <p>icon name: {category.icon.name}</p>
      <p>icon foreground: {category.icon.foreground}</p>
      <p>icon background: {category.icon.background}</p>
    </div>
  );
};
