import Layout from "@/components/layout";
import { fetchAPI } from "lib/api";
import ProjectsList from "@/components/Projects/ProjectsList";
import TitleSection from "@/components/ui/TitleSection";
import BreadCrumbs from "@/components/ui/Breadcrumbs";
import useTranslation from "next-translate/useTranslation";
import ProjectWorks from "@/components/pages/works/ProjectsWork";
import TagItemSection from "@/components/ui/TagItemSection";
import IntroSlides from "@/components/ui/IntroSlides";
import IntroCost from "@/components/ui/IntroCost";
import Blog from "@/components/pages/index/Blog";

export default function Works({ projects }) {
  const { t } = useTranslation("common");
  return (
    <Layout bg="white" headerBg="white" footerBg="black">
      <div className="bg-whisper text-black">
        <div
          className="px-3.8 pb-15
			md:pb-[28px] lg:max-w-[1746px] mx-auto
      lg:px-0"
        >
          <TitleSection text={t`works.title`} />
          <BreadCrumbs itemLast={t`works.title`} />
          <div className="flex flex-wrap md:w-4/5">
            <TagItemSection text="Архитектурная 3D визуализация" color="blue" />
            <TagItemSection text="Продуктовая 3D визуализация" color="white" />
            <TagItemSection text="Моушн & Видеопродакшн" color="white" />
            <TagItemSection text="3D моделирование" color="white" />
          </div>
        </div>
        {/* <ProjectWorks /> */}
        <ProjectsList projects={projects} moreProjects={false} />
        <div
          className="bg-black px-3.8 -mt-7 pt-10.5
          md:pt-18
          lg:pt-33"
        >
          <IntroSlides />
          <IntroCost />
          <Blog />
        </div>

        {/* <ProjectsListOld projects={projects}/> */}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel

  const [projectsRes] = await Promise.all([
    fetchAPI("/projects", {
      sort: ["ListPosition:asc"],
      populate: ["Poster", "tags"],
      fields: ["Title", "slug"],
    }),
  ]);

  return {
    props: {
      projects: projectsRes.data,
    },
    revalidate: 1,
  };
}
