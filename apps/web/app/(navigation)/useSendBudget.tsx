"use client";

import { useMutation } from "react-query";
import { v1 as uuidv1 } from 'uuid';

const url = "https://inbudget-patronage-api-dev.azurewebsites.net/budgets";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM0NjE1OTgsImlhdCI6MTY4MzQ1NDM5OCwianRpIjoiM2IwNDA0NGYtNWVjYi00NjE1LTg3ZGYtZGUyY2U3M2VhOGY4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODIwNjNmMmUtOWQ5YS00YjM4LWEyMmUtNTU3MmNlZTlkZGY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjcxOWZmMjQ4LTA0NDQtNDc0OS05OTc2LWYwNzc2NmVlOTk3ZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjcxOWZmMjQ4LTA0NDQtNDc0OS05OTc2LWYwNzc2NmVlOTk3ZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoic211dG5hIHphYmEiLCJhdmF0YXIiOiIxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic211dG5hcnphYmFAcG5nLnBsIiwiZ2l2ZW5fbmFtZSI6InNtdXRuYSIsImZhbWlseV9uYW1lIjoiemFiYSIsImVtYWlsIjoic211dG5hcnphYmFAcG5nLnBsIn0.J1p-H9ningGm9fffFTVV7EXrqUXHBVfN1qV479FvNN9tH_Obc6IJIAoQpbpg6NzNYAKjhbIaPphJ1vW0j52AVO0xPGqxBjMqBoxsBpPxczQ87N5Z8V-dp7FXJitN9V4w-Tj254uDiyQptqp87UXJBPmP9F5qnSxx7cXy-9xUuFmTdl0mFfm5ovMTg5qA7jr6AP0BO27D5YGmsCZFHNscuFRbUgGyeAkhBjXjKcSvexkzyStJdgv2gZihhKnXZsYSFZAqodRImVO9Re6WpSXwz_okalIqT-brl4Od-94jEGERC6T_49X3Aqr3fycwjebi5_61JpwBbe50Fp9IZT7Obg";

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
          name: "budgetName",
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
          iconName: "yellowIcon",
        }),
      }),
    {
      onSuccess: () => {},
    }
  );
