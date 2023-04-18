import { useTranslate } from "lib/hooks";

import { z } from "zod";
import { loggedUserExistingBudgets } from "./CreateNewBudget";

export const useValidateBudgetModal = (value: "AddNewBudgetModal") => {
  const { t, dict } = useTranslate(value);
  return {
    checkBudgetNameOnChange: z
      .string()
      .max(30, t(dict.errors.max30characters))
      .refine(
        (val) => !loggedUserExistingBudgets.includes(val),
        t(dict.errors.nameTaken)
      ),
    checkBudgetNameOnSubmit: z
      .string()
      .min(3, t(dict.errors.min3characters))
      .max(30, t(dict.errors.max30characters))
      .refine(
        (val) => !loggedUserExistingBudgets.includes(val),
        t(dict.errors.nameTaken)
      ),
    checkBudgetLimit: z.union([
      z.string().nonempty({ message: t(dict.errors.specifyBudgetLimit) }),
      z.number().positive({ message: t(dict.errors.moreThanZero) }),
    ]),
    checkDescription: z.string().max(50, t(dict.errors.max50characters)),
    checkStartDate: z.union([
      z.date(),
      z.string().nonempty({ message: t(dict.errors.startingDate) }),
    ]),
    checkEndDate: z.union([
      z.date(),
      z.string().nonempty({ message: t(dict.errors.endingDate) }),
    ]),
  };
};
