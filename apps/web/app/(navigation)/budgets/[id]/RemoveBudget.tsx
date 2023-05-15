import { BudgetFixed } from "lib/types";
import { Modal } from "ui";

interface RemoveBudgetProps {
  budget: BudgetFixed;
  onClose: () => void;
}

export const RemoveBudget = ({ budget, onClose }: RemoveBudgetProps) => {
  return (
    <>
      <Modal onClose={onClose}>Delete budget</Modal>
    </>
  );
};
