import { ModalWrapper } from "@/components/Modals";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "src/providers/ReactQuery";
import WalletProvider from "src/providers/Wallet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <WalletProvider>
        <ModalWrapper>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </ModalWrapper>
      </WalletProvider>
    </ReactQueryProvider>
  );
}

export default MyApp;
