import Layout from "@/components/layout";
import TitleSection from "@/components/ui/TitleSection";
import useTranslation from "next-translate/useTranslation";
import Line from "@/components/ui/Line";
import BreadCrumbs from "@/components/ui/Breadcrumbs";

import { fetchAPI } from "lib/api";
import Seo from "@/components/seo";
import ProjectsListPortfolio from "@/components/Projects/ProjectsListPortfolio";

export default function Portfolio({ tag, projects, categories, data, menu, headerMenu }) {
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
    <Layout
      data={data}
      menu={menu}
      header={headerMenu}
      headerContact={data.attributes}
      bg="white"
      headerBg="white"
      footerBg="black"
      pillowColor="dark"
      variantSvg="darkSvg"
    >
      <Seo seo={seo} />
      <TitleSection text={tag.attributes.Name}>
        <span
          className="text-4xl tracking-tight
        md:text-6xl text-blue"
        >
          #
        </span>
      </TitleSection>
      <Line variantColor="grey" />
      <BreadCrumbs links={breadCrumbsItems} />
      <ProjectsListPortfolio
        projects={projects}
        categories={categories}
        tag={tag.attributes.Name}
      />
    </Layout>
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
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const [headerRes,
    contactRes,
    menuRes,
    projectsRes, categoriesRes, matchingTags] = await Promise.all([
      fetchAPI("/navigation/render/2", {
        fields: ["title", "path"],
        locale: locale,
      }),
      fetchAPI("/contact", {
        fields: ["Title", "Address", "Phone", "Email", "PhoneLink"],
        locale: locale,
        populate: "ContactSocials",
      }),
      fetchAPI("/navigation/render/3", {
        fields: ["title", "path"],
        locale: locale,
      }),
      fetchAPI("/projects", {
        sort: ["ListPosition:asc"],
        locale: locale,
        populate: ["Poster", "tags", "categories"],
        fields: ["Title", "slug"],
        filters: {
          tags: {
            slug: { $eq: params.slug },
          },
        },
      }),
      fetchAPI("/categories", {
        fields: ["name", "slug"],
        locale: locale,
        populate: ["projects"],
      }),
      fetchAPI("/tags", {
        populate: "*",
        locale: locale,
        filters: { slug: params.slug },
      }),
    ]);

  return {
    props: {
      data: contactRes.data,
      menu: menuRes,
      headerMenu: headerRes,
      tag: matchingTags?.data[0],
      categories: categoriesRes.data,
      projects: projectsRes.data,
    }, revalidate: 3600
    
  };
}

