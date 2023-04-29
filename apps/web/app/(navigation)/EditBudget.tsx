import styled from "styled-components";
import { Modal } from "ui";

interface EditBudgetProps {
  onClose: () => void;
}

export const EditBudget = ({ onClose }: EditBudgetProps) => {
  return (
    <Modal onClose={onClose} header="Edit Budget">
      This will be editing budget modal!
    </Modal>
  );
};
