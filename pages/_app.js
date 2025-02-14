import "../styles/tailwind.css";
import App from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import { ToastrProvider } from "@/components/Toastr/ToastrProvider";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { YandexMetrica } from "@/components/YandexMetrica";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico"  type="image/x-icon" />
        {/*getStrapiMedia(global?.attributes.favicon)*/}
        <meta name="yandex-verification" content="4e608efa98929572" />
      </Head>
      <YandexMetrica>
        <GoogleReCaptchaProvider
          reCaptchaKey={global.attributes.CAPTCHA_SITE_KEY}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined,
          }}
        >
          <GlobalContext.Provider value={global?.attributes}>
            <ToastrProvider>
              {getLayout(<Component {...pageProps} />)}
            </ToastrProvider>
          </GlobalContext.Provider>
        </GoogleReCaptchaProvider>
      </YandexMetrica>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // const siteKey = process.env.CAPTCHA_SITE_KEY;
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
