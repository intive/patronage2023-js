"use client";

import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import { useTranslate } from "lib/hooks";
import { Button, ButtonStyled, Icon, Modal } from "ui";
import {
  SeparatorTopStyled,
  ModalContentStyled,
  ImportButtonStyled,
  ErrorWindowStyled,
  IconStyled,
  LabelStyled,
  PStyled,
} from "./ImportModal.styled";

type ImportModalProps = {
  onClose: Function;
};

export type ModalContentProps = {
  isError: boolean;
};

const errors = [
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
];

export const ImportModal = ({ onClose }: ImportModalProps) => {
  const { t, dict } = useTranslate("AddNewBudgetModal");

  const { data: session } = useSession();

  const [temporaryState, setTemporaryState] = useState(false);
  // required for queryClient in onSuccess
  const queryClient = useQueryClient();

  // const useSendBudget = () =>
  //   useMutation(
  //     () =>
  //       fetch(`${env.NEXT_PUBLIC_API_URL}budgets`, {
  //         method: "POST",
  //         headers: {
  //           accept: "text/plain",
  //           Authorization: "Bearer " + session!.user.accessToken,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: newBudget.name,
  //           limit: {
  //             value: newBudget.limit,
  //             currency: newBudget.currency.tag,
  //           },
  //           period: {
  //             startDate: budgetStartDate,
  //             endDate: budgetEndDate,
  //           },
  //           description: newBudget.description,
  //           iconName: newBudget.icon,
  //         }),
  //       }),
  //     {
  //       onSuccess: () => {
  //         onClose();
  //         queryClient.invalidateQueries([
  //           "budgets",
  //           { searchValue: "", sortAscending: true },
  //         ]);
  //       },
  //     }
  //   );

  // const { mutate: sendBudget } = useSendBudget();

  return (
    <Modal header="Import CSV" onClose={() => onClose()}>
      <SeparatorTopStyled />
      <ModalContentStyled isError={temporaryState}>
        {temporaryState && (
          <ErrorWindowStyled>
            {errors.map((error) => (
              <PStyled key={error}>{error}</PStyled>
            ))}
          </ErrorWindowStyled>
        )}
        <ImportButtonStyled
          variant="secondary"
          onClick={() => {}}
          htmlFor="export-input">
          <LabelStyled htmlFor="import-csv">
            <input
              type="file"
              id="import-csv"
              name="import-csv"
              accept=".csv"
              onChange={(e) => {
                //e.target.value = '';
                console.log("run func to submit and export file");
                setTemporaryState(true);
              }}
            />
            <IconStyled icon={"file_upload"} />
            <p>Click to import</p>
          </LabelStyled>
        </ImportButtonStyled>
      </ModalContentStyled>
    </Modal>
  );
};
