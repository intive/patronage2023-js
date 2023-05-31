export type ImportModalProps = {
  onClose: Function;
};

export type ColorProps = {
  color?: string;
};

export type ImportResponseProps = {
  errors: string[];
  uri: string;
};

export type ImportBEProps = {
  status: number;
  body: ImportResponseProps;
};

type PropsType = {
  errors?: string[];
  errorMessage?: string;
};

export type ImportExportState = {
  isCSVError?: boolean;
  csvUri?: string;
  screen: React.ComponentType<any>;
  props?: PropsType;
};

export type ImportExportAction =
  | { type: "SET_CSV_ERROR"; payload: boolean }
  | { type: "SET_CSV_URI"; payload: string }
  | { type: "SET_SCREEN"; payload: React.ComponentType<any> }
  | { type: "SET_PROPS"; payload: PropsType }
  | { type: "SET_MULTIPLE"; payload: ImportExportState };
