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
  IconStyled,
  LabelStyled,
  LinkStyled,
} from "./ImportModal.styled";
import {
  ErrorsScreen,
  SpinnerScreen,
  SuccessScreen,
} from "./ImportModal.screens";
import {
  ImportExportActionType,
  ImportExportStateType,
  ImportResponseProps,
} from "./ImportModal.types";
import { InstructionPopover } from "./InstructionPopover";

const reducer = (
  state: ImportExportStateType,
  action: ImportExportActionType
): ImportExportStateType => {
  switch (action.type) {
    case "SET_SHOW_IMPORT_BUTTON":
      return { ...state, showImportButton: action.payload };
    case "SET_CSV_URI":
      return { ...state, csvUri: action.payload };
    case "SET_SCREEN":
      return { ...state, screen: action.payload };
    case "SET_RESPONSE_VALID":
      return {
        ...state,
        screen: action.payload.screen,
        showImportButton: action.payload.showImportButton,
      };
    case "SET_RESPONSE_INVALID":
      return {
        ...state,
        showImportButton: action.payload.showImportButton,
        csvUri: action.payload.csvUri,
        screen: action.payload.screen,
        errorsScreenProps: action.payload.errorsScreenProps,
      };
    default:
      return state;
  }
};

const initialState: ImportExportStateType = {
  showImportButton: true,
  csvUri: "",
  screen: () => null,
  errorsScreenProps: {
    errors: [],
    errorMessage: "",
  },
};

export type ImportModalProps = {
  onClose: Function;
  importEndpoint: string;
  allowedFileExtensions?: string[];
  instructionScreen?: React.ComponentType<any>;
  downloadButtonLabel: string;
  importButtonLabel: string;
  noDataSavedToastMsg: string;
};

export const ImportModal = ({
  onClose,
  importEndpoint,
  allowedFileExtensions,
  instructionScreen: InstructionScreen,
  downloadButtonLabel,
  importButtonLabel,
  noDataSavedToastMsg,
}: ImportModalProps) => {
  const [
    { showImportButton, csvUri, screen: Screen, errorsScreenProps },
    dispatch,
  ] = useReducer(reducer, initialState);

  const showToast = useToast();
  const queryClient = useQueryClient();
  const { t, dict } = useTranslate("ImportModal");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const { mutate: importFileMutation, isLoading } = useMutation({
    mutationFn: async (formData: FormData): Promise<ImportResponseProps> => {
      const result = fetch(`${env.NEXT_PUBLIC_API_URL}${importEndpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const res = await result;
      const data = await res.json().catch(() => ({}));
      return { ...data, status: res.status };
    },
    onSuccess: (data: ImportResponseProps) => {
      switch (data.status) {
        case 200:
          const isDataValid = data.errors.length === 0;

          queryClient.invalidateQueries([
            "budgetsList",
            { searchValue: "", sortAscending: true },
          ]);

          if (isDataValid) {
            dispatch({
              type: "SET_RESPONSE_VALID",
              payload: { screen: SuccessScreen, showImportButton: true },
            });
          } else {
            dispatch({
              type: "SET_RESPONSE_INVALID",
              payload: {
                showImportButton: false,
                screen: ErrorsScreen,
                errorsScreenProps: {
                  errors: data.errors,
                  errorMessage: t(dict.errorCsvMessage),
                },
                csvUri: data.uri,
              },
            });
          }
          break;
        case 400:
          showToast({
            variant: "error",
            message: t(dict.responseErrors[400]),
          });
          dispatch({
            type: "SET_RESPONSE_INVALID",
            payload: {
              showImportButton: true, // show download button or show import button
              screen: ErrorsScreen,
              errorsScreenProps: {
                errors: data.errors,
                errorMessage: noDataSavedToastMsg,
              },
              csvUri: data.uri,
            },
          });
          break;
        case 401:
          showToast({
            variant: "error",
            message: t(dict.responseErrors[401]),
          });
          dispatch({ type: "SET_SCREEN", payload: () => null });
          break;
        default:
          showToast({
            variant: "error",
            message: t(dict.responseErrors.default),
          });
          return;
      }
    },
  });

  const inputClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const importFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.currentTarget.files) {
      showToast({
        variant: "error",
        message: t(dict.corruptedFile),
      });
      e.currentTarget.value = "";
      return;
    }
    const file = e.currentTarget.files[0];
    const formData = new FormData();
    const fileType = file.type;

    // fileType: "text/csv"
    // allowedFileExtensions: [".csv", ".doc"]
    if (
      allowedFileExtensions
        ?.join(",")
        .replaceAll(".", "")
        .includes(fileType.split("/")[1])
    ) {
      formData.append("file", file, file.name);
      importFileMutation(formData);
    } else {
      showToast({
        variant: "error",
        message: `${t(dict.incorrectFileExtension)} ${allowedFileExtensions}`,
      });
    }
    e.currentTarget.value = "";
  };

  const allowedExtensions = allowedFileExtensions
    ?.join(", ")
    .replaceAll(".", "");

  return (
    <Modal
      header={`${t(dict.modalHeader)} ${allowedExtensions || ""}`}
      onClose={() => onClose()}>
      <SeparatorTopStyled />
      <ModalContentStyled>
        {isLoading ? <SpinnerScreen /> : <Screen {...errorsScreenProps} />}
        {showImportButton ? (
          <>
            <ImportButtonStyled
              variant="secondary"
              onClick={inputClickHandler}
              disabled={isLoading}>
              <LabelStyled htmlFor="import-file" aria-label="upload-file">
                <IconStyled icon="file_download" />
                <span>{importButtonLabel}</span>
              </LabelStyled>
            </ImportButtonStyled>
            <input
              disabled={isLoading}
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              aria-label="upload-file"
              id="import-file"
              name="import-file"
              accept={allowedFileExtensions?.join(",")}
              onChange={(e) => {
                importFileHandler(e);
              }}
            />
          </>
        ) : (
          <ButtonStyled
            variant="secondary"
            onClick={() => {
              dispatch({ type: "SET_SHOW_IMPORT_BUTTON", payload: true });
            }}
            as={LinkStyled}
            href={csvUri}
            download
            title="csv-file">
            <IconStyled icon="file_upload" size={12} />
            <span>{downloadButtonLabel}</span>
          </ButtonStyled>
        )}
        {InstructionScreen ? (
          <InstructionPopover>
            <InstructionScreen />
          </InstructionPopover>
        ) : null}
      </ModalContentStyled>
    </Modal>
  );
};
