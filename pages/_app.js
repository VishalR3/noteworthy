import PropTypes from "prop-types";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import Head from "next/head";
import lightTheme from "../styles/theme/lightTheme";
import darkTheme from "../styles/theme/darkTheme";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <>
      <Head>
        <title>NoteWorthy</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
