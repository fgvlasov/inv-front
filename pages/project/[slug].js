import Seo from '@/components/seo';
import Layout from '@/components/layout';
import { fetchAPI } from 'lib/api';
import TitleSection from '@/components/ui/TitleSection';
import BreadCrumbs from '@/components/ui/Breadcrumbs';
import useTranslation from 'next-translate/useTranslation';
import TagBlock from '@/components/Projects/TagBlock';
import Line from '@/components/ui/Line';
import ProjectCarousel from '@/components/Projects/ProjectCarousel';
import ProjectAbout from '@/components/Projects/ProjectAbout';
import IntroCost from '@/components/ui/IntroCost';
import PortfolioCarousel from '@/components/Portfolio/PortfolioCarousel';

function Project({ project, projectsOther, data, menu, headerMenu }) {
  const { t } = useTranslation('common');

  const seo = {
    metaTitle: t('seo.project') + project.attributes.Seo.metaTitle,
    metaDescription: project.attributes.Seo.metaDescription,
    shareImage: project.attributes.Poster,
    project: true,
  };

  const breadCrumbsItems = [
    {
      title: t('works.title'),
      path: '/portfolio',
    },
    {
      title: project.attributes.Title,
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
      footerBg="white"
      pillowColor="white"
      variantSvg="darkSvg"
    >
      <Seo seo={seo} />

      <TitleSection text={project.attributes.Title} />
      {project.attributes.tags.data[0] && (
        <TagBlock tags={project.attributes.tags.data} />
      )}
      <div className="container">
        <Line variantColor="grey" />
      </div>
      <BreadCrumbs links={breadCrumbsItems} />

      <ProjectCarousel
        photos={project.attributes.ProjectSliderFotos.data}
        poster={project.attributes.Poster}
        videoFiles={project.attributes.VideoFile}
        verticalPhotos={project.attributes.Vertical_photos}
      />

      <ProjectAbout
        task={project.attributes.ProjectTask}
        done={project.attributes.ProjectDone}
        CustomerName={project.attributes.CustomerName}
        CustomerUrl={project.attributes.CustomerUrl}
      />

      <div className="container">
        <Line variantColor="grey" />
      </div>
      <div className="py-10 md:py-15 lg:py-18">
        <IntroCost />
      </div>

      <PortfolioCarousel
        title={t`project.other_projects`}
        projects={projectsOther}
      />
      <div className="container">
        <Line variantColor="grey" />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const projectsSlug = await fetchAPI('/projects', {
    fields: ['slug'],
    pagination: {
      pageSize: 100,
    },
  });

  const projectsSlugPath = projectsSlug.data.map((project) => ({
    params: {
      slug:
        project.attributes.slug !== null
          ? project.attributes.slug.toString()
          : '',
    },
  }));
  return {
    paths: [...projectsSlugPath],
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  // const categoriesRes = await fetchAPI("/categories");

  const [headerRes, contactRes, menuRes, projectsOtherRes, projectsRes] =
    await Promise.all([
      fetchAPI('/navigation/render/2', {
        fields: ['title', 'path'],
        locale: locale,
      }),
      fetchAPI('/contact', {
        fields: ['Title', 'Address', 'Phone', 'Email', 'PhoneLink'],
        locale: locale,
        populate: 'ContactSocials',
      }),
      fetchAPI('/navigation/render/3', {
        fields: ['title', 'path'],
        locale: locale,
      }),
      fetchAPI('/projects', {
        fields: ['Title', 'slug'],
        locale: locale,
        populate: ['Poster', 'tags'],
        pagination: {
          start: 0,
          limit: 6,
        },
      }),
      fetchAPI('/projects', {
        locale: locale,
        populate: '*',
        fields: '*',
        pagination: {
          pageSize: 100,
        },
        filters: {
          slug: params.slug,
        },
      }),
    ]);

  return {
    props: {
      data: contactRes.data,
      menu: menuRes,
      headerMenu: headerRes,
      project: projectsRes.data[0],
      projectsOther: projectsOtherRes.data,
    },
    revalidate: 3600,
  };
}

export default Project;
