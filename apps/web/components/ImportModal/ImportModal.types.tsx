import { ErrorsScreenProps } from "./ImportModal.screens";

export type ColorProps = {
  color?: string;
};

export type ImportResponseProps = {
  errors: string[];
  uri: string;
  status: number;
};

export type ImportExportStateType = {
  showImportButton: boolean;
  csvUri: string;
  screen: React.ComponentType<any>;
  errorsScreenProps: ErrorsScreenProps;
};

type ResponseValidType = {
  showImportButton: boolean;
  screen: React.ComponentType<any>;
};

export type ImportExportActionType =
  | { type: "SET_SHOW_IMPORT_BUTTON"; payload: boolean }
  | { type: "SET_CSV_URI"; payload: string }
  | { type: "SET_SCREEN"; payload: React.ComponentType<any> }
  | { type: "SET_RESPONSE_VALID"; payload: ResponseValidType }
  | { type: "SET_RESPONSE_INVALID"; payload: ImportExportStateType };
