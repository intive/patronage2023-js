"use client";

import { ChangeEvent, useReducer, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "env.mjs";
import { useSession } from "next-auth/react";
import { useTranslate } from "lib/hooks";
import { ButtonStyled, Modal, useToast } from "ui";
import {
  SeparatorTopStyled,
  ModalContentStyled,
  ImportButtonStyled,
  InformationWindowStyled,
  IconStyled,
  LabelStyled,
  LinkStyled,
} from "./ImportModal.styled";
import {
  ErrorsScreen,
  SpinnerScreen,
  SuccessScreen,
  TutorialScreen,
} from "./ImportModal.screens";
import {
  ImportBEProps,
  ImportExportAction,
  ImportExportState,
  ImportModalProps,
} from "./ImportModal.types";

// temp
const errorsArray = [
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

const initialState: ImportExportState = {
  isCSVError: false,
  csvUri: "/avatars/1.svg",
  screen: TutorialScreen,
  props: {
    errors: undefined,
    errorMessage: "",
  },
};

const reducer = (
  state: ImportExportState,
  action: ImportExportAction
): ImportExportState => {
  switch (action.type) {
    case "SET_CSV_ERROR":
      return { ...state, isCSVError: action.payload };
    case "SET_CSV_URI":
      return { ...state, csvUri: action.payload };
    case "SET_SCREEN":
      return { ...state, screen: action.payload };
    case "SET_PROPS":
      return { ...state, props: action.payload };
    default:
      return state;
  }
};

// temp func
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ImportModal = ({ onClose }: ImportModalProps) => {
  const { t, dict } = useTranslate("ImportModal");
  const [
    { isCSVError, csvUri, screen: Screen, props: importExportProps },
    dispatch,
  ] = useReducer(reducer, initialState);

  const showToast = useToast();
  const queryClient = useQueryClient();
  // Currently, I can't use superFetch here because it doesn't accept custom headers.
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const { mutate, isLoading } = useMutation(
    async (formData: FormData): Promise<ImportBEProps> => {
      // temp await
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
            dispatch({ type: "SET_CSV_ERROR", payload: !isDataValid });
            queryClient.invalidateQueries([
              "budgets",
              { searchValue: "", sortAscending: true },
            ]);

            if (isDataValid) {
              dispatch({ type: "SET_SCREEN", payload: SuccessScreen });
              showToast({
                variant: "confirm",
                message: t(dict.successImport),
              });
            } else {
              dispatch({ type: "SET_CSV_URI", payload: data.body.uri });
              dispatch({
                type: "SET_SCREEN",
                payload: ErrorsScreen,
              });
              dispatch({
                type: "SET_PROPS",
                payload: { errors: data.body.errors },
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
        message: t(dict.corruptedFile),
      });
      return;
    }
    const file = e.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    mutate(formData);

    // temp
    e.currentTarget.value = "";
    await sleep(2600);
    dispatch({ type: "SET_CSV_ERROR", payload: true });
    dispatch({ type: "SET_SCREEN", payload: ErrorsScreen });
    dispatch({
      type: "SET_PROPS",
      payload: {
        errors: errorsArray,
        errorMessage: t(dict.errorCsvMessage),
      },
    });
  };

  const showLoader = isLoading && !isCSVError;

  return (
    <Modal header={t(dict.modalHeader)} onClose={() => onClose()}>
      <SeparatorTopStyled />
      <ModalContentStyled>
        <InformationWindowStyled>
          {showLoader ? <SpinnerScreen /> : <Screen {...importExportProps} />}
        </InformationWindowStyled>
        {!isCSVError && (
          <>
            <ImportButtonStyled variant="secondary" onClick={handleInputClick}>
              <LabelStyled htmlFor="import-csv" aria-label="upload-file">
                <IconStyled icon="file_upload" />
                <span>{t(dict.importButtonText)}</span>
              </LabelStyled>
            </ImportButtonStyled>
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              aria-label="upload-file"
              id="import-csv"
              name="import-csv"
              accept=".csv"
              onChange={(e) => {
                importFileHandler(e);
              }}
            />
          </>
        )}
        {isCSVError && (
          <ButtonStyled
            variant="secondary"
            onClick={() => {
              dispatch({ type: "SET_CSV_ERROR", payload: false });
            }}
            as={LinkStyled}
            href={"#" || csvUri}
            // download
            title="csv-file">
            <IconStyled icon="file_download" size={12} />
            <span>{t(dict.exportButtonText)}</span>
          </ButtonStyled>
        )}
        <button
          style={{ position: "absolute", top: "0" }}
          onClick={() => {
            dispatch({ type: "SET_SCREEN", payload: SuccessScreen });
          }}>
          Temp button shows success Screen
        </button>
      </ModalContentStyled>
    </Modal>
  );
};
