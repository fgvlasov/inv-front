import Seo from '@/components/seo';
import Layout from '@/components/layout';

import TitleSection from '@/components/ui/TitleSection';
import BreadCrumbs from '@/components/ui/Breadcrumbs';
import ServiceIntro from '@/components/Services/ServiceIntro';
import { fetchAPI } from 'lib/api';
import useTranslation from 'next-translate/useTranslation';
import IntroCost from '@/components/ui/IntroCost';
import ServicesSlides from '@/components/Services/ServicesSlides';
import ProjectsList from '@/components/Projects/ProjectsList';
import Wrapper from '@/components/ui/Wrapper';
import ServicesForCategory from '@/components/Services/ServicesForCategory';
import Line from '@/components/ui/Line';

import ServicesWhatIs from '@/components/Services/ServicesWhatIs';
import ServicesAdvantages from '@/components/Services/ServicesAdvantages';
import ServicesPrice from '@/components/Services/ServicesPrice';
//import ServicesInfo from '@/components/Services/ServicesInfo';
import ServicesWorkPlan from '@/components/Services/ServicesWorkPlan.js';
import ServicesChoice from '@/components/Services/ServicesChoise';

export default function Service({
  category,
  projects,
  data,
  menu,
  headerMenu,
}) {
  const i18n = useTranslation();
  const { t } = useTranslation('common');
  const locale = i18n.lang;

  const seo = {
    metaTitle: category.attributes.SEO[0].metaTitle,
    metaDescription: category.attributes.SEO[0].metaTitle,
    shareImage: category.attributes.image,
  };

  //console.log(category);

  return (
    <Layout
      data={data}
      menu={menu}
      header={headerMenu}
      headerContact={data.attributes}
      bg="black"
      headerBg="white"
      footerBg="black"
      pillowColor="dark"
      variantSvg="darkSvg"
    >
      <Seo seo={seo} />
      <Wrapper color="grey" position="bottom">
        <TitleSection text={category.attributes.name} />
        <div className="container">
          <Line variantColor="grey" />
        </div>
        <BreadCrumbs
          links={[
            {
              title: t('services.linkServices'),
              path: '/services',
            },
            {
              title: category.attributes.name,
            },
          ]}
        />
        <ServiceIntro
          title={t('About service')}
          text={category.attributes.Description}
          image={category.attributes.image}
        />
        <ServicesForCategory parent={category.id} />
        {category.attributes.What_is && (
          <ServicesWhatIs data={category.attributes.What_is} />
        )}
        <IntroCost />
        <div className="container contRightFull">
          <ServicesSlides />
        </div>
        {category.attributes.Category_advantages && (
          <ServicesAdvantages data={category.attributes.Category_advantages} />
        )}

        {category.attributes.Category_project_price && (
          <ServicesPrice data={category.attributes.Category_project_price} />
        )}
        <ProjectsList
          projects={projects}
          moreProjects={true}
          // projectsQuantity='100'
          focusService={category.id}
        />

        {category.attributes.Category_why_choose && (
          <ServicesChoice data={category.attributes.Category_why_choose} />
        )}

        {/* {category.attributes.Category_workplan && (
          <ServicesWorkPlan data={category.attributes.Category_workplan} />
        )} */}
      </Wrapper>
    </Layout>
  );
}

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI('/categories', {
    fields: ['slug'],
  });
  const categoriesPaths = categoriesRes.data.map((category) => ({
    params: {
      slug:
        category.attributes.slug !== null
          ? category.attributes.slug.toString()
          : '',
    },
  }));
  return {
    paths: [...categoriesPaths],
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const [headerRes, contactRes, menuRes, matchingCategories, projectsRes] =
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

      fetchAPI('/categories', {
        //fields: ["name", "text", "Description"],
        locale: locale,
        populate: {
          Category_advantages: {
            populate: '*',
          },
          Category_project_price: {
            populate: '*',
          },
          Category_workplan: {
            populate: '*',
          },
          Category_why_choose: {
            populate: '*',
          },
          SEO: {
            populate: '*',
          },
          image: {
            populate: '*',
          },
          What_is: {
            populate: '*',
          },
        },
        filters: {
          slug: params.slug,
        },
      }),
      fetchAPI('/projects', {
        //fields: ["name", "text", "Description"],
        locale: locale,
        populate: '*',
        filters: {
          categories: {
            slug: { $eq: params.slug },
          },
        },
      }),
    ]);

  // const matchingCategories = await fetchAPI("/categories", {
  //   //fields: ["name", "text", "Description"],
  //   locale: locale,
  //   populate: "*",
  //   filters: {
  //     slug: params.slug,
  //   },
  // });

  // const projectsRes = await fetchAPI("/projects", {
  //   //fields: ["name", "text", "Description"],
  //   locale: locale,
  //   populate: "*",
  //   filters: {
  //     categories: {
  //       slug: { $eq: params.slug },
  //     },
  //   },
  // });

  return {
    props: {
      data: contactRes.data,
      menu: menuRes,
      headerMenu: headerRes,
      category: matchingCategories.data[0],
      projects: projectsRes.data,
    },
    revalidate: 3600,
  };
}
