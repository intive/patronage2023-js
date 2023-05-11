import { useContext } from "react";
import { SyncLoader } from "react-spinners";
import { ThemeContext, useTheme } from "styled-components";

export const Spinner = () => {
  const theme = useContext(ThemeContext);
  return <SyncLoader color={theme.primary} />;
};
