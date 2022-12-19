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
        <meta name="application-name" content="NoteWorthy" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NoteWorthy" />
        <meta
          name="description"
          content="Note taking App that keeps your notes on your device"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/ios/152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/ios/32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ios/16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/ios/32.png" color="#5bbad5" />
        <link rel="shortcut icon" href="/ios/16.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://not-worthy.netlify.app" />
        <meta name="twitter:title" content="NoteWorthy" />
        <meta
          name="twitter:description"
          content="Note taking App that keeps your notes on your device"
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@36Vishal" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NoteWorthy" />
        <meta
          property="og:description"
          content="Note taking App that keeps your notes on your device"
        />
        <meta property="og:site_name" content="NoteWorthy" />
        <meta property="og:url" content="https://not-worthy.netlify.app" />
        <meta
          property="og:image"
          content="https://not-worthy.netlify.app/ios/152.png"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ThemeProvider theme={prefersDarkMode ? lightTheme : lightTheme}>
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
