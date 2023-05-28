import { useTranslate } from "lib/hooks";
import { z } from "zod";

export const useValidateBudgetModal = (
  value: "AddNewBudgetModal" | "EditBudgetModal"
) => {
  const { t, dict } = useTranslate(value);
  return {
    checkNameOnChange: z.string().max(30, t(dict.errors.max30characters)),
    checkNameOnSubmit: z
      .string()
      .min(3, t(dict.errors.min3characters))
      .max(30, t(dict.errors.max30characters)),
    // WIP
    checkCurrency: z.string().nonempty({ message: "Must be selected." }),
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
