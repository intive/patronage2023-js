import React from "react";

import styled from "styled-components";
import BudgetStatistics from "./BudgetStatistics";
import { type BudgetGeneralInfo } from "lib/types";
import { useQuery } from "@tanstack/react-query";
import { env } from "env.mjs";

interface Props {
  budget: BudgetGeneralInfo;
}
const DetailsWrapperStyled = styled.div`
  width: 100%;
  border: 2px solid #f7f7f7;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  padding: 24px 32px;
`;

const BudgetDetails = ({ budget }: Props) => {
  const { id, currency, startDate, endDate } = budget;

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJha0lYQnV6SHhGb1RINkgxRFNhTkRiVlk4MnBMWXRNdFdVMkRPTjNHTXNnIn0.eyJleHAiOjE2ODM3MzMzMzYsImlhdCI6MTY4MzcyNjEzNiwianRpIjoiNjg4NjhlYmYtNzI3OS00YmM4LWI2OWMtYTAzMjUzMjk0NzNmIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1pbmJ1ZGdldC1wYXRyb25hZ2UyMDIzLmF6dXJld2Vic2l0ZXMubmV0L3JlYWxtcy9pbmJ1ZGdldC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODIwNjNmMmUtOWQ5YS00YjM4LWEyMmUtNTU3MmNlZTlkZGY0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5idWRnZXQtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjQzMjExNDc2LWM0ZGMtNDBmZC05Njg5LTFjZTNmNWYzYzUyYSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1pbmJ1ZGdldC1yZWFsbS1kZXYiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjQzMjExNDc2LWM0ZGMtNDBmZC05Njg5LTFjZTNmNWYzYzUyYSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoic211dG5hIHphYmEiLCJhdmF0YXIiOiIxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic211dG5hcnphYmFAcG5nLnBsIiwiZ2l2ZW5fbmFtZSI6InNtdXRuYSIsImZhbWlseV9uYW1lIjoiemFiYSIsImVtYWlsIjoic211dG5hcnphYmFAcG5nLnBsIn0.QPfPWr1aivGlkBS747dcGb6SnDJZ0DMsyAZFgJPzfYp_NPBrtH5nAHh65iiwcLIEQhVxrSuQM-FrGARI5VbrCjEjpNhhjjeClgBXU8Jm07XgE6XUBOhKJpTAqO0Dq4tA6JMT-seeqXIxFUq8G4MYtXufssvNsYtHlqfc68IGmZfDM6B60yAATDI8gtk6Hyesszuqo7jhsxE9xsJM3nkUlbyRD4niIi2e-knXZen7BGHWuiJj-Fzf9ELVfE215dC7OgKu-Ql6gnaxBTDrU5bwBsTbUqLygzwDOCbnPpvaCrz2s2oC7D9VRdPZ4VScjE2rvH2F0MYiaxkYFVv9vTkcUw";

  const { data: statistics } = useQuery({
    queryKey: ["statistics", id],
    queryFn: async () => {
      return fetch(
        `${env.NEXT_PUBLIC_API_URL}/budgets/${id}/statistics?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      ).then((res) => res.json());
    },
  });

  console.log(statistics);

  return (
    <DetailsWrapperStyled>
      <div>lewy</div>
      <BudgetStatistics budget={budget} />
    </DetailsWrapperStyled>
  );
};

export default BudgetDetails;
