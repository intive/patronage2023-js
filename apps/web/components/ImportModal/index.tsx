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
  ImportExportAction,
  ImportExportState,
  ImportModalProps,
  ImportResponseProps,
} from "./ImportModal.types";

const initialState: ImportExportState = {
  isCSVError: false,
  csvUri: "/avatars/1.svg",
  screen: TutorialScreen,
  props: {
    errors: [],
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
    case "SET_MULTIPLE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const ImportModal = ({ onClose }: ImportModalProps) => {
  const { t, dict } = useTranslate("ImportModal");
  const { t: tExport, dict: dictExport } = useTranslate("ExportFile");
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

  const { mutate: importCsvMutation, isLoading } = useMutation({
    mutationFn: async (formData: FormData): Promise<ImportResponseProps> => {
      const result = fetch(`${env.NEXT_PUBLIC_API_URL}budgets/import`, {
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
      console.log(data);

      switch (data.status) {
        case 200:
          const isDataValid = data.errors.length === 0;
          dispatch({ type: "SET_CSV_ERROR", payload: !isDataValid });
          queryClient.invalidateQueries([
            "budgets",
            { searchValue: "", sortAscending: true },
          ]);

          if (isDataValid) {
            dispatch({ type: "SET_SCREEN", payload: SuccessScreen });
          } else {
            dispatch({
              type: "SET_MULTIPLE",
              payload: {
                screen: ErrorsScreen,
                props: {
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
            type: "SET_MULTIPLE",
            payload: {
              isCSVError: false, // show download button or show import button
              screen: ErrorsScreen,
              props: {
                errors: data.errors,
                errorMessage: data.uri, // add dict
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
          dispatch({ type: "SET_SCREEN", payload: TutorialScreen });
          break;
        default:
          // showToast({
          //   variant: "error",
          //   message: t(dict.responseErrors.default),
          // });
          return;
      }
    },
  });

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
    importCsvMutation(formData);

    e.currentTarget.value = "";
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
            href={csvUri}
            download
            title="csv-file">
            <IconStyled icon="file_download" size={12} />
            <span>{tExport(dictExport.exportButtonText)}</span>
          </ButtonStyled>
        )}
      </ModalContentStyled>
    </Modal>
  );
};
