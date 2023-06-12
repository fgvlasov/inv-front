import React, { useState } from "react";
import Layout from "@/components/layout";
import { fetchAPI } from "lib/api";
//import Projects from "@/components/pages/index/Projects";
import Blog from "@/components/pages/index/Blog";
import IntroCost from "@/components/ui/IntroCost";
import useTranslation from "next-translate/useTranslation";
import TitleSection from "@/components/ui/TitleSection";
import BreadCrumbs from "@/components/ui/Breadcrumbs";
import IntroDescription from "@/components/ui/IntroDescription";
import IntroSlides from "@/components/ui/IntroSlides";
import ProjectsList from "@/components/Projects/ProjectsList";

export default function About({ about, projects }) {
  const i18n = useTranslation();
  const { t } = useTranslation("common");
  const locale = i18n.lang;

  return (
    <Layout bg="white" headerBg="white" footerBg="black">
      <div className="mx-auto">
        <div className="container  px-3.8 lg:max-w-[1746px]">
          <TitleSection text={about.attributes.Title} />
          <BreadCrumbs itemLast={about.attributes.Title} />
          <div className="lg:flex flex-wrap justify-between pb-15">
            <IntroDescription
              title={about.attributes.Title}
              text={about.attributes.AboutPurpose}
            ></IntroDescription>
            <IntroSlides />
            <IntroDescription
              title={t(`about.aboutOpportunities`)}
              text={about.attributes.AboutOpportunities}
            ></IntroDescription>
          </div>

          <IntroCost />
        </div>
        <ProjectsList projects={projects} moreProjects={true} />
        {/* <Projects projects={projects} moreProjects={true} /> */}
        <Blog />
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const [aboutRes, projectsRes] = await Promise.all([
    fetchAPI("/about", {
      populate: "*",
      locale: locale,
    }),
    fetchAPI("/projects", {
      sort: ["ListPosition:asc"],
      populate: {
        Poster: "*",
        tags: "*",
      },
      fields: ["title", "slug"],
      pagination: {
        start: 0,
        limit: 6,
      },
    }),
  ]);

  return {
    props: {
      about: aboutRes.data,
      projects: projectsRes.data,
    },
    revalidate: 1,
  };
}
