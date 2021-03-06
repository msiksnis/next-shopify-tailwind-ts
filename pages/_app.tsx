import "../styles/globals.css";
import "keen-slider/keen-slider.min.css";
import { AppProps } from "next/app";
import { FC } from "react";
import { UiProvider } from "@components/ui/context";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FC } }) {
  const Layout = Component.Layout ?? Noop;

  return (
    <UiProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UiProvider>
  );
}

export default MyApp;
