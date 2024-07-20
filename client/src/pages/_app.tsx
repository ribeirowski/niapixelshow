import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import "@fontsource/poppins";
import theme from '@/styles/theme';
import { Navbar, Footer } from '@/components';
import { AuthProvider } from '@/hooks';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nia Pixel Show</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <Container maxWidth='xl'>
            <Box maxWidth='xl' sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Container maxWidth='xl' sx={{ my: '2rem', flexGrow: 1, alignContent: 'center' }}>
                <Component {...pageProps} />
              </Container>
              <Footer />
            </Box>
          </Container>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;