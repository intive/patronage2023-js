"use client";

import { useMutation } from "react-query";
import { v1 as uuidv1 } from 'uuid';

const url = "https://inbudget-patronage-api-dev.azurewebsites.net/budgets";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM0Njk3OTUsImlhdCI6MTY4MzQ2MjU5NSwianRpIjoiZmM4YTkzOTUtYzlhZS00NmU2LTgzOTMtODZkNGVlYzE3Njk4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODIwNjNmMmUtOWQ5YS00YjM4LWEyMmUtNTU3MmNlZTlkZGY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjA4ODMwMjE3LTgxYTItNDg5NC1iZGQ5LTgwNTgwODI0MzhjZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjA4ODMwMjE3LTgxYTItNDg5NC1iZGQ5LTgwNTgwODI0MzhjZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoic211dG5hIHphYmEiLCJhdmF0YXIiOiIxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic211dG5hcnphYmFAcG5nLnBsIiwiZ2l2ZW5fbmFtZSI6InNtdXRuYSIsImZhbWlseV9uYW1lIjoiemFiYSIsImVtYWlsIjoic211dG5hcnphYmFAcG5nLnBsIn0.r6mymTTrCgigXKKXITuyWO1685CJx-x9nEwO194EKr3g5C76yzyLtcrhTU2Kb4kE0XuPxyVwck2IO0n7IjZziEqPMrXlkcaTdjRC0_IomAccpZ-LLfZpYwtwYm5tpZuuG3UE-20bhL4lQxbksJl-p8ozcZIat2nqzBIAqjlUXm41dUsYCemcb-bUVKhQY_92VpSWzltQtHzy6TA3psG3650ksvTH7sUFKm4nxciOPsFq-sAglo8NfJ_OoOq5rqihYzV8DeBUwUqCDwdsAS7aTJfvd6r-ozOqPbEncTifNOAfyvTKx5FGlFseGdrgf_7yK7UP4LxEzg0jAFxXWEQxmg";

export const useSendBudget = () =>
  useMutation(
    (post) =>
      fetch(url, {
        method: "POST",
        headers: {
          accept: "text/plain",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `${uuidv1()}`,
          name: "TestNewBudget",
          userId: `${uuidv1()}`,
          limit: {
            value: 15,
            currency: 1,
          },
          period: {
            startDate: "2023-04-20T19:14:20.152Z",
            endDate: "2023-04-25T20:14:20.152Z",
          },
          description: "some budget description",
          iconName: "directions_car",
        }),
      }),
    {
      onSuccess: () => {},
    }
  );
