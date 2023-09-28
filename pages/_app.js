import "../styles/tailwind.css";
import App from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { ToastrProvider } from "@/components/Toastr/ToastrProvider";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global?.attributes.favicon)}
        />
      </Head>

      <GlobalContext.Provider value={global?.attributes}>
        <GoogleReCaptchaProvider
          reCaptchaKey="6Lfu8lwoAAAAACEvUdCp-s4FmzPGw6FW8CWVsovl"
          scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined,
          }}
        >
          <ToastrProvider>
            {getLayout(<Component {...pageProps} />)}
          </ToastrProvider>
        </GoogleReCaptchaProvider>
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
