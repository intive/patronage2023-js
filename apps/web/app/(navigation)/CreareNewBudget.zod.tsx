import { z } from "zod";
import { loggedUserExistingBudgets } from "./CreateNewBudget";

export const sibmitVaildateBudgetName = z
  .string()
  .min(3, "Budget name must have at least 3 characters.")
  .max(30, "Budget must not have more than 30 characters.")
  .refine(
    (val) => !loggedUserExistingBudgets.includes(val),
    "Name is taken, please choose another."
  );

export const changeValidateBudgetName = z
  .string()
  .max(30, "Budget must not have more than 30 characters.")
  .refine(
    (val) => !loggedUserExistingBudgets.includes(val),
    "Name is taken, please choose another."
  );

export const validateBudgetLimit = z.union([
  z.string().nonempty({ message: "Please specify budget limit." }),
  z.number().positive({ message: "Must be grater than 0." }),
]);

export const validateDescription = z
  .string()
  .max(50, "Character limit of 50reached.");

export const validateStartDate = z.union([
  z.date(),
  z.string().nonempty({ message: "Please specify starting date" }),
]);

export const validateEndDate = z.union([
  z.date(),
  z.string().nonempty({ message: "Please specify ending date" }),
]);
