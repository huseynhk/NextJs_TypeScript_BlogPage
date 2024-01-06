import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const queryClient = new QueryClient();
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={poppins.className}>
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </QueryClientProvider>
  );
}
