import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </CookiesProvider>
  );
}

export default MyApp;
