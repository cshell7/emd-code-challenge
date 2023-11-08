import { type AppType } from "next/app";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { api } from "~/utils/api";

import { theme } from "~/theme";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
};

export default api.withTRPC(MyApp);
