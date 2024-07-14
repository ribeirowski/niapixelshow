import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import "@fontsource/poppins";
import theme from '@/styles/theme';
import { Navbar, Footer } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nia Pixel Show</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='xl'>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar /> 
            <Container maxWidth='xl' sx={{ my: '2rem', flexGrow: 1, alignContent: 'center' }}>
              <Component {...pageProps} />
            </Container>
            <Footer />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}