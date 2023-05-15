import { BudgetFixed } from "lib/types";
import { Modal } from "ui";
import { useTranslate } from "lib/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RemoveBudgetProps {
  budget: BudgetFixed;
  onClose: () => void;
}

export const RemoveBudget = ({ budget, onClose }: RemoveBudgetProps) => {
  const { t, dict } = useTranslate("BudgetsPage");
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { replace } = useRouter();

  const deleteBudget = useMutation({
    mutationFn: (id: string) => {
      return fetch(env.NEXT_PUBLIC_API_URL + "/budgets/" + id, {
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
  });

  return (
    <>
      <Modal onClose={onClose} header={t(dict.removeBudgetModal.header)}>
        <button onClick={() => deleteBudget.mutate(budget.id)}>
          {t(dict.removeBudgetModal.confirmButton)}
        </button>
        <button onClick={onClose}>
          {t(dict.removeBudgetModal.abortButton)}
        </button>
      </Modal>
    </>
  );
};
