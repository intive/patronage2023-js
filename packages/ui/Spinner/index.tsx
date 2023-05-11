import { SyncLoader } from "react-spinners";
import { useTheme } from "styled-components";

export const Spinner = () => {
  const theme = useTheme();
  return <SyncLoader color={theme.primary as any} />;
};
