import { BudgetFixed } from "lib/types";
import { Button, Modal } from "ui";
import { useTranslate } from "lib/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { Toast } from "ui";

interface RemoveBudgetProps {
  budget: BudgetFixed;
  onClose: () => void;
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 0 10px 0;
`;

export const RemoveBudget = ({ budget, onClose }: RemoveBudgetProps) => {
  const { t, dict } = useTranslate("BudgetsPage");
  const [toggleErrorBox, setToggleErrorBox] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { replace } = useRouter();

  const deleteBudget = useMutation({
    mutationFn: (id: string) => {
      return fetch(env.NEXT_PUBLIC_API_URL + "/budgetss/" + id, {
        headers: {
          Authorization: "Bearer " + session!.user.accessToken,
        },
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          return res;
        }
        throw new Error(`${res.status}`);
      });
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries([
          "budgets",
          { searchValue: "", sortAscending: true },
        ])
        .then((r) => console.log(r));
      replace("/");
    },
    onError: (error) => {
      setToggleErrorBox(true);
    },
  });
  return (
    <>
      <Toast
        message={"Test"}
        variant={"error"}
        open={toggleErrorBox}
        onOpenChange={setToggleErrorBox}
      />
      <Modal onClose={onClose} header={t(dict.removeBudgetModal.header)}>
        <ButtonWrapper>
          <Button onClick={() => deleteBudget.mutate(budget.id)}>
            {t(dict.removeBudgetModal.confirmButton)}
          </Button>
          <Button onClick={onClose} variant={"secondary"}>
            {t(dict.removeBudgetModal.abortButton)}
          </Button>
        </ButtonWrapper>
      </Modal>
    </>
  );
};
