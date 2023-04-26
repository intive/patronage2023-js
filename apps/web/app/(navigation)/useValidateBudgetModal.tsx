import { useTranslate } from "lib/hooks";

import { z } from "zod";
import {
  acceptedCurrencies,
  loggedUserExistingBudgets,
} from "./CreateNewBudget";

export const useValidateBudgetModal = (value: "AddNewBudgetModal") => {
  const { t, dict } = useTranslate(value);
  return {
    checkNameOnChange: z
      .string()
      .max(30, t(dict.errors.max30characters))
      .refine(
        (val) => !loggedUserExistingBudgets.includes(val),
        t(dict.errors.nameTaken)
      ),
    checkNameOnSubmit: z
      .string()
      .min(3, t(dict.errors.min3characters))
      .max(30, t(dict.errors.max30characters))
      .refine(
        (val) => !loggedUserExistingBudgets.includes(val),
        t(dict.errors.nameTaken)
      ),
    // WIP
    checkCurrency: z
      .string()
      .nonempty({ message: "Must be selected." })
      .refine((val) => acceptedCurrencies.includes(val), "PLN, EUR, USD, GBP"),
    checkLimit: z.union([
      z.string().nonempty({ message: t(dict.errors.specifyBudgetLimit) }),
      z.number().positive({ message: t(dict.errors.moreThanZero) }),
    ]),
    checkDescription: z.string().max(50, t(dict.errors.max50characters)),
    checkDate: z.date({
      invalid_type_error: t(dict.errors.cantBeEmpty),
    }),
  };
};
