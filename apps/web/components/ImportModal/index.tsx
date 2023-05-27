"use client";

import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import { useTranslate } from "lib/hooks";
import { Modal, useToast } from "ui";
import {
  SeparatorTopStyled,
  ModalContentStyled,
  ImportButtonStyled,
  InformationWindowStyled,
  IconStyled,
  LabelStyled,
} from "./ImportModal.styled";
import { LoadErrors, LoadSpinner, LoadTutorial } from "./helperComponents";

type ImportModalProps = {
  onClose: Function;
};

export type ColorProps = {
  color?: string;
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
  const { t, dict } = useTranslate("ImportModal");
  const [isCSVError, setIsCSVError] = useState(false);
  const [successfullyImported, setSuccessfullyImported] = useState(false);
  const showToast = useToast();

  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const { mutate, data, isLoading, isError } = useMutation(
    async (formData: FormData): Promise<ImportBEProps> => {
      await sleep(2600);
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
              setSuccessfullyImported(true);
              showToast({
                variant: "confirm",
                message: t(dict.successImport),
              });
              onClose();
            } else {
              showToast({
                variant: "error",
                message: t(dict.responseErrors.default),
              });
            }
            break;
          case 400:
            showToast({
              variant: "error",
              message: t(dict.responseErrors[400]),
            });
            break;
          case 401:
            showToast({
              variant: "error",
              message: t(dict.responseErrors[401]),
            });
            break;
          default:
            showToast({
              variant: "error",
              message: t(dict.responseErrors.default),
            });
            return;
        }
      },
    }
  );

  const importFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.currentTarget.files) {
      showToast({
        variant: "error",
        message: "Check your file, it may be corrupted",
      });
      return;
    }
    const file = e.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    mutate(formData);
    e.currentTarget.value = "";
    // temp
    await sleep(2600);
    setIsCSVError(true);
  };

  // const errors = data?.body.errors

  return (
    <Modal header={t(dict.modalHeader)} onClose={() => onClose()}>
      <SeparatorTopStyled />
      <ModalContentStyled isError={isCSVError}>
        <InformationWindowStyled>
          {!isLoading && !isCSVError && <LoadTutorial />}
          {isCSVError && <LoadErrors errors={errors} />}
          {isLoading && !isCSVError && <LoadSpinner />}
          {successfullyImported && "Good"}
        </InformationWindowStyled>
        <ImportButtonStyled variant="secondary" onClick={() => {}}>
          <LabelStyled htmlFor="import-csv">
            <input
              type="file"
              id="import-csv"
              name="import-csv"
              accept=".csv"
              onChange={(e) => {
                importFileHandler(e);
              }}
            />
            <IconStyled icon={"file_upload"} />
            <span>{t(dict.importButtonText)}</span>
          </LabelStyled>
        </ImportButtonStyled>
      </ModalContentStyled>
    </Modal>
  );
};
