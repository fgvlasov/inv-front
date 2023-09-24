import Layout from "@/components/layout";
import useTranslation from "next-translate/useTranslation";
import { fetchAPI } from "lib/api";
import TitleSection from "@/components/ui/TitleSection";
import BreadCrumbs from "@/components/ui/Breadcrumbs";
import Line from "@/components/ui/Line";
import FormBrief from "@/components/Brief/FormBrief";
import { useContext } from "react";
import { GlobalContext } from "pages/_app";

export default function Brief({ categories, visobjs, service }) {
  const { t } = useTranslation("common");
  const i18n = useTranslation();
  const locale = i18n.lang;

  return (
    <>
      <TitleSection text={t("brief.title_fill")} />
      <Line variantColor="grey" />
      <BreadCrumbs
        links={[
          {
            title: t("brief.title_fill"),
          },
        ]}
      />
      <FormBrief categories={categories} visobjs={visobjs} service={service} />
      <Line variantColor="grey" />
    </>
  );
}

export async function getStaticPaths() {
  const servicesRes = await fetchAPI("/services", {
    fields: ["slug"],
  });
  const servicesPaths = servicesRes.data.map((category) => ({
    params: {
      slug:
        category.attributes.slug !== null
          ? category.attributes.slug.toString()
          : "",
    },
  }));

  return {
    paths: [...servicesPaths],
    fallback: false,
  };
}

export async function getStaticProps({ locale, params }) {
  const [categoriesRes, visobjRes] = await Promise.all([
    fetchAPI("/categories", {
      fields: ["name", "slug"],
      locale: locale,
    }),
    fetchAPI("/visualization-objects", {
      populate: "*",
      locale: locale,
    }),
  ]);

  return {
    props: {
      categories: categoriesRes.data,
      visobjs: visobjRes.data,
      service: params.slug,
    },
    revalidate: 1,
  };
}

Brief.getLayout = function getLayout(page) {
  return (
    <Layout bg="white" headerBg="white" footerBg="white" pillowColor={"grey"}>
      {page}
    </Layout>
  );
};
