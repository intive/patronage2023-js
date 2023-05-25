"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import { useTranslate } from "lib/hooks";
import { Modal, useToast } from "ui";
import {
  SeparatorTopStyled,
  ModalContentStyled,
  ImportButtonStyled,
  ErrorWindowStyled,
  IconStyled,
  LabelStyled,
  PStyled,
} from "./ImportModal.styled";
import { Spinner } from "ui/NavList/Spinner";

type ImportModalProps = {
  onClose: Function;
};

export type ModalContentProps = {
  isError: boolean;
};

const errors = [
  "Errror: 1: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 2: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 3: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 4: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 5: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 6: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 7: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 8: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 9: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 10: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 11: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 12: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 13: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 14: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 15: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
  "Errror: 16: lotem ipsum lotem ipsum lorem ispmsum lirem ipsumsdaldosadosaodas",
];

type ImportResponseProps = {
  errors: string[];
  uri: string;
};

type ImportBEProps = {
  status: number;
  body: ImportResponseProps;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ImportModal = ({ onClose }: ImportModalProps) => {
  const { t, dict } = useTranslate("AddNewBudgetModal");
  const [isCSVError, setIsCSVError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const showToast = useToast();

  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const { mutate, data, isLoading, isError } = useMutation(
    async (formData: FormData): Promise<ImportBEProps> => {
      const result = fetch(``, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const res = await result;
      return res.ok && res.json();
    },
    {
      onSuccess: (data: ImportBEProps) => {
        switch (data.status) {
          case 201:
            const isDataValid = data.body.errors.length === 0;
            setIsCSVError(!isDataValid);
            queryClient.invalidateQueries([
              "budgets",
              { searchValue: "", sortAscending: true },
            ]);
            if (isDataValid) {
              onClose();
              showToast({
                variant: "confirm",
                message: "CSV file imported successfully",
              });
            } else {
              showToast({
                variant: "error",
                message: "Check which records haven't been imported",
              });
            }
            break;
          case 400:
            setErrorMsg("400");
            showToast({
              variant: "error",
              message: "Error 400",
            });
            break;
          case 401:
            setErrorMsg("401");
            showToast({
              variant: "error",
              message: "Error 401",
            });
            break;
          default:
            setErrorMsg("default");
            showToast({
              variant: "error",
              // Change it
              // message: "Error, something went wrong",
              message: "Check which records haven't been imported",
            });
            return;
        }
      },
    }
  );

  const sendFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.currentTarget.files) {
      return;
    }
    const file = e.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    mutate(formData);
    e.currentTarget.value = "";
    // temp
    await sleep(3600);
    setIsCSVError(true);
  };

  if (isError) {
    showToast({
      variant: "error",
      message: "Error",
    });
  }

  // const errors = data?.body.errors

  return (
    <Modal header="Import CSV" onClose={() => onClose()}>
      <SeparatorTopStyled />
      <ModalContentStyled isError={isCSVError}>
        {isCSVError && (
          <ErrorWindowStyled>
            {errors.map((error) => (
              <PStyled key={error}>{error}</PStyled>
            ))}
          </ErrorWindowStyled>
        )}
        {isLoading && !isCSVError && <Spinner />}
        <ImportButtonStyled variant="secondary" onClick={() => {}}>
          <LabelStyled htmlFor="import-csv">
            <input
              type="file"
              id="import-csv"
              name="import-csv"
              accept=".csv"
              onChange={(e) => {
                console.log("run func to submit and export file");
                sendFileHandler(e);
              }}
            />
            <IconStyled icon={"file_upload"} />
            <span>Click to import</span>
          </LabelStyled>
        </ImportButtonStyled>
      </ModalContentStyled>
    </Modal>
  );
};
