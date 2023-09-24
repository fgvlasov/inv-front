import Layout from "@/components/layout";
import TitleSection from "@/components/ui/TitleSection";
import useTranslation from "next-translate/useTranslation";
import Line from "@/components/ui/Line";
import BreadCrumbs from "@/components/ui/Breadcrumbs";
import IntroNews from "@/components/News/IntroNews";
import CarouselNews from "@/components/News/CarouselNews";

import { fetchAPI } from "lib/api";
import Seo from "@/components/seo";
import ProjectsListPortfolio from "@/components/Projects/ProjectsListPortfolio";

export default function Tag({ tag, projects, categories }) {
  const { t } = useTranslation("common");
  const seo = {
    metaTitle: tag.attributes.Name,
    metaDescription: tag.attributes.Text,
    shareImage: tag.attributes.Image_preview,
  };

  const breadCrumbsItems = [
    {
      title: t("All_projects"),
      path: "/portfolio",
    },
    {
      title: tag.attributes.Name,
    },
  ];
  return (
    <>
      {/* <Seo seo={seo} /> */}
      <TitleSection text={`# ${tag.attributes.Name}`} />
      <Line variantColor="grey" />
      <BreadCrumbs links={breadCrumbsItems} />
      <ProjectsListPortfolio
        projects={projects}
        categories={categories}
        tag={tag.attributes.Name}
      />
    </>
  );
}

export async function getStaticPaths({ locales }) {
  const tagsRes = await fetchAPI("/tags", { fields: ["slug"] });

  return {
    paths: [
      ...tagsRes.data.map((tag) => ({
        params: {
          slug: tag.attributes.slug,
        },
      })),
      ...tagsRes.data.map((tag) => ({
        params: {
          slug: tag.attributes.slug,
        },
        locale: "en",
      })),
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [projectsRes, categoriesRes, matchingTags] = await Promise.all([
    fetchAPI("/projects", {
      sort: ["ListPosition:asc"],
      populate: ["Poster", "tags", "categories"],
      fields: ["Title", "slug"],
    }),
    fetchAPI("/categories", {
      fields: ["name", "slug", "text"],
      populate: ["projects"],
    }),
    fetchAPI("/tags", {
      populate: "*",
      filters: { slug: params.slug },
    }),
  ]);

  return {
    props: {
      tag: matchingTags.data[0],
      categories: categoriesRes.data,
      projects: projectsRes.data,
    },
    revalidate: 1,
  };
}

Tag.getLayout = function getLayout(page) {
  return (
    <Layout bg="white" headerBg="white" footerBg="black" pillowColor="">
      {page}
    </Layout>
  );
};
